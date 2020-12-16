import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useStyles } from "./LoadingStyles";

const LoadingPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default LoadingPage;
