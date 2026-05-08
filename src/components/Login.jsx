import { login } from "../auth";

export default function Login() {
  return (
    <div style={styles.container}>
      <h1>Alta Video Retrieval</h1>

      <button onClick={login}>
        Login with Cognito
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  }
};
