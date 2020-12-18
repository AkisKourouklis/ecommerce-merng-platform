import React, { useState } from "react";
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
  Input,
  MenuItem,
  Chip,
  FormControl,
  IconButton
} from "@material-ui/core";
import InfoRounded from "@material-ui/icons/InfoRounded";
import Delete from "@material-ui/icons/Delete";
import DashboardHOC from "../../../DashboardHOC/DashboardHOC";
import useStyles from "./CreateProductStyles";
import ReactQuill from "react-quill";
import FileUpload from "../../../FileUpload/FileUpload";
import "react-quill/dist/quill.snow.css";

const CreateProduct: React.FC = () => {
  const classes = useStyles();
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[] | []>([]);

  const handleImages = (files: File[]) => {
    setImages(files);
  };

  console.log(images);

  return (
    <DashboardHOC>
      <Typography variant="h5" className={classes.title}>
        Δημιουργία προιόντος
      </Typography>
      <form>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} md={8}>
            {/* information */}
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Πληροφορίες</Typography>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    type="text"
                    name="title"
                    label="Τίτλος"
                    variant="outlined"
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Διάλεξε έναν τίτλο με βάση τα keywords από το προιόν" placement="top">
                            <InfoRounded color="action" />
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReactQuill
                    className={classes.quill}
                    placeholder="Description"
                    theme="snow"
                    value={description}
                    onChange={setDescription}
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
                  <Typography className={classes.title}>
                    <Button variant="contained" color="primary" size="small">
                      Δημιουργία Παραλαγής
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" className={classes.paper}>
              <FormControlLabel
                control={<Switch checked={false} name="fetch-images-toggle" color="primary" />}
                label="Διαθέσιμο στην ιστοσελίδα"
              />
            </Paper>
            <Paper variant="outlined" className={classes.paper}>
              <Typography className={classes.title}>Ετικέτες</Typography>
              <FormControl variant="outlined" className={classes.input}>
                <Select
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
          </Grid>
        </Grid>
      </form>
    </DashboardHOC>
  );
};

export default CreateProduct;
