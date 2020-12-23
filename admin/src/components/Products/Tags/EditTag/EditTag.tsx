import { Backdrop, Button, CircularProgress, Grid, Modal, Paper, TextField, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CreateNotification } from "../../../Notification/NotificationActions";
import { EDIT_TAG } from "../TagQueries/TagQueries";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { ISingleTag } from "../TagTypes";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import useStyles from "../TagStyles/TagStyles";

const EditTag: React.FC<{ data: ISingleTag; fetchTags: () => Promise<void> }> = ({ data, fetchTags }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm<ISingleTag>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async ({ name }: ISingleTag) => {
    try {
      setLoading(true);
      const { _id } = data;
      GraphqlRequest(auth.token).request(EDIT_TAG, { _id, name });
      dispatch(CreateNotification({ notification: "Tag updated successfully!", notificationType: "success" }));
      setLoading(false);
      fetchTags();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button size="small" variant="contained" color="primary" type="button" onClick={handleOpen}>
        Edit Tag
      </Button>
      <Modal
        aria-labelledby="transition-modal-createVariant"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Paper className={classes.paper}>
          <Grid container direction="row">
            <Grid item xs={12} className={classes.title}>
              <Typography variant="h5">Edit variant</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline">Information</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  className={classes.input}
                  inputRef={register}
                  type="text"
                  name="name"
                  label="Name"
                  variant="outlined"
                  defaultValue={data.name}
                  fullWidth
                />
                <Button
                  startIcon={loading ? <CircularProgress color="inherit" size={20} /> : null}
                  color="primary"
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Save Tag
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
};

export default EditTag;
