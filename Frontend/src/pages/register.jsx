import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
function Register(){
    const navigate = useNavigate();
    const [form,setform] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleRegister = async(e)=>{
        e.preventDefault();
        try{
            await API.post("/auth/register",form);
            alert("Registered successfully");
            navigate("/login");
        }catch(error){
            console.error(error);
            alert("Registration failed");
        }
    };
    return(
        <form onSubmit = {handleRegister}>
            <h2>Register</h2>
            <input 
                placeholder="name"
                onChange={(e)=>setform({...form,name:e.target.value})}
            />
            <input 
                placeholder="email"
                onChange={(e)=>setform({...form,email:e.target.value})}
            />
            <input
                placeholder="password"
                onChange={(e)=>setform({...form,password:e.target.value})}
            />
            <button type="submit">Register</button>
        </form>
    );
}
export default Register;