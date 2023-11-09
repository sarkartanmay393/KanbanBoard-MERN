import { useEffect } from "react";
import Board from "../components/Board";
import { TaskStatus } from "../interfaces";
import { useStoreActions, useStoreState } from "../state/typedHooks";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

// const worker = new Worker(new URL('../worker/WebWorker.ts', import.meta.url));

export default function HomePage() {
  const { isLoading } = useStoreState((state) => state);
  const { addOneTask, setTasks, setUser, setIsLoading } = useStoreActions((action) => action);
  const navigateTo = useNavigate();

  const handleNewTask = () => {
    const defaultTask = {
      id: "",
      title: "",
      description: "",
      tags: [""],
      status: TaskStatus.NotStarted,
      projectId: "",
      dueDate: "",
    }
    addOneTask(defaultTask);
  }

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const resp = await fetch('/api/task/all', {
          method: 'GET', headers: {
            'Content-Type': 'application/json',
          }
        });
        const tasks = await resp.json();
        if (tasks === false && resp.status === 401) {
          navigateTo('/login', { replace: true })
        }
        setIsLoading(false);
        setTasks(tasks);
      } catch (err) {
        console.error(err);
      }
    }

    fetchStateData();
  }, []);

  const handleLogout = () => {
    (async () => {
      try {
        const resp = await fetch('/api/logout', { method: 'GET' });
        navigateTo('/login', { replace: true });
      } catch (err) {
        console.error(err);
      }
    })();
    setUser(null)
  }


  interface LoadingSpinnerProps {
    loading: boolean,
  }
  const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${loading ? '' : 'hidden'}`}>
        <MoonLoader color="#FAA0A0	" loading={loading} size={150} />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-[100%] h-[100%] ">
      <img className="absolute right-8 top-6 cursor-pointer" width={24} alt="" onClick={handleLogout} src="https://www.svgrepo.com/show/135250/logout.svg" />
      <h3 className="text-[2.4rem] font-[500] ">Personal Board</h3>
      <p className="text-[1rem] font-[500] ">Manage your daily/weekly tasks here.</p>
      <img onClick={handleNewTask} className="border-[0.1px] border-solid border-gray-400 rounded-[6px] my-4 cursor-pointer p-1" width={36} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" alt="" style={{boxShadow: '1px 0.4px 4px 0.3px lightgreen'}} />
      {isLoading ? <LoadingSpinner loading={Boolean(isLoading)} /> : <Board styleProps={DefaultBoardProps} />}
    </div>
  )
}

const DefaultBoardProps: Record<string, string> = {
  "width": '90%'

};