import Sidebar from "./components/Sidebar";
import TaskHub from "./components/TaskHub";

//TODO: RESTful API Backend (expressjs)
// Only do a basic to do app -> Add Update Delete. No point in the other, its just design atp

function App() {
  return (
    <>
      <Sidebar />
      <TaskHub />
    </>
  );
}

export default App;
