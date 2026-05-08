import config from './cognitoConfig'

export function login() {

  const loginUrl =
    `${config.domain}/login?` +
    `client_id=${config.clientId}` +
    `&response_type=${config.responseType}` +
    `&scope=${config.scope}` +
    `&redirect_uri=${config.redirectUri}`

  window.location.href = loginUrl
}

export function logout() {

  localStorage.clear()

  const logoutUrl =
    `${config.domain}/logout?` +
    `client_id=${config.clientId}` +
    `&logout_uri=${config.redirectUri}`

  window.location.href = logoutUrl
}
