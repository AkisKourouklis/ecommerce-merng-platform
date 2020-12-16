import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { Box, FormControlLabel, Grid, Switch, Typography, LinearProgress, TextField } from "@material-ui/core";
import { CreateError } from "../../Error/ErrorActions";
import { FETCH_VARIANTS } from "./VariantQueries/VariantsQuery";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { VariantData } from "./VariantTypes";
import CreateVariant from "./CreateVariant/CreateVariant";
import DashboardHOC from "../../DashboardHOC/DashboardHOC";
import GraphQlRequest from "../../../graphql/graphql-request";
import SingleVariant from "./SingleVariant/SingleVariant";

const Variants: React.FC = () => {
  const { register, watch } = useForm();
  const { auth } = useContext(AuthContext);
  const [variants, setVariants] = useState<VariantData | null>(null);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const search = watch("search");
  const dispatch = useDispatch();

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const response = await GraphQlRequest(auth.token).request(FETCH_VARIANTS, { limit: 12, search });
      setVariants(response.findAllVariants);
      setLoading(false);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  const handleFetchImageToggle = () => {
    setShowImages(!showImages);
  };

  useEffect(() => {
    fetchVariants();
  }, [showImages, search]);

  return (
    <DashboardHOC>
      {loading ? (
        <div style={{ width: "100%" }}>
          <LinearProgress color="primary" />
        </div>
      ) : null}
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Variants</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="end">
            <CreateVariant fetchVariants={fetchVariants} />
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
              control={
                <Switch
                  onChange={handleFetchImageToggle}
                  checked={showImages}
                  name="fetch-images-toggle"
                  color="primary"
                />
              }
              label="Load Images"
            />
          </Box>
        </Grid>

        {loading ? null : (
          <>
            {variants?.variants?.map((data) => {
              return (
                <Grid key={data._id} item xs={12} md={4}>
                  <SingleVariant data={data} showImages={showImages} fetchVariants={fetchVariants} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </DashboardHOC>
  );
};

export default Variants;
