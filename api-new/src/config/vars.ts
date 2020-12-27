export const env = process.env.NODE_ENV;
export const jwtExpirationInterval = process.env.JWT_EXPIRATION_HOURS || '72h';
export const jwtUserSecret: string = process.env.JWT_USER_SECRET || 'testtest';
export const sendgridApiKey = process.env.SENDGRID_API_KEY;
export const port = process.env.PORT;
export const twillioid = process.env.TWILLIO_ID;
export const twilliotoken = process.env.TWILLIO_TOKEN;
export const twillioNumber = process.env.TWILLIO_NUMBER;
export const forgotPasswordPrefix = 'forgot-password:';
export const apiUrl = {
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/graphql/v1'
      : 'https://www.api.sovrakofanela.site/graphql/v1'
};
export const clientUrl = {
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.sovrakofanela.site'
};
