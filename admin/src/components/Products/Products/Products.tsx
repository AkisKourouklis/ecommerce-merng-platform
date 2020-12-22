import { Box, Button, FormControlLabel, Grid, LinearProgress, Switch, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardHOC from "../../DashboardHOC/DashboardHOC";
import { IProduct } from "../../../types/products";
import { useDispatch } from "react-redux";
import { CreateError } from "../../Error/ErrorActions";
import GraphqlRequest from "../../../graphql/graphql-request";
import { AuthContext } from "../../Authentication/AuthContext";
import { FIND_ALL_PRODUCTS } from "./ProductsQueries/ProductQueries";
import SingleProduct from "./SingleProduct/SingleProduct";

const Products: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [showImages, setShowImages] = useState<boolean>(false);
  const { register, watch } = useForm();
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const search = watch("search");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(FIND_ALL_PRODUCTS, { search });
      setProducts(response.findAllProducts.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

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
                  <SingleProduct data={data} />
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
