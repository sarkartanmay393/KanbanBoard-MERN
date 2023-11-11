import { ChangeEvent, useState } from "react";

import { useStoreActions, useStoreState } from "../state/typedHooks";
import { ITask, TaskStatus } from "../interfaces";
import { Draggable } from "react-beautiful-dnd";

interface TaskProps {
  taskData: ITask;
  index: number;
}

export default function Task({ taskData, index }: TaskProps) {
  const { updateTask, removeTask, setGlobalaTaskStore } = useStoreActions((action) => action);
  const { globalTaskStore } = useStoreState((state) => state);
  const [taskValue, setTaskValue] = useState<ITask>({
    _id: taskData._id,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    status: taskData.status,
    tags: taskData.tags,
    projectId: taskData.projectId,
  });

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const handleChange = async (e:
    ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();

    setTaskValue((prev) => {
      const latestTaskBody = {
        ...prev,
        [e.target.name]: e.target.value,
        "_id": prev._id,
      };

      updateTask(latestTaskBody);
      return latestTaskBody;
    });

    const sync = async () => {
      try {
        const resp = await fetch("/api/task/update", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(taskValue),
        });

        await resp.json();
      } catch (err) {
        console.log(err);
      }
    }
    sync();
  }

  if (!taskData) { return <></> }

  const handleDelete = async () => {
    const resp = await fetch("/api/task/delete", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ _id: taskData._id }),
    });

    await resp.json();
    removeTask(taskData);
  }

  const getTaskStatusPrettified = (ts: string, getEnum: boolean): TaskStatus | string => {
    switch (ts) {
      case 'notstarted': {
        return getEnum ? TaskStatus.NotStarted : "Not Started";
      }
      case 'inprogress': {
        return getEnum ? TaskStatus.InProgress : "In Progress";
      }
      case 'review': {
        return getEnum ? TaskStatus.Review : "Review";
      }
      case 'complete': {
        return getEnum ? TaskStatus.Complete : "Complete";
      }
      default:
        return getEnum ? TaskStatus.NotStarted : 'No Started';
    }
  }

  // TODO: send update req after focus leave from task component 
  // const thisEl = document.getElementById(taskData._id);
  // if (thisEl) {
  //   thisEl.onfocus = (event) => {
  //     console.log('focus')
  //   }
  // }


  return (
    <Draggable draggableId={taskData._id} index={index}>
      {provided =>
        <div
          id={`${taskData._id}`}
          ref={provided.innerRef}
          className="flex flex-col gap-2 bg-blue-100 rounded-[6px] mx-4 p-2 border border-black "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <img
            onClick={handleDelete}
            className="relative md:self-end border-[2px] border-solid border-solid rounded-[6px] mt-2 cursor-pointer "
            width={20} src="https://www.svgrepo.com/show/21045/delete-button.svg"
            alt=""
          />

          <div className="grid mt-[-10%]">

            <input name="title" placeholder="Implement User Auth"
              className="focus:outline-0 focus:bg-pink-100 text-[1rem] lg:text-[1.1rem] font-[600] bg-transparent rounded-[6px] p-2 "
              value={taskValue.title} onChange={handleChange} />

            <textarea name="description" placeholder="Use next-auth or passport.js and go through docs"
              className="focus:outline-0 focus:bg-pink-100 text-[0.8rem] lg:text-[0.9rem] bg-transparent rounded-[6px] p-2 "
              value={taskValue.description} onChange={handleChange} />

          </div>
          <div className="flex gap-2 justify-start items-center ">

            <div className="border border-black p-1 gap-1 flex items-center justify-center self-start rounded-[6px] min-w-[72px] h-[28px] bg-white text-[0.8rem]">
              <p className="flex justify-center items-center gap-1 font-[500]">
                <span className="text-[0.4rem]">🔴</span> Due </p>

              <input id={`datepicker-${taskData._id}`}
                className="border rounded bg-transparent focus:outline-none border-transparent focus:border-blue-500 "
                name="dueDate" type="date" value={taskValue.dueDate} onChange={handleChange} />

            </div>

            <div className="border border-black p-1 gap-1 flex items-center justify-center self-start rounded-[6px] min-w-[72px] h-[28px] bg-white text-[0.8rem]">

              <select name="status" className="w-[100%] h-[100%] bg-transparent text-[0.8rem] font-[500] rounded-[6px]"
                value={taskValue.status} onChange={handleChange}>
                {Object.values(TaskStatus).map((status: string) => (
                  <option key={status} value={status} >{getTaskStatusPrettified(status, false)}</option>
                ))}
              </select>

            </div>

          </div>
        </div>
      }
    </Draggable>
  );
}