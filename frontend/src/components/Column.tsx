import { DragDropContext, DropResult, Droppable, ResponderProvided } from "react-beautiful-dnd";
import TaskList from "./TaskList";
import Task from "./Task";
import { ColumnType } from "../interfaces";

export default function Column(data: ColumnType) {
  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => { }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div key={data.id} className="min-h-[20vh] border-[2px] border-solid border-black rounded-[6px] overflow-hidden">
        <h4 className="bg-pink-100 p-2 font-[500] text-[1.2rem] text-center ">{data.name}</h4>
        <Droppable droppableId={data.id}>
          {provided =>
            <TaskList provided={provided}>
              <>
                {data.taskIds.map((taskId, index) => {
                  return taskId && <Task key={taskId} id={taskId} index={index} />
                })}
                {provided.placeholder}
              </>
            </TaskList>
          }
        </Droppable>
      </div>
    </DragDropContext>
  );
}