import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
