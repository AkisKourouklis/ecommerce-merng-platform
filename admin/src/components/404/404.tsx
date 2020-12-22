import { Button, Typography } from "@material-ui/core";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <Typography>Η σελίδα δεν υπάρχει πήγαινει στην αρχική</Typography>
      <Button href="/home" variant="contained" color="primary">
        Αρχική
      </Button>
    </>
  );
};

export default NotFound;
