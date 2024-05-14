const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require('./UserRoute');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: 'https://connectingsoulmate.com', // Whitelist your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      // Get a reference to the collection
      // const collectionName = "users";
      // const userCollection = mongoose.connection.collection(collectionName);
  
      // // Displaying indexes on the Users collection
      // // const userCollection = mongoose.connection.collection("users");
      // const indexes = await userCollection.indexes();
      // // // Drop all indexes
      // // await userCollection.dropIndexes();
  
      // console.log("Indexes on Users collection:", indexes);
      console.log("MongoDB connected successfully with indexes");
    } catch (error) {
      console.error("Error connecting to MongoDB or creating indexes:", error);
      process.exit(1);
    }
  }
  
async function startServer() {
    
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use('/api/user', userRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

connectToMongoDB().then(startServer);
