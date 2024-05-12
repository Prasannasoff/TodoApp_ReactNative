//connecting database
const mongoose = require("mongoose");

// MongoDB connection URL
const mongoURL = 'mongodb+srv://Prasannadb:Prasunoff%402004@cluster0.5phrhoj.mongodb.net/TODOAPP';

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Deprecated option (no effect)
    useUnifiedTopology: true // Deprecated option (no effect)
})
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error);
    });

// Event listeners for MongoDB connection
mongoose.connection.on('error', (error) => {
    console.error("MongoDB Connection Error:", error);
});

mongoose.connection.on('connected', () => {
    console.log("MongoDB Connection Success");
});

module.exports = mongoose;
