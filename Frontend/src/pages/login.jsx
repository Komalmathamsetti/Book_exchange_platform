import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
function Login(){
    const navigate = useNavigate();
    const [form,setform] = useState({
        email: "",
        pssword: ""
    });
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            const res = await API.post("/auth/login",form);
            localStorage.setItem("token",res.data.token);
            alert("Login successful");
            navigate("/");

        }catch(error){
            console.error(error);
            alert("Invalid credentials");
        }
    };
    return (
        <form onSubmit = {handleLogin}>
            <h2>Login</h2>
            <input 
               type="email"
               placeholder="Email"
               onChange={(e)=>setform({...form,email:e.target.value})}
            />
            <input
               type="password"
               placeholder="Password"
               onChange={(e)=>setform({...form,password:e.target.value})}
            />
            <button type="submit">Login</button>
        </form>
    );
}
export default Login;