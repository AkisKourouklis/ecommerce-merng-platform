import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  InputAdornment,
  Tooltip,
  Button,
  FormControlLabel,
  Switch,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  LinearProgress
} from "@material-ui/core";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CREATE_PRODUCT } from "../ProductsQueries/ProductQueries";
import { CREATE_MULTIPLE_VARIANTS } from "../../Variants/VariantQueries/VariantsQuery";
import { CreateNotification } from "../../../Notification/NotificationActions";
import { Delete } from "@material-ui/icons";
import { FETCH_TAGS } from "../../Tags/TagQueries/TagQueries";
import { ICreateProduct } from "../../../../types/products";
import { IImage } from "../../../../types/images";
import { ITag } from "../../../../types/tags";
import { IVariant } from "../../../../types/variants";
import { UPLOAD_IMAGE } from "../../../FileUpload/FileUploadQueries";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CreateTag from "../../Tags/CreateTag/CreateTag";
import CreateVariant from "../../Variants/CreateVariant/CreateVariant";
import DashboardHOC from "../../../DashboardHOC/DashboardHOC";
import FileUpload from "../../../FileUpload/FileUpload";
import GraphqlRequest from "../../../../graphql/graphql-request";
import InfoRounded from "@material-ui/icons/InfoRounded";
import ReactQuill from "react-quill";
import useStyles from "./CreateProductStyles";
import { CreateError } from "../../../Error/ErrorActions";

// eslint-disable-next-line sonarjs/cognitive-complexity
const CreateProduct: React.FC = () => {
  //test
  const classes = useStyles();
  const [images, setImages] = useState<File[] | []>([]);
  const [variantArray, setVariantArray] = useState<IVariant[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tags, setTags] = useState<any>([]);
  const [description, setDescription] = useState<string | null>(null);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [, setState] = useState<unknown>();
  const { register, handleSubmit, watch } = useForm();
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const isActive = watch("isActive");

  const fetchTags = async () => {
    try {
      const response = await GraphqlRequest(auth.token).request(FETCH_TAGS);
      setTagList(response.findAllTags.tags);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleTags = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value);
  };

  const handleImages = (files: File[]) => {
    setImages(files);
  };

  const onSubmit = async ({
    barcode,
    sku,
    price,
    comparePrice,
    costPrice,
    quantity,
    seoDescription,
    seoName,
    tax,
    name
  }: ICreateProduct) => {
    try {
      setLoading(true);

      const newTags: ITag[] = [];
      tags.map((d: string) => newTags.push({ _id: d }));

      const imagesResponse = await saveImages();
      const variantsResponse = await saveVariants();
      const response = await GraphqlRequest(auth.token).request(CREATE_PRODUCT, {
        barcode,
        sku,
        description,
        images: imagesResponse,
        isActive,
        price: {
          price: Number(price),
          comparePrice: Number(comparePrice),
          costPrice: Number(costPrice)
        },
        quantity: Number(quantity),
        seo: {
          name: seoName,
          description: seoDescription
        },
        tags: newTags,
        tax: Number(tax),
        name,
        variants: variantsResponse
      });
      dispatch(
        CreateNotification({ notification: "Το νέο προιόν δημιουργήθεικε με επυτιχία!", notificationType: "success" })
      );
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const saveImages = async (): Promise<IImage[] | undefined> => {
    try {
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      return response.uploadImage;
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const pushToVariantArray = ({ barcode, color, material, price, quantity, size, sku }: IVariant): void => {
    setVariantArray((prevArray: IVariant[]) => [
      ...prevArray,
      { barcode, color, material, price, quantity, size, sku }
    ]);
  };

  const removeItemFromVariantArr = (index: number) => {
    const newArr = variantArray;
    newArr.splice(index, 1);
    setVariantArray(newArr);
    setState({});
  };

  const saveVariants = async () => {
    try {
      console.log(variantArray);
      const response = await GraphqlRequest(auth.token).request(CREATE_MULTIPLE_VARIANTS, { variants: variantArray });
      return response.createMultipleVariants;
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleDescription = (value: string) => {
    console.log(value);
    setDescription(value);
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
            Δημιουργία προιόντος
          </Typography>
        </Grid>
        <Grid item>
          <Button disabled={loading} form="create-product-form" type="submit" variant="contained" color="primary">
            Αποθήκευση προιόντος
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={1}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit(onSubmit)} id="create-product-form">
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
                          <Tooltip title="Διάλεξε ένα όνομα με βάση τα keywords από το προιόν" placement="top">
                            <InfoRounded color="action" />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReactQuill
                    onChange={handleDescription}
                    className={classes.quill}
                    placeholder="Περιγραφή"
                    theme="snow"
                  />
                </Grid>
              </Grid>
            </Paper>
            {/* images */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Εικόνες</Typography>
              <FileUpload handleFileChange={handleImages} />
            </Paper>
            {/* pricing */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Τιμές</Typography>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="number"
                    name="price"
                    label="Price"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">€</InputAdornment>,
                      inputProps: { min: 0, max: 10000, step: "0.1" }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="number"
                    name="comparePrice"
                    label="Compare Price"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">€</InputAdornment>,
                      inputProps: { min: 0, max: 10000, step: "0.1" }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="number"
                    name="costPrice"
                    label="Cost price"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">€</InputAdornment>,
                      inputProps: { min: 0, max: 10000, step: "0.1" }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="number"
                    name="tax"
                    label="Tax"
                    variant="outlined"
                    defaultValue="24"
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      inputProps: { min: 0, max: 10000, step: "0.1" }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            {/* inventory */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Αποθήκη</Typography>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="number"
                    name="quantity"
                    label="Ποσότητα"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="text"
                    name="vendor"
                    label="Κατασκευαστής"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="text"
                    name="barcode"
                    label="Barcode"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Βάλε σε κάθε προιόν barcode για να είναι καλύτερο το seo και ευκολότερη η μετάβαση σε άλλες ιστοσελίδες. ΕΙΝΑΙ ΠΟΛΥ ΣΥΜΑΝΤΙΚΟ !"
                            placement="top"
                          >
                            <InfoRounded color="action" />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register}
                    className={classes.input}
                    type="text"
                    name="sku"
                    label="Κωδικός προιόντος (SKU)"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Βάλτε σε κάθε προιόν SKU για να είναι καλύτερο το seo, βάλτε το ίδιο με αυτό που έχουν και οι εταιρείες που παίρνετε τα προιόντα."
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
          </form>
          {/* variants */}
          <Paper variant="outlined" className={classes.paper}>
            <Grid container direction="row" spacing={1}>
              <Grid item>
                <Typography className={classes.title}>Παραλαγές</Typography>
              </Grid>
              <Grid item style={{ marginLeft: "auto" }}>
                <CreateVariant canAddProduct={false} pushToVariantArray={pushToVariantArray} />
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="variants-label">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Barcode</TableCell>
                        <TableCell align="left">Κωιδικός</TableCell>
                        <TableCell align="left">Χρώμα</TableCell>
                        <TableCell align="left">Υλικό</TableCell>
                        <TableCell align="left">Μέγεθος</TableCell>
                        <TableCell align="left">Ποσότητα</TableCell>
                        <TableCell align="left">Τιμή Έκπτωση</TableCell>
                        <TableCell align="left">Τιμή</TableCell>
                        <TableCell align="left">Τιμή Αγοράς </TableCell>
                        <TableCell align="left">Διαγραφή</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {variantArray.map((data, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell component="th" scope="row">
                              {data.barcode}
                            </TableCell>
                            <TableCell align="left">{data.sku}</TableCell>
                            <TableCell align="left">{data.color}</TableCell>
                            <TableCell align="left">{data.material}</TableCell>
                            <TableCell align="left">{data.size}</TableCell>
                            <TableCell align="left">{data.quantity}</TableCell>
                            <TableCell align="left">{data.price.price}€</TableCell>
                            <TableCell align="left">{data.price.comparePrice}€</TableCell>
                            <TableCell align="left">{data.price.costPrice}€</TableCell>
                            <TableCell align="center">
                              <IconButton onClick={() => removeItemFromVariantArr(i)}>
                                <Delete color="error" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* available */}
          <Paper variant="outlined" className={classes.paper}>
            <FormControlLabel
              control={<Switch inputRef={register} name="isActive" color="primary" />}
              label="Διαθέσιμο στην ιστοσελίδα"
            />
          </Paper>
          {/* tags */}
          <Paper variant="outlined" className={classes.paper}>
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
          {/*seo*/}
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

export default CreateProduct;
