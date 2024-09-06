/* This is the container that holds the tasks div's */
/* The second div is the component (the tasks div with the respective tasks), so seperate when done */
import Tasks from "./Tasks";
export default function TaskHub() {
  return (
    <>
      <div className="pl-10 pt-10 bg-slate-100 flex flex-column w-full">
        <Tasks category="Today" />
      </div>
    </>
  );
}
