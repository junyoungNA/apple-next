import { MongoClient, MongoClientOptions } from "mongodb";
const url =
  "mongodb+srv://zoon:qwer1234@cluster0.chpelc8.mongodb.net/?retryWrites=true&w=majority";
const options: MongoClientOptions = {};
let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
