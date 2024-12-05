import "./UserView.css";

import { FC } from "react";


type UserWiewProps = {
  username: string
}


export const UserView: FC<UserWiewProps> = ({ username }) => {

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name"></span>
      <span className="user-view__name"> </span>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
