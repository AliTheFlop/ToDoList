/* This is the container that holds the tasks div's */
/* The second div is the component (the tasks div with the respective tasks), so seperate when done */
import Tasks from "./Tasks";

// eslint-disable-next-line react/prop-types
export default function TaskHub({ refreshTrigger }) {
  return (
    <>
      <div className="p-6 bg-slate-100 flex flex-column justify-center w-full">
        <Tasks category="Today" refreshTrigger={refreshTrigger} />
      </div>
    </>
  );
}
