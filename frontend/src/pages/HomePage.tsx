import Board from "../components/Board";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-[100%] h-[100%]">
      <h3 className="text-[2.4rem] font-[500] ">Personal Board</h3>
      <p className="text-[1rem] font-[500] ">Manage your daily/weekly tasks here.</p>
      <Board styleProps={DefaultBoardProps} />
    </div>
  )
}

const DefaultBoardProps: Record<string, string> = {
  "width": '100%'
};