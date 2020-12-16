export const env = process.env.NODE_ENV;
export const jwtExpirationInterval = process.env.JWT_EXPIRATION_HOURS;
export const jwtUserSecret = process.env.JWT_USER_SECRET;
export const nodemailerEmail = process.env.NODEMAILER_EMAIL;
export const nodemailerEmailPassword = process.env.NODEMAILER_EMAIL_PASSWORD;
export const googleClientId = process.env.GOOGLE_CLIENTID;
export const googleClientSecret = process.env.GOOGLE_CLIENTSECRET;
export const googleRefreshToken = process.env.GOOGLE_REFRESHTOKEN;
export const port = process.env.PORT;
export const twillioid = process.env.TWILLIO_ID;
export const twilliotoken = process.env.TWILLIO_TOKEN;
export const twillioNumber = process.env.TWILLIO_NUMBER;
export const apiUrl = {
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5001/graphql/v1'
      : 'https://www.api.sovrakofanela.site/graphql/v1'
};
export const clientUrl = {
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://www.sovrakofanela.site'
};
export const mongo = {
  uri: process.env.NODE_ENV === 'development' ? process.env.MONGO_URI : process.env.MONGO_URI_PRODUCTION
};
