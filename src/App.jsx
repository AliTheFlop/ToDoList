import Sidebar from "./components/Sidebar";
import TaskHub from "./components/TaskHub";
import { useState } from "react";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshTasks = () => {
    // Update the refreshTrigger to a new value
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <Sidebar refreshTasks={refreshTasks} />
      <TaskHub refreshTrigger={refreshTrigger} />
    </>
  );
}

export default App;
