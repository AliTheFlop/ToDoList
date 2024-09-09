import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement(document.getElementById("root"));

// eslint-disable-next-line react/prop-types
export default function AddTaskModal({ isOpen, handleClose }) {
  function handleAddTask(taskData) {
    axios
      .post("http://localhost:3000/api/tasks", taskData)
      .then((response) => {
        console.log("Task added successfully: " + response.data);
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
        contentLabel="My Modal"
        className="absolute inset-20 w-[40%] h-[70%] border border-blue-200 bg-cyan-100 overflow-auto rounded outline-none place-self-center"
      >
        <div className="flex flex-col items-center justify-center mt-12 outline">
          <h2 className="text-3xl font-bold mb-16">Add Task</h2>

          <form action="" method="POST" className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="task-name">Task Name</label>
              <input type="text" id="task-name" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="due-date">Due Date</label>
              <input type="date" id="due-date" />
            </div>
          </form>
          <button onClick={handleClose}>Close</button>
        </div>
      </Modal>
    </>
  );
}
