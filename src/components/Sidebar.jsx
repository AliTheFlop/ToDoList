import sidebarLogo from "../assets/iconSidebar.svg";
import SidebarButton from "./SidebarButton";
import axios from "axios";

export default function Sidebar() {

  function handleAddTask(taskData){
    axios.post("http://localhost:3000/api/tasks", taskData).then(response => {
      console.log("Task added successfully: " + response.data);
    }).catch(error => {
      console.log(error);   
    })
  }

  return (
    <>
      <div className="border-r border-gray-200 min-h-screen w-1/6 bg-cyan-100">
        <div className="flex flex-row justify-between p-2">
          <h1>James</h1>
          <img
            src={sidebarLogo}
            alt="Open the sidebar"
            height="30px"
            width="30px"
          />
        </div>

        <div className="pl-3 pt-10">
          <h1 className="font-bold text-3xl text-cyan-600 pb-2">Regular</h1>
          <SidebarButton name="Add Task"/>
          <SidebarButton name="Search" />
          <SidebarButton name="Inbox" />
          <SidebarButton name="Today" />
          <SidebarButton name="Upcoming" />
        </div>
      </div>
    </>
  );
}
