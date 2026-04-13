import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function AddBook(){
    const navigate = useNavigate();
    const [form,setForm] = useState({
        title:"",
        author: "",
        subject: "",
        condition: ""
    });
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await API.post("/books",{
                ...form,
                owner_id:1
            });
            alert("Book added successfully");
            navigate("/");
        }catch(error){
            console.error(error);
            alert("Failed to load book");
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Add Book</h2>
            <input placeholder="Title"
               onChange={(e)=>setForm({...form,title:e.target.value})}/>
            <input placeholder="author"
            onChange={(e)=>setForm({...form,author:e.target.value})}/>
            <input placeholder="subject"
            onChange={(e)=>setForm({...form,subject:e.target.value})}/>
            <input placeholder="condition"
            onChange={(e)=>setForm({...form,condition:e.target.value})}/>
            <button type="submit">Add Book</button>
        </form>
    );
}
export default AddBook;
