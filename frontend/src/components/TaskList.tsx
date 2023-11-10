import React from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import { useStoreState } from "../state/typedHooks";
import { IColumn, TaskStatus } from "../interfaces";
import Task from "./Task";

interface TaskListProps {
  column: IColumn;
  provided?: DroppableProvided;
}

export default function TaskList({ column, provided }: TaskListProps) {
  return (
    <div
      ref={provided?.innerRef}
      // {...provided.droppableProps}
      className='grid gap-2 my-2'
    >
      <>
        {[...column.tasks].map((task, index) => {
          return <Task key={task._id} taskData={task} index={index} />
        })}
        {provided?.placeholder}
      </>
    </div>
  );
}