import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
