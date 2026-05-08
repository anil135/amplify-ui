const cognitoConfig = {

  domain: import.meta.env.VITE_COGNITO_DOMAIN,

  clientId: import.meta.env.VITE_COGNITO_CLIENT_ID,

  redirectUri: window.location.origin,

  responseType: 'code',

  scope: 'openid email profile'
}

export default cognitoConfig
