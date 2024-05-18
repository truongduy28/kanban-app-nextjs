import { useDialog } from "@/hooks/useDialog";
import { ITask } from "@/types/task.type";
import { FC, useEffect, useState } from "react";
import TaskDetailsDialog from "./_components/TaskDetailsDialog";

interface Props {
  taskData: ITask;
}
const Task: FC<Props> = ({ taskData }) => {
  const [task, setTask] = useState<ITask>();

  const { isShowing, toggle } = useDialog();

  useEffect(() => {
    setTask(taskData);
  }, [taskData]);

  return (
    <>
      <div onClick={toggle}>{task?.title}</div>
      {isShowing && <TaskDetailsDialog onClose={toggle} task={task as ITask} />}
    </>
  );
};

export default Task;
