import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

(async () => {
  try {
    await mongoose.connect(config.MONODB_URL);
    console.log("DB CONNECTED");

    app.on("error", (error) => {
      console.log(err);
      throw err;
    });

    const onListening = () => {
      console.log("Server is listening on port " + config.PORT);
    };

    app.listen(config.PORT, onListening);
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
})();
