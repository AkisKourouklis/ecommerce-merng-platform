import React, { useState, useContext } from "react";
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
  Select,
  MenuItem,
  Chip,
  FormControl,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@material-ui/core";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../../../Authentication/AuthContext";
import { ICreateProduct } from "../../../../types/products";
import { IImage } from "../../../../types/images";
import { IVariant } from "../../../../types/variants";
import { UPLOAD_IMAGE } from "../../../FileUpload/FileUploadQueries";
import { useForm } from "react-hook-form";
import { CREATE_VARIANT } from "../../Variants/VariantQueries/VariantsQuery";
import DashboardHOC from "../../../DashboardHOC/DashboardHOC";
import FileUpload from "../../../FileUpload/FileUpload";
import GraphqlRequest from "../../../../graphql/graphql-request";
import InfoRounded from "@material-ui/icons/InfoRounded";
import CreateVariant from "../../Variants/CreateVariant/CreateVariant";
import ReactQuill from "react-quill";
import useStyles from "./CreateProductStyles";
import { Delete } from "@material-ui/icons";

const CreateProduct: React.FC = () => {
  const classes = useStyles();
  const [images, setImages] = useState<File[] | []>([]);
  const [variantArray, setVariantArray] = useState<IVariant[]>([]);
  const [, setState] = useState<unknown>();
  const { register, handleSubmit } = useForm();
  const { auth } = useContext(AuthContext);

  const handleImages = (files: File[]) => {
    setImages(files);
  };

  const onSubmit = async (values: ICreateProduct) => {
    try {
      console.log(values);
    } catch (error) {
      //images, tags, variants should be an array of objects [{_id: ""}]
      //1) i need to save the new images.
      await saveImages();
      //2) i need to save the new variants.
      await saveVariants();
      //3) i need to save the new tags.
      //4) i need to save the new product with the image, tags & variants array of objects.

      console.log(error);
    }
  };

  const saveImages = async (): Promise<IImage[] | undefined> => {
    try {
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      return response.uploadImage;
    } catch (error) {
      // dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
      console.log(error);
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
      variantArray.map(async (data) => {
        await GraphqlRequest(auth.token).request(CREATE_VARIANT, {
          size: data.size,
          color: data.color,
          material: data.material,
          price: data.price,
          quantity: data.quantity,
          sku: data.sku,
          barcode: data.barcode,
          images: data.images
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardHOC>
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Typography variant="h5" className={classes.title}>
            Δημιουργία προιόντος
          </Typography>
        </Grid>
        <Grid item>
          <Button form="create-product-form" type="submit" variant="contained" color="primary">
            Αποθήκευση προιόντος
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)} id="create-product-form">
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} md={8}>
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
                  <ReactQuill ref={register} className={classes.quill} placeholder="Περιγραφή" theme="snow" />
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
                      startAdornment: <InputAdornment position="start">€</InputAdornment>
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
                      startAdornment: <InputAdornment position="start">€</InputAdornment>
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
                      startAdornment: <InputAdornment position="start">€</InputAdornment>
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
                      startAdornment: <InputAdornment position="start">%</InputAdornment>
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
            <Paper variant="outlined" className={classes.paper}>
              <FormControlLabel
                control={<Switch checked={false} name="isActive" color="primary" />}
                label="Διαθέσιμο στην ιστοσελίδα"
                inputRef={register}
              />
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Ετικέτες</Typography>
              <FormControl variant="outlined" className={classes.input}>
                <Select
                  inputRef={register}
                  multiple
                  value={["test", "test2"]}
                  renderValue={() => {
                    return (
                      <>
                        <Chip label="Test" onDelete={() => console.log("delete")} />
                      </>
                    );
                  }}
                >
                  <MenuItem value="test">test</MenuItem>
                  <MenuItem value="test2">test2</MenuItem>
                </Select>
              </FormControl>
            </Paper>
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
      </form>
    </DashboardHOC>
  );
};

export default CreateProduct;
