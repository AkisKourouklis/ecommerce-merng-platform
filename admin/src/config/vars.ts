export const apiUrl = {
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/graphql/v1"
      : "https://www.api.sovrakofanela.site/graphql/v1",
  staticUri:
    process.env.NODE_ENV === "development" ? "http://localhost:3001/graphql/v1" : "https://www.api.sovrakofanela.site"
};
export const clientUrl = {
  uri: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.sovrakofanela.site"
};
