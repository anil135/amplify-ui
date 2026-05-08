import axios from 'axios'

import config from '../cognitoConfig'

export async function exchangeCodeForToken(code) {

  const params = new URLSearchParams()

  params.append('grant_type', 'authorization_code')
  params.append('client_id', config.clientId)
  params.append('code', code)
  params.append('redirect_uri', config.redirectUri)

  const response = await axios.post(
    `${config.domain}/oauth2/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )

  return response.data
}
