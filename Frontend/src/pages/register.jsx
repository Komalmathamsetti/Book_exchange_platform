import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";


function Register() {

  const [form, setForm] = useState({
    name: "",
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
      await API.post("/auth/register", form);

      alert("Registered successfully");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    console.log(result.user);

    alert("Google login successful");
    navigate("/");

  } catch (error) {
    console.error(error);
    alert("Google login failed");
  }
};
/*const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    alert("Google login successful");
    navigate("/");
  } catch (error) {
    console.error(error);
    alert(error.message);   // 🔥 IMPORTANT
  }
};*/


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>📝 Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

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

        <button type="submit" style={styles.button}>
          Register
        </button>
        {/* 🔥 ADD THIS BLOCK HERE */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        style={{
          ...styles.button,
          backgroundColor: "#db4437",
          marginTop: "10px"
        }}
      >
        Continue with Google
      </button>


        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#38bdf8", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
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

export default Register;