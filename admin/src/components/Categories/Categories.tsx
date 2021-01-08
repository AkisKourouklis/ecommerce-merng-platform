import { Box, Button, Grid, LinearProgress, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { CATEGORIES_FIND_ALL } from "./CategoriesQueries";
import { CreateError } from "../Error/ErrorActions";
import DashboardHOC from "../DashboardHOC/DashboardHOC";
import GraphqlRequest from "../../graphql/graphql-request";
import { ICategory } from "../../types/categories";
import SingleCategory from "./SingleCategory/SingleCategory";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Categories: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { auth } = useContext(AuthContext);
  const { register, watch } = useForm();
  const dispatch = useDispatch();

  const search = watch("search");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(CATEGORIES_FIND_ALL, { search });
      setCategories(response.categoryFindAll.categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchCategories();
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
          <Typography variant="h5">Κατηγορίες</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="end">
            <Button variant="contained" color="primary" type="button" href="/categories/create">
              Δημιουργία κατηγορίας
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

        {loading ? null : (
          <>
            {categories?.map((data) => {
              return (
                <Grid key={data._id} item xs={12} md={4}>
                  <SingleCategory fetchCategories={fetchCategories} data={data} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </DashboardHOC>
  );
};

export default Categories;
