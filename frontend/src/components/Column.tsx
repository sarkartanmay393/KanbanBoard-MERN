import TaskList from "./TaskList";
import Task from "./Task";
import { IColumn } from "../interfaces";
import { Droppable } from "react-beautiful-dnd";
import { useStoreState } from "../state/typedHooks";

export default function Column(data: IColumn) {
  const listOfTasks = useStoreState(state => state.tasks);

  return (
    <div key={data._id} className="h-[60vh] border-[1px] bg-green-100 border-solid border-black rounded-[6px] overflow-auto">
      <h4 className="bg-pink-100 p-2 font-[500] text-[1.2rem] text-center ">{data.name}</h4>
      <div className="overflow-auto">
        <Droppable droppableId={data._id}>
          {provided =>
            <TaskList provided={provided}>
              <>
                {listOfTasks.map((task, index) => {
                  if (task.status === data.relatedStatus) {
                    return <Task key={task._id} _id={task._id} index={index} />
                  }
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