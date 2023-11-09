import React from "react";
import { DroppableProvided } from "react-beautiful-dnd";

interface TaskListProps {
  provided: DroppableProvided;
  children: React.ReactElement;
}

export default function TaskList({ provided, children }: TaskListProps) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className='grid gap-2 my-2'
    >
      {children}
    </div>
  );
}