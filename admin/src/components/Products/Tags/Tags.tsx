import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import { Box, Grid, LinearProgress, TextField, Typography } from "@material-ui/core";
import { CreateError } from "../../Error/ErrorActions";
import { FETCH_TAGS } from "./TagQueries/TagQueries";
import { ITags } from "./TagTypes";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CreateTag from "./CreateTag/CreateTag";
import DashboardHOC from "../../DashboardHOC/DashboardHOC";
import GraphqlRequest from "../../../graphql/graphql-request";
import SingleTag from "./SingleTag/SingleTag";

const Tags: React.FC = () => {
  const [tags, setTags] = useState<ITags | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { watch, register } = useForm();
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const search = watch("search");

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await GraphqlRequest(auth.token).request(FETCH_TAGS, { limit: 12, search });
      setTags(response.findAllTags);
      setLoading(false);
    } catch (error) {
      dispatch(CreateError({ errors: error, token: auth.token || "Bearer " }));
    }
  };

  useEffect(() => {
    fetchTags();
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
          <Typography variant="h5">Ετικέτες</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="end">
            <CreateTag fetchTags={fetchTags} />
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
            {tags?.tags?.map((data) => {
              return (
                <Grid key={data._id} item xs={12} md={4}>
                  <SingleTag data={data} fetchTags={fetchTags} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </DashboardHOC>
  );
};

export default Tags;
