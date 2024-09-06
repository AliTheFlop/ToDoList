/* eslint-disable react/prop-types */
import iconMap from "./iconMap";

export default function SidebarButton({ name }) {
  function handleClick() {
    console.log(name);
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
    </>
  );
}
