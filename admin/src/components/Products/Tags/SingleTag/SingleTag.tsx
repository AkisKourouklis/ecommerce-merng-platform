import { Button, Grid, Paper } from "@material-ui/core";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CreateError } from "../../../Error/ErrorActions";
import { ISingleTag } from "../TagTypes";
import { useDispatch } from "react-redux";
import { useStyles } from "../TagStyles/TagStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditTag from "../EditTag/EditTag";
import React, { useContext, useState } from "react";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { CreateNotification } from "../../../Notification/NotificationActions";
import { DELETE_TAG } from "../TagQueries/TagQueries";

const CreateTag: React.FC<{ fetchTags: () => Promise<void>; data: ISingleTag }> = ({ fetchTags, data }) => {
  const classes = useStyles();
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [canDelete, setCanDelete] = useState<boolean>(false);

  const toggleCanDelete = () => {
    setCanDelete(!canDelete);
  };

  const deleteTag = async (): Promise<void> => {
    try {
      await GraphqlRequest(auth.token).request(DELETE_TAG, { tagId: data._id });
      dispatch(CreateNotification({ notification: "Variant deleted successfully!", notificationType: "success" }));
      fetchTags();
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  return (
    <>
      <Paper className={classes.paper} variant="outlined">
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>Name: {data.name}</Grid>
          <Grid item>
            <EditTag data={data} fetchTags={fetchTags} />
          </Grid>
          <Grid item>
            {canDelete ? (
              <>
                <Grid item>
                  <Button
                    className={classes.tagDeleteButtonContained}
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    size="small"
                    onClick={deleteTag}
                  >
                    Delete tag
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.tagDeleteButtonOutlined}
                    variant="outlined"
                    size="small"
                    onClick={toggleCanDelete}
                  >
                    Cancel
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item>
                <Button
                  className={classes.tagDeleteButtonOutlined}
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={toggleCanDelete}
                >
                  Delete
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CreateTag;
