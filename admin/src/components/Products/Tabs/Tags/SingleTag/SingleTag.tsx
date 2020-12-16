import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { ISingleTag } from "../TagTypes";
import { useStyles } from "../TagStyles/TagStyles";
import EditTag from "../EditTag/EditTag";

const CreateTag: React.FC<{ fetchTags: () => Promise<void>; data: ISingleTag }> = ({ fetchTags, data }) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>Name: {data.name}</Grid>
          <Grid item>
            <EditTag data={data} fetchTags={fetchTags} />
          </Grid>
          <Grid item>Delete</Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CreateTag;
