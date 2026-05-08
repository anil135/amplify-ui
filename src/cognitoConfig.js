const cognitoConfig = {
  domain: "https://us-east-11rn0rkkbw.auth.us-east-1.amazoncognito.com",

  clientId: "1v90ir8c0d96jnmc88pjsd0sa6",

  redirectUri: "http://localhost:5173",

  responseType: "code",

  scope: "email openid profile"
};

export default cognitoConfig;
