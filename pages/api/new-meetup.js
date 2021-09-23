import { MongoClient } from "mongodb";
// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://Murbans:kriitinjsh@nextjsfree.f9bm9.mongodb.net/nextJSFree?retryWrites=true&w=majority"
    );
    const db = client.db();
    const mettupsCollection = db.collection("meetups");

    const result = await mettupsCollection.insertOne(data);
    console.log("~~~~",result);
    client.close();

    res.status(201).json({message: 'Meetup inserted!'});
  }
}
export default handler;