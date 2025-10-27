import mongoose from "mongoose";
try {
    mongoose.connect(process.env.MONGO_URI).then(() => { console.log("MongoDB Connected"); });
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=db.config.js.map