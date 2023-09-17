import express from 'express';

const app = express();
const PORT = 5555; // Put inside ENV


app.get('/',(req,res)=>{
    return res.send("Welcome to MERN STACK")
});

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});

