import { Box, FormControlLabel, Grid, Paper, Switch, Typography, CircularProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import GraphQlRequest from "../../../../graphql/graphql-request";
import { FETCH_VARIANTS } from "./VariantsQuery";
import { AuthContext, ErrorContext } from "../../../Context/Context";
import SingleVariant from "./SingleVariant";

export default ({ classes }) => {
  const { auth } = useContext(AuthContext);
  const { createError } = useContext(ErrorContext);
  const [variants, setVariants] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const response = await GraphQlRequest(auth.token).request(FETCH_VARIANTS, { variables: { limit: 12 } });
      setVariants(response.findAllVariants);
      setLoading(false);
    } catch (err) {
      createError(err);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h5">Variants</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="end">
            <FormControlLabel
              control={<Switch checked={false} name="checkedB" color="primary" />}
              label="Fetch Images"
            />
          </Box>
        </Grid>
        {loading ? (
          <CircularProgress color="inherit" size="20px" />
        ) : (
          <>
            {variants.variants.map((data) => (
              <Grid key={data._id} item xs={3}>
                <Paper className={classes.paper} variant="outlined">
                  <SingleVariant variant={data} />
                </Paper>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};
