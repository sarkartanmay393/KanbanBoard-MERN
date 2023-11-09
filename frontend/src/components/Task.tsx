import { ChangeEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useStoreActions, useStoreState } from "../state/typedHooks";
import { TaskStatus } from "../interfaces";

interface TaskProps {
  id: string;
  index: number;
}

const InputStyles: React.CSSProperties = {

};

export default function Task({ id, index }: TaskProps) {
  const task = useStoreState((state) => state.tasks.find((task) => task.id === id));
  const { updateTask, removeOneTask } = useStoreActions((action) => action)
  if (!task) {
    return <></>;
  }

  const handleOnChange = (e:
    ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLSelectElement>
  ) => {
    switch (e.target.name) {
      case "title": {
        updateTask({
          ...task,
          title: e.target.value,
        })
        break;
      }
      case "description": {
        updateTask({
          ...task,
          description: e.target.value,
        })
        break;
      }
      case "duedate": {
        updateTask({
          ...task,
          dueDate: e.target.value,
        });
        break;
      }
      case "taskstatus": {
        updateTask({
          ...task,
          status: getTaskStatusPrettified(e.target.value, true) as TaskStatus,
        });
        break;
      }
    }
  }

  const handleDelete = () => {
    removeOneTask(task.id);
  }

  const handleDueDate = () => {

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


  return (
    <Draggable draggableId={task.id} index={index}>
      {provided =>
        <div
          ref={provided.innerRef}
          className="flex flex-col gap-2 bg-blue-100 rounded-[6px] mx-4 p-2 border border-black "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img
            onClick={handleDelete}
            className="relative md:self-end border-[2px] border-solid border-solid rounded-[6px] mt-2 cursor-pointer "
            width={20} src="https://www.svgrepo.com/show/21045/delete-button.svg"
            alt="" />
          <div className="grid mt-[-10%]">
            <input name="title" placeholder="Implement User Auth"
              className="focus:outline-0 focus:bg-pink-100 text-[1rem] lg:text-[1.1rem] font-[600] bg-transparent rounded-[6px] p-2 "
              value={task.title} onChange={handleOnChange} />
            <textarea name="description" placeholder="Use next-auth or passport.js and go through docs"
              className="focus:outline-0 focus:bg-pink-100 text-[0.8rem] lg:text-[0.9rem] bg-transparent rounded-[6px] p-2 " style={InputStyles} value={task.description} onChange={handleOnChange} />
          </div>
          <div className="flex gap-2 justify-start items-center ">

            <div id={`duedate-${task.id}`} onClick={handleDueDate} className="border border-black p-1 gap-1 flex items-center justify-center self-start rounded-[6px] min-w-[72px] h-[28px] bg-white text-[0.8rem]">
              <p className="flex justify-center items-center gap-1 font-[500]">
                <span className="text-[0.4rem]">🔴</span> Due </p>
              <input id={`datepicker-${task.id}`}
                className="border rounded bg-transparent focus:outline-none border-transparent focus:border-blue-500 "
                name="duedate" type="date" value={task.dueDate} onChange={handleOnChange} />
            </div>

            <div className="border border-black p-1 gap-1 flex items-center justify-center self-start rounded-[6px] min-w-[72px] h-[28px] bg-white text-[0.8rem]">
              <select name="taskstatus" className="w-[100%] h-[100%] bg-transparent text-[0.8rem] font-[500] rounded-[6px]" value={task.status} onChange={handleOnChange}>
                {Object.values(TaskStatus).map((status: string) => (
                  <option value={status} >{getTaskStatusPrettified(status, false)}</option>
                ))}
              </select>
            </div>

            {/* <div className="flex items-center justify-center p-2 self-start rounded-[6px] min-w-[72px] min-h-[28px] bg-green-100 text-[0.8rem]">
              {task.tags.map((tag) =>
                <p key={tag} className="italic ">{`#${tag}`}</p>
              )}
            </div> */}
          </div>
        </div>
      }
    </Draggable>
  );
}