import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Board from "../components/Board";
import { useStoreActions, useStoreState } from "../state/typedHooks";
import { ITask, TaskStatus } from "../interfaces";
import { baseUrl } from "../lib/network";
import { ToastContext } from "../provider/ToastProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import fetchTasks from "../api/fetchTasks";
import createTask from "../api/createTask";
import logout from "../api/logout";

// const worker = new Worker(new URL('../worker/WebWorker.ts', import.meta.url));

export default function HomePage() {
  const { user } = useStoreState((state) => state);
  const { setUser } = useStoreActions((action) => action);
  const navigateTo = useNavigate();
  const { setToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleNewTask = async () => {
    const newTask = await createTask();
    if (newTask) {
      setTasks((p) => [...p, newTask]);
      setToast({
        text: "New task added!",
        color: "green-200",
      });
    } else {
      setToast({
        text: "Failed to craete new task",
        color: "red-200",
      });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const tasks = await fetchTasks();
      setTasks(tasks);
      setLoading(false);
    })();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center w-[100%] h-[100%] ">
      <img
        className="absolute right-8 top-6 cursor-pointer"
        width={24}
        alt=""
        onClick={handleLogout}
        src="https://www.svgrepo.com/show/135250/logout.svg"
      />
      <h3 className="text-[2.4rem] font-[500] ">Personal Board</h3>
      <p className="text-[1rem] font-[500] ">
        Manage your daily/weekly tasks here.
      </p>
      <img
        onClick={handleNewTask}
        className="border-[0.1px] border-solid border-gray-400 rounded-[6px] my-4 cursor-pointer p-1"
        width={36}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png"
        alt=""
        style={{ boxShadow: "1px 0.4px 4px 0.3px lightgreen" }}
      />
      {loading ? (
        <LoadingSpinner loading={Boolean(loading)} />
      ) : (
        <Board styleProps={DefaultBoardProps} />
      )}
    </div>
  );
}

const DefaultBoardProps: Record<string, string> = {
  width: "90%",
};
