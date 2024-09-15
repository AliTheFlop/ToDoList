import Modal from "react-modal";
import axios from "axios";
import { useState } from "react";

Modal.setAppElement(document.getElementById("root"));

// eslint-disable-next-line react/prop-types
export default function AddTaskModal({ isOpen, handleClose, refreshTasks }) {
  const [taskName, setTaskName] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskDueTime, setTaskDueTime] = useState("");

  function handleAddTask(event) {
    event.preventDefault();
    let taskData = [taskName, taskDueDate, taskDueTime];
    axios
      .post("http://localhost:3000/api/tasks", taskData)
      .then((response) => {
        console.log("Task added successfully: " + response.data);
        refreshTasks();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Add a Task"
        className="absolute inset-20 w-[40%] h-[70%] border border-blue-200 bg-cyan-100 overflow-auto rounded outline-none place-self-center"
      >
        <div className="flex flex-col items-center justify-center mt-12 outline">
          <h2 className="text-3xl font-bold mb-16">Add Task</h2>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="task-name">Task Name</label>
              <input
                type="text"
                id="task-name"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="due-date">Due Date</label>
              <input
                type="date"
                id="due-date"
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="due-time">Due Time</label>
              <input
                type="time"
                id="due-time"
                onChange={(e) => setTaskDueTime(e.target.value)}
              />
            </div>

            <button onClick={handleAddTask}>Submit</button>
          </form>
        </div>
      </Modal>
    </>
  );
}
