import { login } from '../auth'

export default function Login() {

  return (
    <div className="login-container">

      <h1>Alta Video Retrieval</h1>

      <button onClick={login}>
        Login with Cognito
      </button>

    </div>
  )
}
