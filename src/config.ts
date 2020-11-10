export default {
  AWS: {
    Region: process.env.VUE_APP_AWS_REGION,
    UserPoolId: process.env.VUE_APP_AWS_USER_POOL_ID,
    ClientId: process.env.VUE_APP_AWS_CLIENT_ID,
    IdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOL_ID
  }
};
