import {
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { CREATE_CATEGORY } from "../CategoriesQueries";
import { CreateError } from "../../Error/ErrorActions";
import { CreateNotification } from "../../Notification/NotificationActions";
import CreateTag from "../../Products/Tags/CreateTag/CreateTag";
import DashboardHOC from "../../DashboardHOC/DashboardHOC";
import { FETCH_TAGS } from "../../Products/Tags/TagQueries/TagQueries";
import FileUpload from "../../FileUpload/FileUpload";
import GraphqlRequest from "../../../graphql/graphql-request";
import HandleProducts from "./HandleProducts";
import { ICategory } from "../../../types/categories";
import { IImage } from "../../../types/images";
import { ITag } from "../../../types/tags";
import InfoRounded from "@material-ui/icons/InfoRounded";
import { UPLOAD_IMAGE } from "../../FileUpload/FileUploadQueries";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import useStyles from "../../Products/Products/CreateProduct/CreateProductStyles";

interface ISelected {
  _id: string;
}

const CreateCategory: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tags, setTags] = useState<any>([]);
  const [images, setImages] = useState<File[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const { register, handleSubmit } = useForm();
  const { auth } = useContext(AuthContext);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: ICategory) => {
    try {
      setLoading(true);
      const { name, description, seo } = values;

      const newSelected: ISelected[] = [];
      selected.map((d: string) => newSelected.push({ _id: d }));

      const newTags: ITag[] = [];
      tags.map((d: string) => newTags.push({ _id: d }));

      const imagesResponse = await saveImages();
      await GraphqlRequest(auth.token).request(CREATE_CATEGORY, {
        name,
        description,
        seo: {
          name: seo.name,
          description: seo.description
        },
        images: imagesResponse,
        products: newSelected,
        tags: newTags
      });
      dispatch(
        CreateNotification({ notification: "Η νέα κατηγορία δημιουργήθεικε με επυτιχία!", notificationType: "success" })
      );
      history.push("/categories");
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleImages = (files: File[]) => {
    setImages(files);
  };

  const saveImages = async (): Promise<IImage[] | undefined> => {
    try {
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      return response.uploadImage;
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleTags = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value);
  };

  const fetchTags = async () => {
    try {
      const response = await GraphqlRequest(auth.token).request(FETCH_TAGS);
      setTagList(response.findAllTags.tags);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <DashboardHOC>
      <Grid container direction="row" justify="space-between">
        <Grid item xs={12}>
          {loading ? (
            <div style={{ width: "100%", marginBottom: "16px" }}>
              <LinearProgress color="primary" />
            </div>
          ) : null}
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.title}>
            Δημιουργία κατηγορίας
          </Typography>
        </Grid>
        <Grid item>
          <Button disabled={loading} form="create-category-form" type="submit" variant="contained" color="primary">
            Αποθήκευση κατηγορία
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit(onSubmit)} id="create-category-form">
            {/* information */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Πληροφορίες</Typography>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="text"
                    name="name"
                    label="Όνομα"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Διάλεξε ένα όνομα με βάση τα keywords από την κατηγορία" placement="top">
                            <InfoRounded color="action" />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="text"
                    name="description"
                    label="Περιγραφή"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Διάλεξε μία περιγραφή με βάση τα keywords από την κατηγορία" placement="top">
                            <InfoRounded color="action" />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            {/* images */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Εικόνες</Typography>
              <FileUpload handleFileChange={handleImages} />
            </Paper>
            {/* Προιόντα */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Προιόντα</Typography>
              <HandleProducts loading={loading} setLoading={setLoading} selected={selected} setSelected={setSelected} />
            </Paper>
          </form>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* tags */}
          <Paper variant="outlined" className={classes.paper}>
            <Typography className={classes.title}>Ετικέτες</Typography>
            <TextField
              className={classes.input}
              select
              name="tags"
              variant="outlined"
              label="Ετικέτες"
              fullWidth
              onChange={handleTags}
              value={tags}
              SelectProps={{
                multiple: true,
                endAdornment: (
                  <InputAdornment position="end" style={{ marginRight: "16px" }}>
                    <Tooltip title="Εάν ξαναδιαλέξεις την ετικέτα θα την σβήσεις." placement="top">
                      <InfoRounded color="action" />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            >
              {tagList?.length < 1 ? (
                <MenuItem value="loading" disabled>
                  loading
                </MenuItem>
              ) : null}

              {tagList?.map((data) => {
                return (
                  <MenuItem key={data._id} value={data._id}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </TextField>
            <CreateTag fetchTags={fetchTags} />
          </Paper>
          {/* seo */}
          <Paper variant="outlined" className={classes.paper}>
            <Typography className={classes.title}>Μηχανές αναζήτησης</Typography>
            <TextField
              inputRef={register}
              className={classes.input}
              type="text"
              name="seoName"
              label="Τίτλος"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Για καλύτερα αποτελέσματα, ο τίτλος μηχανής, θα πρέπει να περιέχει τον τίτλο προιόντος."
                      placement="top"
                    >
                      <InfoRounded color="action" />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              inputRef={register}
              className={classes.input}
              type="text"
              multiline
              name="seoDescription"
              label="Περιγραφή"
              variant="outlined"
              fullWidth
              required
              rowsMax={5}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Για καλύτερα αποτελέσματα, η περιγραφή μηχανής, θα πρέπει να περιέχει την περιγραφή προιόντος."
                      placement="top"
                    >
                      <InfoRounded color="action" />
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </DashboardHOC>
  );
};

export default CreateCategory;
