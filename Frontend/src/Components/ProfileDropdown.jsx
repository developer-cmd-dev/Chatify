import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { handleSuccess, handleError } from "../utils/toastify";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { apiRequest } from "../utils/axiosHandler";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Features/AuthenticateSlice";
function ProfileDropdown({ color, variant }) {
  const { username, email, userIconColor, avatar, fullname, isOnline } =
    useSelector((state) => state.UserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await apiRequest("/api/v1/logout", "post", null);
      navigate("/");
      dispatch(isAuthenticated({ authenticate: false }));
      return handleSuccess(res.data.message);
    } catch (error) {
      return handleError(error.message);
    }
  };

  return (
    <Dropdown  placement="bottom-start bg-black ">
      <DropdownTrigger className="w-fit  text-white ">
        <User
          as="button"
          avatarProps={
            avatar !== "" && {
              isBordered: false,
              src: { avatar },
              size: "lg",
            }
          }
          className="transition-transform "
          description={email}
          name={fullname}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">{email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem onPress={handleLogout} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileDropdown;
