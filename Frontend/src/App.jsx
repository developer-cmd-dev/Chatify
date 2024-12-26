import "./App.css";
import { Outlet,  useLocation } from "react-router-dom";
import { Header } from "./Components";
import { useSelector } from "react-redux";
import {DialogBox} from './Components/index'
import {ToastContainer} from 'react-toastify'

function App() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const location = useLocation()
  const hideHeaderPath = []
  const shouldshowHeader = !hideHeaderPath.includes(location.pathname)

  return (
    <div
      className="
    overflow-hidden h-screen  "
    >
     <ToastContainer />
   { shouldshowHeader &&  <Header
        logo={true}
        colorPallete={true}
        darkModeButton={true}
        classname={`${isDarkMode ? "bg-black" : "bg-white"}  h-[10vh] w-full `}
        hamburger={true}
      />}
      <main className=" h-[100%]  w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
