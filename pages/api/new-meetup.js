// /api/new-meetup
import { MongoClient } from "mongodb";

// POST /api/new-meetup
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = MongoClient.connect(
      "mongodb+srv://ruxio2000:7czCGPYqRCom2oZU@cluster0.4ms0hf0.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = (await client).db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    (await client).close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
