import {
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import { EDIT_CATEGORY, FETCH_SINGLE_CATEGORY } from "../CategoriesQueries";
import { ICategory, IEditCategory } from "../../../types/categories";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { CreateError } from "../../Error/ErrorActions";
import { CreateNotification } from "../../Notification/NotificationActions";
import CreateTag from "../../Products/Tags/CreateTag/CreateTag";
import DashboardHOC from "../../DashboardHOC/DashboardHOC";
import DeleteIcon from "@material-ui/icons/Delete";
import { FETCH_TAGS } from "../../Products/Tags/TagQueries/TagQueries";
import FileUpload from "../../FileUpload/FileUpload";
import GraphqlRequest from "../../../graphql/graphql-request";
import HandleProducts from "../CreateCategory/HandleProducts";
import { IImage } from "../../../types/images";
import { IProduct } from "../../../types/products";
import { ITag } from "../../../types/tags";
import InfoRounded from "@material-ui/icons/InfoRounded";
import { UPLOAD_IMAGE } from "../../FileUpload/FileUploadQueries";
import { apiUrl } from "../../../config/vars";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useStyles from "../../Products/Products/CreateProduct/CreateProductStyles";

interface ISelected {
  _id: string;
}

const CreateCategory: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tags, setTags] = useState<any>([]);
  const [images, setImages] = useState<File[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingHandleProducts, setLoadingHandleProducts] = useState<boolean>(false);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [, setState] = useState<unknown>();
  const { register, handleSubmit } = useForm();
  const { auth } = useContext(AuthContext);
  const { _id } = useParams<{ _id: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IEditCategory) => {
    try {
      setLoading(true);
      const { name, description, seoName, seoDescription } = values;

      const newSelected: ISelected[] = [];
      selected.map((d: string) => newSelected.push({ _id: d }));

      const newTags: ITag[] = [];
      tags.map((d: string) => newTags.push({ _id: d }));

      await saveImages();
      await GraphqlRequest(auth.token).request(EDIT_CATEGORY, {
        _id,
        name,
        description,
        seo: {
          name: seoName,
          description: seoDescription
        },
        images: category?.images,
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
      response?.uploadImage?.map((e: IImage) => category?.images?.push(e));
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

  const fetchCategory = async () => {
    try {
      if (_id) {
        setLoading(true);
        const response = await GraphqlRequest(auth.token).request(FETCH_SINGLE_CATEGORY, { _id });
        setCategory(response.categoryFindById);
        setTags(response.categoryFindById.tags);
        setSelected(response.categoryFindById.products.map((e: IProduct) => e._id));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const deleteImage = (id: string) => {
    const newImageArr = category?.images?.filter((i) => i._id !== id);
    if (category?.images) {
      category.images = newImageArr || [];
      setState({});
    }
  };

  useEffect(() => {
    fetchCategory();
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
          <Button disabled={loading} form="edit-category-form" type="submit" variant="contained" color="primary">
            Αποθήκευση κατηγορία
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit(onSubmit)} id="edit-category-form">
            {/* information */}
            {!loading && (
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
                      defaultValue={category?.name}
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
                      defaultValue={category?.description}
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Διάλεξε μία περιγραφή με βάση τα keywords από την κατηγορία"
                              placement="top"
                            >
                              <InfoRounded color="action" />
                            </Tooltip>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            )}
            {/* images */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Εικόνες</Typography>
              <FileUpload handleFileChange={handleImages} />
              <GridList className={classes.gridList} cols={2.5}>
                [
                {category?.images?.map((tile, i) => (
                  <div key={i}>
                    {tile ? (
                      <GridListTile key={i}>
                        <img style={{ maxHeight: "150px" }} src={`${apiUrl.staticUri}${tile.path}`} alt={tile.alt} />
                        <GridListTileBar
                          title={tile.alt}
                          classes={{
                            root: classes.titleBar
                          }}
                          actionIcon={
                            <Button
                              className={classes.imageDeleteButton}
                              onClick={() => deleteImage(tile._id)}
                              variant="outlined"
                              size="small"
                              startIcon={<DeleteIcon />}
                              fullWidth
                            >
                              Delete
                            </Button>
                          }
                        />
                      </GridListTile>
                    ) : null}
                  </div>
                ))}
                ]
              </GridList>
            </Paper>
            {/* Προιόντα */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Προιόντα</Typography>
              <HandleProducts
                loading={loadingHandleProducts}
                setLoading={setLoadingHandleProducts}
                selected={selected}
                setSelected={setSelected}
              />
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
          {!loading && (
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Μηχανές αναζήτησης</Typography>
              <TextField
                inputRef={register}
                className={classes.input}
                type="text"
                name="seoName"
                defaultValue={category?.seo.name}
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
                defaultValue={category?.seo.description}
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
          )}
        </Grid>
      </Grid>
    </DashboardHOC>
  );
};

export default CreateCategory;
