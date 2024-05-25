import Section from "@/components/Section/Section";
import Task from "@/components/Task/Task";
import { useCreateSection } from "@/hooks/useSectionApi";
import { useUpdateTaskPosition } from "@/hooks/useTaskApi";
import { ISection } from "@/types/section.type";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

interface Props {
  boardId: string;
  sections: ISection[];
}
const SectionManagers: FC<Props> = ({ boardId, sections = [] }) => {
  const queryClient = useQueryClient();

  // API: update task position
  const { mutate: updateTaskPosition } = useUpdateTaskPosition(boardId);

  const onDragEnd: OnDragEndResponder = async ({ source, destination }) => {
    if (!destination) return;
    const sourceColIndex = sections.findIndex(
      (e) => e.id === source.droppableId
    );
    const destinationColIndex = sections.findIndex(
      (e) => e.id === destination.droppableId
    );
    const sourceCol = sections[sourceColIndex];
    const destinationCol = sections[destinationColIndex];

    const sourceSectionId = sourceCol.id;
    const destinationSectionId = destinationCol.id;

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      sections[sourceColIndex].tasks = sourceTasks;
      sections[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      sections[destinationColIndex].tasks = destinationTasks;
    }

    updateTaskPosition(
      {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] }),
      }
    );

    try {
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="w-full flex-1 bg-[#f7f7f7] p-5 flex">
      {/* Sections */}
      <div className="w-full flex-1">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex items-start gap-5 overflow-x-auto w-full flex-nowrap">
            {sections.map((section, i) => (
              <div key={section.id + i} className="w-[25%] min-w-[25%]">
                <Droppable key={section.id} droppableId={section.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-full"
                    >
                      <Section
                        key={section._id}
                        {...section}
                        boardId={boardId}
                        sectionId={section._id}
                      >
                        {/* tasks */}
                        {section.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Task key={index} taskData={task} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Section>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default SectionManagers;
