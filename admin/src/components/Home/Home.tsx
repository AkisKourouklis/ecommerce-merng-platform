import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../Authentication/AuthContext";
import DashboardHOC from "../DashboardHOC/DashboardHOC";
import { CreateError } from "../Error/ErrorActions";
import { CreateNotification } from "../Notification/NotificationActions";

const Home: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const createNewError = () => {
    dispatch(CreateError({ error: "test", token: auth.token || "Bearer " }));
  };
  const createNewNotification = () => {
    dispatch(CreateNotification({ notification: "New variant created successfully!", notificationType: "success" }));
  };

  return (
    <>
      <DashboardHOC>
        <button onClick={createNewError}>error</button>
        <button onClick={createNewNotification}>notification</button>
      </DashboardHOC>
    </>
  );
};

export default Home;
