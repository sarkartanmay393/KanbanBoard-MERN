import Column from "./Column";
import { useStoreState } from "../state/typedHooks";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";

interface BoardProps {
  styleProps: Record<string, string>;
}

export default function Board({ styleProps }: BoardProps) {
  const columns = useStoreState((state) => state.columns);
  const columnOrder = useStoreState((state) => state.columnOrder);
  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => { }

  return (
    <div id="board" className='h-[100%] grid grid-cols-4 gap-2 m-4 px-4' style={styleProps}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {columnOrder.map((columnId) => {
          const column = columns.find((column) => column.id === columnId);
          return column && <Column key={columnId} {...column} />
        })}
      </DragDropContext>
    </div >
  );
}
