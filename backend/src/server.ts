import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT

mongoose.connect(env.MONGODB_URL).then(()=>{
    console.log("Mongo Connected");
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`);
    });
}).catch((error)=>{console.log(error)});