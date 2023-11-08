import Column from "./Column";
import { useStoreState } from "../state/typedHooks";

export default function Board({ styleProps }: { styleProps: Record<string, string> }) {
  const columns = useStoreState((state) => state.columns);
  const columnOrder = useStoreState((state) => state.columnOrder);

  return (
    <div className='h-[100%] grid grid-cols-4 gap-2 m-4 px-4' style={styleProps}>
      {columnOrder.map((columnId) => {
        const column = columns.find((column) => column.id === columnId);
        return column && <Column key={columnId} {...column} />
      })}
    </div >
  );
}
