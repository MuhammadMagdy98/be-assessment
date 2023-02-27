const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const connectToDatabase = () => {
  // we use  mongoose.set("strictQuery", false) to avoid the deprecation warning
  // source:
  // https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to

  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection to MongoDB Successfully");
    })
    .catch((err) => {
      console.error("Connection error: ", err);
    });
};

module.exports = connectToDatabase;
