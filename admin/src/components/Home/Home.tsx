import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../Authentication/AuthContext";
import DashboardHOC from "../DashboardHOC/DashboardHOC";
import { CreateError } from "../Error/ErrorActions";

const Home: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const createNewError = () => {
    dispatch(CreateError({ error: "test", token: auth.token || "Bearer " }));
  };

  return (
    <>
      <DashboardHOC>
        <button onClick={createNewError}>Tests</button>
      </DashboardHOC>
    </>
  );
};

export default Home;
