import { Request, Response } from "express";
import { connectDB } from "../../app/util/database";

type Test = (req: Request, res: Response) => any;

const test: Test = async (req, res) => {
  try {
    // MongoDB 클라이언트 연결
    if (req.method === "GET") {
      const db = (await connectDB).db("forum");
      const result = await db.collection("post").find().toArray();
      return res.status(200).json({ date: new Date(), result });
    }
    if (req.method === "POST") {
      if (req.body.title.trim() === "" || req.body.content.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      const db = (await connectDB).db("forum");
      await db.collection("post").insertOne(req.body);
      console.log("Success");
      return res.redirect(302, "/list");
    }
  } catch (error) {
    console.log("Failed");
  }
};

export default test;
