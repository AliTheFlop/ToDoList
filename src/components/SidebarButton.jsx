/* eslint-disable react/prop-types */
import AddTaskModal from "./AddTaskModal";
import iconMap from "./iconMap";
import { useState } from "react";

export default function SidebarButton({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    console.log(name);
    name === "Add Task" ? setIsOpen(true) : null;
  }

  function handleClose() {
    setIsOpen(false);
  }

  const icon = iconMap[name.toLowerCase()];
  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-row justify-center items-center gap-2 pt-2"
      >
        <img src={icon} alt={`${name} button`} width="25px" height="25px" />
        <span className="text-xl text-gray-800">{name}</span>
      </button>

      {isOpen && <AddTaskModal isOpen={isOpen} handleClose={handleClose} />}
    </>
  );
}
