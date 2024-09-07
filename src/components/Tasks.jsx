import { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
export default function Tasks({ category }) {
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  function handleCheckbox(id) {
    setFinishedTasks((prevTasks) => {
      if (prevTasks.includes(id)) {
        return prevTasks.filter((taskId) => taskId !== id);
      } else {
        return [...prevTasks, id];
      }
    });
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks");
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="border-[4px] border-zinc-200 pl-5 pt-5 pr-5 max-w-[30%] overflow-scroll scrollbar">
        <h1 className="font-bold text-2xl mb-3">{category}</h1>
        {tasks.map((item) => (
          <div
            key={item._id + "container"}
            className="flex flex-row items-center mb-9"
          >
            <input
              type="checkbox"
              className="mainCheckbox mr-9"
              onClick={() => {
                handleCheckbox(item._id);
              }}
            />
            <div
              key={item._id + "div"}
              className="flex flex-col justify-center"
            >
              <h1
                key={item._id}
                className={`text-xl ${
                  finishedTasks.includes(item._id) && "taskDone"
                }`}
              >
                {item.name}
              </h1>
              <p key={item._id + "dueDate"} className="italic text-sm">
                {item.endDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
