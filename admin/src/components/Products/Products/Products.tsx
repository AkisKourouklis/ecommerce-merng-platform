import { Box, Button, FormControlLabel, Grid, LinearProgress, Switch, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DashboardHOC from "../../DashboardHOC/DashboardHOC";
import { IProduct } from "../../../types/products";

const Products: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [showImages, setShowImages] = useState<boolean>(false);
  const { register, watch } = useForm();
  const search = watch("search");

  console.log(search, setLoading, setProducts, setShowImages);

  return (
    <DashboardHOC>
      {loading ? (
        <div style={{ width: "100%" }}>
          <LinearProgress color="primary" />
        </div>
      ) : null}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Products</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="end">
            <Button variant="contained" color="primary" type="button" href="/products/products/create">
              Create Product
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register}
            defaultValue=""
            type="search"
            name="search"
            fullWidth
            label="Search"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="end">
            <FormControlLabel
              control={<Switch checked={showImages} name="fetch-images-toggle" color="primary" />}
              label="Load Images"
            />
          </Box>
        </Grid>

        {loading ? null : (
          <>
            {products?.map((data) => {
              return (
                <Grid key={data._id} item xs={12} md={4}>
                  single product
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </DashboardHOC>
  );
};

export default Products;
