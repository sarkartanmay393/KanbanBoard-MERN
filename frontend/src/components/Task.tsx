import { ChangeEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useStoreState } from "../state/typedHooks";

interface TCType {
  id: string;
  index: number;
}

export default function Task({ id, index }: TCType) {
  const task = useStoreState(state => state.tasks.find((task) => task.id === id));

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   e.preventDefault();

    //   setStateData(prevStateData => {
    //     if (e.target.name === 'task-title') {
    //       return
    //     }
  }


  //     return prevStateData
  // })

  // switch (e.target.name) {
  //   case "task-title": {
  //     setStateData(prevStateData => {
  //       return { ...prevStateData, e. };
  //      })
  //    }
  // }

  if (!task) {
    return <></>
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided =>
        <div
          ref={provided.innerRef}
          className="flex flex-col gap-2 bg-blue-100 min-h-[128px] bordesr-[1px] border-solid border-black rounded-[6px] mx-4 my-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="grid border-[1px] border-solid border-black">
            <input name="task-title" className="text-[1.2rem] bg-transparent" value={task.name} onChange={handleOnChange} />
            <input name="task-description" className="text-[1rem] bg-transparent" value={task.content} multiple onChange={handleOnChange} />
          </div>
          
        </div>
      }
    </Draggable>
  );
}