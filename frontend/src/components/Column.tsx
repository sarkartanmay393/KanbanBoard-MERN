import TaskList from "./TaskList";
import Task from "./Task";
import { IColumn } from "../interfaces";
import { Droppable } from "react-beautiful-dnd";

export default function Column(data: IColumn) {
  return (
    <div key={data.id} className="h-[60vh] border-[1px] bg-green-100 border-solid border-black rounded-[6px] overflow-auto">
      <h4 className="bg-pink-100 p-2 font-[500] text-[1.2rem] text-center ">{data.name}</h4>
      <div className="overflow-auto">
        <Droppable droppableId={data.id}>
          {provided =>
            <TaskList provided={provided}>
              <>
                {data.taskIds.map((taskId, index) => {
                  if (!taskId)
                    return <></>
                  return <Task key={taskId} id={taskId} index={index} />
                })}
                {provided.placeholder}
              </>
            </TaskList>
          }
        </Droppable>
      </div>
    </div>
  );
}