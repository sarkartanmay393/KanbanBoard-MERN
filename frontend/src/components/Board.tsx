import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import Column from "./Column";
import { useStoreActions, useStoreState } from "../state/typedHooks";
import updateTask from "../api/updateTask";

interface BoardProps {
  styleProps: Record<string, string>;
}

export default function Board({ styleProps }: BoardProps) {
  const { columns, columnOrder, tasks } = useStoreState((state) => state);
  const { updateTask: updateTaskState } = useStoreActions((action) => action);

  const handleDragEnd = async (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    if (tasks && result.destination?.droppableId) {
      const latestTaskBody = {
        ...tasks[result.draggableId],
        status: columns[result.destination?.droppableId!].relatedStatus,
      };
      updateTaskState(latestTaskBody);
      await updateTask(latestTaskBody);
    }
  };

  return (
    <div
      id="board"
      className="h-[100%] grid grid-cols-4 gap-2 m-4 px-4"
      style={styleProps}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          return column && <Column key={columnId} {...column} />;
        })}
      </DragDropContext>
    </div>
  );
}
