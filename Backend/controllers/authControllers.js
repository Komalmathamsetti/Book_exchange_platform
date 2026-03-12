const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async(req, res)=>{
    try{
        const {name,email,password,college,branch,year} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const result = await pool.query(
            "INSERT INTO users(name,email,password,college,branch,year) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [name,email,hashPassword,college,branch,year]
        );
        res.json({
            message: "User registerd successfully",
            user : result.row[0],
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};
exports.loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;
        const result = await pool.query(
           "SELECT * FROM users WHERE email = $1",[email]
        );
        if (result.rows.length === 0){
            return res.status(400).json({message: "User not found"});
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(hashPassword,password);
        if(!validPassword){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign(
            {userId : user.id},
            "secret_key",
            {expiresIn : "1h"}
        );
        res.json({
            message:"Login Successful",
            token,
        });
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
};