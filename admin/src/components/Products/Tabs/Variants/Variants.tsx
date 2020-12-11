import React from "react";
import { Box, FormControlLabel, Grid, Switch, Typography, LinearProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import GraphQlRequest from "../../../../graphql/graphql-request";
import { FETCH_VARIANTS } from "./VariantsQuery";
import { AuthContext } from "../../../Authentication/AuthContext";
import { VariantData } from "./VariantTypes";
import CreateVariant from "./CreateVariant/CreateVariant";
import { useDispatch } from "react-redux";
import { CreateError } from "../../../Error/ErrorActions";
import SingleVariant from "./SingleVariant/SingleVariant";

const Variants: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const [variants, setVariants] = useState<VariantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const response = await GraphQlRequest(auth.token).request(FETCH_VARIANTS, { variables: { limit: 12 } });
      setVariants(response.findAllVariants);
      setLoading(false);
    } catch (error) {
      dispatch(CreateError({ error, token: auth.token || "Bearer " }));
    }
  };

  const handleFetchImageToggle = () => {
    setShowImages(!showImages);
  };

  useEffect(() => {
    fetchVariants();
  }, [showImages]);

  return (
    <Grid container direction="row" spacing={2}>
      {loading ? (
        <div style={{ width: "100%" }}>
          <LinearProgress color="primary" />
        </div>
      ) : null}
      <Grid item xs={6}>
        <Typography variant="h5">Variants</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box textAlign="end">
          <CreateVariant />
        </Box>
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
                <SingleVariant data={data} showImages={showImages} />
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default Variants;
