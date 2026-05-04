import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  
  return (
  <div style={styles.container}>
    <form onSubmit={handleSubmit} style={styles.card}>
      <h2>🔐 Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={styles.input}
      />

      {/* 🔵 Login Button */}
      <button type="submit" style={styles.button}>
        Login
      </button>

      
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#38bdf8", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>

    </form>
  </div>
);
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh"
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "12px"
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    color: "white"
  }
};

export default Login;