import { MongoClient } from "mongodb";
import { global } from "styled-jsx/css";
// const url = 'mongodb+srv://kju9038:20180520@atlascluster.jidcuz4.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
const url = 'mongodb://kju9038:20180520@buyoungsil.tplinkdns.com:27017'
const options = { useNewUrlParser: true, useUnifiedTopology: true };
let connectDB


if(process.env.NODE_ENV === 'development') {
 if(!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
 }
 connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect()   
}

export { connectDB };