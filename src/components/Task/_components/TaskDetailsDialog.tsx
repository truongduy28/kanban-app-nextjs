import Dialog from "@/components/Dialog/Dialog";
import InputText from "@/components/Input/Input";
import { useUpdateTask } from "@/hooks/useTaskApi";
import { ITask } from "@/types/task.type";
import { formatTimes } from "@/utils/moment-js";
import Editor from "@draft-js-plugins/editor";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import { useQueryClient } from "@tanstack/react-query";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { FC, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import { stateToHTML } from "draft-js-export-html";

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

interface Props {
  onClose: () => void;
  task: ITask;
}

const TaskDetailsDialog: FC<Props> = ({ onClose, task }) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(task.title);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // API: update task
  const { mutate, isPending } = useUpdateTask(task.section.board, task._id);

  useEffect(() => {
    setTitle(task.title);
    if (task.content) {
      const blocksFromHTML = convertFromHTML(task.content);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [task]);

  const handleUpdateTitle = () => {
    mutate(
      { title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getOneBoard", task.section.board],
          });
        },
      }
    );
  };

  const handleUpdateDescription = () => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    mutate(
      { content: htmlContent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["getOneBoard", task.section.board],
          });
        },
      }
    );
  };

  return (
    <Dialog onClose={onClose} size="lg">
      {/* Remove task button */}
      <div className="w-full flex justify-end">
        <button className="w-max">
          <AiOutlineDelete color="#f36d7f" size={20} />
        </button>
      </div>

      <div className="px-5 py-10">
        {/* Task title */}
        <div className="mb-2">
          <InputText
            value={title}
            className="font-bold outline-gray-300 w-full px-2 py-2 text-3xl"
            clearStyle
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleUpdateTitle}
          />
        </div>

        {/* Create task times */}
        <div>
          <span className="text-sm">
            Create at: {formatTimes(task.createdAt)}
          </span>
          <br />
          <span className="text-sm">
            Update at: {formatTimes(task.updatedAt)}
          </span>
        </div>

        {/* Task content */}
        <Toolbar />

        <div className="editor-container">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={[toolbarPlugin]}
            onBlur={handleUpdateDescription}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default TaskDetailsDialog;
