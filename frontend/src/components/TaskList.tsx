import { DroppableProvided } from "react-beautiful-dnd";

import { IColumn } from "../interfaces";
import Task from "./Task";
import { useStoreState } from "../state/typedHooks";

interface TaskListProps {
  column: IColumn;
  provided?: DroppableProvided;
}

export default function TaskList({ column, provided }: TaskListProps) {
  const allTasks = useStoreState((state) => (state.tasks));

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.droppableProps}
      className='grid gap-2 my-2'
    >
      <>
        {allTasks && Object.values(allTasks).map((task, index) => {
          if (task.status === column.relatedStatus) {
            return <Task key={task._id} taskData={task} index={index} />
          }
          // eslint-disable-next-line array-callback-return
          return;
        })}
        {provided?.placeholder}
      </>
    </div>
  );
}