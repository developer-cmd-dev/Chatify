import "./App.css";
import { Outlet,  useLocation } from "react-router-dom";
import { Header } from "./Components";
import { useSelector } from "react-redux";
import {NextUIProvider} from '@nextui-org/react'
import {Toaster} from 'sonner'



function App() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const location = useLocation()
  const hideHeaderPath = []
  const shouldshowHeader = !hideHeaderPath.includes(location.pathname)

  

  return (
    <NextUIProvider>
    <div
      className="
    overflow-hidden h-screen  "
    >
     <Toaster/>
      <main className=" h-[100%]  w-full">
        <Outlet />
      </main>
    </div>
    </NextUIProvider>
  );
}

export default App;
