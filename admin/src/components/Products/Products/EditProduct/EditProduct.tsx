import "react-quill/dist/quill.snow.css";
import {
  Button,
  FormControlLabel,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import { Delete, InfoRounded } from "@material-ui/icons";
import { FIND_SINGLE_PRODUCT, UPDATE_PRODUCT } from "../ProductsQueries/ProductQueries";
import { ICreateProduct, IProduct } from "../../../../types/products";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthContext";
import { CREATE_MULTIPLE_VARIANTS } from "../../Variants/VariantQueries/VariantsQuery";
import { CreateError } from "../../../Error/ErrorActions";
import { CreateNotification } from "../../../Notification/NotificationActions";
import CreateTag from "../../Tags/CreateTag/CreateTag";
import CreateVariant from "../../Variants/CreateVariant/CreateVariant";
import DashboardHOC from "../../../DashboardHOC/DashboardHOC";
import DeleteIcon from "@material-ui/icons/Delete";
import { FETCH_TAGS } from "../../Tags/TagQueries/TagQueries";
import FileUpload from "../../../FileUpload/FileUpload";
import GraphqlRequest from "../../../../graphql/graphql-request";
import { IImage } from "../../../../types/images";
import { ITag } from "../../../../types/tags";
import { IVariant } from "../../../../types/variants";
import ReactQuill from "react-quill";
import { UPLOAD_IMAGE } from "../../../FileUpload/FileUploadQueries";
import { apiUrl } from "../../../../config/vars";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useStyles from "../CreateProduct/CreateProductStyles";

const EditProduct: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit, watch } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tags, setTags] = useState<any>([]);
  const [tagList, setTagList] = useState<ITag[]>([]);
  const [images, setImages] = useState<File[] | []>([]);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(null);
  const [, setState] = useState<unknown>();
  const dispatch = useDispatch();
  const classes = useStyles();

  const isActive = watch("isActive", false);

  const fetchTags = async () => {
    try {
      const response = await GraphqlRequest(auth.token).request(FETCH_TAGS);
      setTagList(response.findAllTags.tags);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      if (_id) {
        const response = await GraphqlRequest(auth.token).request(FIND_SINGLE_PRODUCT, { _id });
        setProduct(response.findProductById);
        setTags(response.findProductById.tags);
        setLoading(false);
      }
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
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
    name,
    vendor
  }: ICreateProduct) => {
    try {
      const newTags: ITag[] = [];
      tags.map((d: string) => newTags.push({ _id: d }));

      await saveImages();
      await GraphqlRequest(auth.token).request(UPDATE_PRODUCT, {
        _id: product?._id,
        name,
        description: description || product?.description,
        sku,
        barcode,
        isActive,
        quantity: Number(quantity),
        tax: Number(tax),
        images: product?.images,
        variants: product?.variants,
        tags: newTags,
        seo: {
          name: seoName,
          description: seoDescription
        },
        price: {
          price: Number(price),
          costPrice: Number(costPrice),
          comparePrice: Number(comparePrice)
        },
        vendor
      });
      dispatch(
        CreateNotification({ notification: "Το νέο προιόν αποθηκεύτηκε με επυτιχία!", notificationType: "success" })
      );
      fetchProduct();
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleTags = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const removeVariantFromProduct = (index: number) => {
    if (product?.variants) {
      product.variants.splice(index, 1);
      setState({});
    }
  };

  const addVariantToProduct = async ({ barcode, sku, color, material, price, quantity, size, images }: IVariant) => {
    try {
      const variants = [
        {
          color,
          size,
          price,
          material,
          quantity,
          sku,
          barcode,
          images,
          productId: _id
        }
      ];
      const response = await GraphqlRequest(auth.token).request(CREATE_MULTIPLE_VARIANTS, { variants });
      response.createMultipleVariants.map((e: IVariant) => product?.variants?.push(e));
      setState({});
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleImages = (files: File[]) => {
    setImages(files);
  };

  const deleteImage = (id: string) => {
    const newImageArr = product?.images?.filter((i) => i._id !== id);
    if (product?.images) {
      product.images = newImageArr || [];
      setState({});
    }
  };

  const saveImages = async (): Promise<void> => {
    try {
      const response = await GraphqlRequest(auth.token).request(UPLOAD_IMAGE, { files: images });
      response?.uploadImage?.map((e: IImage) => product?.images?.push(e));
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchProduct();
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
            Επεξεργασία προιόντος
          </Typography>
        </Grid>
        <Grid item>
          <Button disabled={loading} form="create-product-form" type="submit" variant="contained" color="primary">
            Αποθήκευση προιόντος
          </Button>
        </Grid>
      </Grid>
      {!loading ? (
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
                      defaultValue={product?.name}
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
                      defaultValue={product?.description}
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
                <GridList className={classes.gridList} cols={2.5}>
                  [
                  {product?.images?.map((tile, i) => (
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
                      defaultValue={product?.price?.price}
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
                      defaultValue={product?.price?.comparePrice}
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
                      defaultValue={product?.price?.costPrice}
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
                      defaultValue={product?.tax}
                      name="tax"
                      label="Tax"
                      variant="outlined"
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
                      defaultValue={product?.quantity}
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
                      defaultValue={product?.vendor}
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
                      defaultValue={product?.barcode}
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
                      defaultValue={product?.sku}
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
                  <CreateVariant canAddProduct={false} pushToVariantArray={addVariantToProduct} />
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
                        {product?.variants?.map((data, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell align="left">{data.barcode}</TableCell>
                              <TableCell align="left">{data.sku}</TableCell>
                              <TableCell align="left">{data.color}</TableCell>
                              <TableCell align="left">{data.material}</TableCell>
                              <TableCell align="left">{data.size}</TableCell>
                              <TableCell align="left">{data.quantity}</TableCell>
                              <TableCell align="left">{data.price.price}€</TableCell>
                              <TableCell align="left">{data.price.comparePrice}€</TableCell>
                              <TableCell align="left">{data.price.costPrice}€</TableCell>
                              <TableCell align="center">
                                <IconButton onClick={() => removeVariantFromProduct(i)}>
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
                control={
                  <Switch defaultChecked={product?.isActive} inputRef={register} name="isActive" color="primary" />
                }
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
                value={tags}
                fullWidth
                onChange={handleTags}
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
                defaultValue={product?.seo?.name}
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
                defaultValue={product?.seo?.description}
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
      ) : null}
    </DashboardHOC>
  );
};

export default EditProduct;
