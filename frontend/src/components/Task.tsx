import { ChangeEvent, useEffect, useState } from "react";
import { useStoreActions } from "../state/typedHooks";
import { ITask, TaskStatus } from "../interfaces";
import { useNavigate } from "react-router-dom";

interface TaskProps {
  taskData: ITask;
  index: number;
}

export default function Task({ taskData, index }: TaskProps) {
  const { updateTask, removeTask, setGlobalaTaskStore } = useStoreActions((action) => action)
  const [taskValue, setTaskValue] = useState<ITask>({
    _id: taskData._id,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    status: taskData.status,
    tags: taskData.tags,
    projectId: taskData.projectId,
  });

  const handleChange = (e:
    ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
  ) => {
    // e.preventDefault();
    setTaskValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const sync = async () => {
      try {
        const resp = await fetch("/api/task/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskValue),
        });
        await resp.json();
      } catch (err) {
        console.log(err);
      }
    }

    sync();
    updateTask(taskValue);
  }

  // useEffect(() => { console.log(taskValue) }, [taskValue])


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     return task && updateTask({
  //       ...task,
  //       title: title,
  //     });
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [title]);

  if (!taskData) { return <></> }


  // const handleOnChange = (e:
  //   ChangeEvent<HTMLTextAreaElement>
  //   | ChangeEvent<HTMLInputElement>
  //   | ChangeEvent<HTMLSelectElement>
  // ) => {
  //   e.preventDefault();
  //   switch (e.target.name) {
  //     case "title": {
  //       updateTask({
  //         inputFieldName: 'title',
  //         task: {
  //           ...taskData,
  //           title: e.target.value,
  //         }
  //       });
  //       break;
  //     }
  //     case "description": {
  //       updateTask({
  //         inputFieldName: 'description',
  //         task: {
  //           ...taskData,
  //           description: e.target.value,
  //         }
  //       });
  //       break;
  //     }
  //     case "duedate": {
  //       updateTask({
  //         inputFieldName: 'duedate',
  //         task: {
  //           ...taskData,
  //           dueDate: e.target.value,
  //         }
  //       });
  //       break;
  //     }
  //     case "taskstatus": {
  //       updateTask({
  //         inputFieldName: 'status',
  //         task: {
  //           ...taskData,
  //           status: getTaskStatusPrettified(e.target.value, true) as TaskStatus,
  //         }
  //       });
  //       break;
  //     }
  //   }

  // ((async () => {
  //   try {
  //     const resp = await fetch("/api/task/update", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     const updatedTask = await resp.json();
  //     console.log(updatedTask);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // })());
  // }

  const handleDelete = async () => {
    const resp = await fetch("/api/task/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: taskData._id }),
    });

    await resp.json();
    removeTask(taskData);
    // setGlobalaTaskStore(null);
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

  const thisEl = document.getElementById(taskData._id);
  if (thisEl) {
    thisEl.onfocus = (event) => {
      console.log('focus')
    }
  }


  return (
    // <Draggable key={task._id} draggableId={task._id} index={index}>
    //   {provided =>
    <div
      id={`${taskData._id}`}
      // ref={provided.innerRef}
      className="flex flex-col gap-2 bg-blue-100 rounded-[6px] mx-4 p-2 border border-black "
    // {...provided.draggableProps}
    // {...provided.dragHandleProps}
    >
      <img
        onClick={handleDelete}
        className="relative md:self-end border-[2px] border-solid border-solid rounded-[6px] mt-2 cursor-pointer "
        width={20} src="https://www.svgrepo.com/show/21045/delete-button.svg"
        alt="" />
      <div className="grid mt-[-10%]">

        <input name="title" placeholder="Implement User Auth"
          className="focus:outline-0 focus:bg-pink-100 text-[1rem] lg:text-[1.1rem] font-[600] bg-transparent rounded-[6px] p-2 "
          value={taskValue.title} onChange={handleChange} />

        <textarea name="description" placeholder="Use next-auth or passport.js and go through docs"
          className="focus:outline-0 focus:bg-pink-100 text-[0.8rem] lg:text-[0.9rem] bg-transparent rounded-[6px] p-2 "
          style={{}} value={taskValue.description} onChange={handleChange} />

      </div>
      <div className="flex gap-2 justify-start items-center ">

        <div className="border border-black p-1 gap-1 flex items-center justify-center self-start rounded-[6px] min-w-[72px] h-[28px] bg-white text-[0.8rem]">
          <p className="flex justify-center items-center gap-1 font-[500]">
            <span className="text-[0.4rem]">🔴</span> Due </p>

          <input id={`datepicker-${taskData._id}`}
            className="border rounded bg-transparent focus:outline-none border-transparent focus:border-blue-500 "
            name="duedate" type="date" value={taskValue.dueDate} onChange={handleChange} />

        </div>

        <div className="border border-black p-1 gap-1 flex items-center justify-center self-start rounded-[6px] min-w-[72px] h-[28px] bg-white text-[0.8rem]">

          <select name="taskstatus" className="w-[100%] h-[100%] bg-transparent text-[0.8rem] font-[500] rounded-[6px]"
            value={taskValue.status} onChange={handleChange}>
            {Object.values(TaskStatus).map((status: string) => (
              <option key={status} value={status} >{getTaskStatusPrettified(status, false)}</option>
            ))}
          </select>

        </div>

      </div>
    </div>
    //   }
    // </Draggable>
  );
}