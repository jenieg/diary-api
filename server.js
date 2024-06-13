import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

const port = process.env.PORT;

//initialize express
const app = express();

//MIDDLEWARE
//allows form body to be parsed for post creation
app.use(express.json())

//Routes
app.use('/api/posts', postRoutes);

//connection to DB
const connectDB = async () => {
    try {
        //insert format needs to match db format
        mongoose.set('strictQuery', true);
        //connection to mongoDB
        mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB is connected')
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}
//Start connection to DB
connectDB().then(() => {
    //starts the server
    app.listen(port, () => console.log(`Listening on port ${port}`));    
}).catch(err => console.log(err));

