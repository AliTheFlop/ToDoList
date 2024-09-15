import { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
export default function Tasks({ refreshTrigger }) {
  const [tasks, setTasks] = useState([]);

  function handleDeleteTask(item) {
    axios
      .delete("http://localhost:3000/api/tasks", {
        data: { source: item },
      })
      .then((response) => {
        console.log(response);
        setTasks((prevTasks) => {
          let newTasks = [];
          prevTasks.map((prevTaskItem) => {
            prevTaskItem._id != item._id ? newTasks.push(prevTaskItem) : null;
          });
          return newTasks;
        });
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
  }, [refreshTrigger]);

  return (
    <>
      <div className="border-[4px] border-zinc-200 pl-5 pt-5 pr-5 w-[80%] overflow-scroll scrollbar">
        <h1 className="font-bold text-2xl mb-3">Tasks</h1>
        {tasks.map((item) => (
          <div
            key={item._id + "container"}
            className="flex flex-row items-center mb-9"
          >
            <input
              type="checkbox"
              className="mainCheckbox mr-9"
              onClick={() => {
                handleDeleteTask(item);
              }}
            />
            <div
              key={item._id + "div"}
              className="flex flex-col justify-center"
            >
              <h1 key={item._id} className={`text-xl`}>
                {item.name}
              </h1>
              <p key={item._id + "dueDate"} className="italic text-sm">
                {item.dueDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
