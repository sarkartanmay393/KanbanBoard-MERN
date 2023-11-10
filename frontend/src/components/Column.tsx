import { Droppable } from "react-beautiful-dnd";

import TaskList from "./TaskList";
import { IColumn } from "../interfaces";

export default function Column(data: IColumn) {
  return (
    <div key={data._id} className="h-[60vh] border-[1px] bg-green-100 border-solid border-black rounded-[6px] overflow-auto">
      <h4 className="bg-pink-100 p-2 font-[500] text-[1.2rem] text-center ">{data.name}</h4>
      <div className="overflow-auto">
        <Droppable droppableId={data._id}>
          {provided =>
            <TaskList
              column={data}
              provided={provided}
            />}
        </Droppable>
      </div>
    </div>
  );
}