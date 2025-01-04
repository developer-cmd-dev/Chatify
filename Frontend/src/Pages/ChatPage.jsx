import  {  useEffect,   useState } from "react";
import {  UserJoined, ChatContainer } from "../Components";
import { useSelector } from "react-redux";
import { disconnectSocket, getSocket } from "../utils/SocketConnection";
import { apiRequest } from "../utils/axiosHandler";


function ChatPage() {
  const userData = useSelector((state) => state.UserData);
  const [activeUsers, setActiveUsers] = useState([]);



  //  Close window page
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     // Trigger the browser's default dialog
  //     e.preventDefault();
  //     e.returnValue = ""; // Required for modern browsers
  //   };

  //   const handleUnload = async () => {
  //     // This logic executes only when the user confirms the refresh
  //     try {
  //       const socket = await getSocket();
  //       socket.emit("left-user", userData);
  //     } catch (error) {
  //       console.error("Socket error:", error);
  //     }
  //     disconnectSocket("/home", "patch", userData._id);
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("unload", handleUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("unload", handleUnload);
  //   };
  // }, [getSocket,disconnectSocket,userData]);


  // Get socket and handle socket events.
  useEffect(() => {
    (async () => {
      try {
        const socket = await getSocket();
        socket.on("new-user-joined", (data) => {
          setActiveUsers((prev) => [...prev, data]);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const socket = await getSocket();
        socket.on("left-user", (userData) => {
          activeUsers.map((users, index) => {
            if (userData._id === users._id) {
              activeUsers.splice(index, 1);
            }
            setActiveUsers([...activeUsers]);
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [activeUsers]);

  // Fetch active users from db.
  useEffect(() => {
    (async () => {
      try {
        const response = await apiRequest(`api/v1/active-users`, "post", null);
        setActiveUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="h-[calc(100vh-10vh)] flex   ">

      <UserJoined classname={" w-[12vw]"} activeUsers={activeUsers} />
      <div className="bg-gray-400 w-full  ">
        <ChatContainer />
      </div>
    </div>
  );
}

export default ChatPage;
