import { Request, Response } from "express";
import { connectDB } from "../../app/util/database";

type Auth = (req: Request, res: Response) => any;
type User = {
  _id: string;
  userId: string;
  passwrod: string;
};
const auth: Auth = async (req, res) => {
  try {
    // MongoDB 클라이언트 연결
    if (req.method === "GET") {
      const db = (await connectDB).db("forum");
      console.log(req.body);
      const result = await db
        .collection("user")
        .findOne({ userId: req.body.userId });
      console.log(result);
      return res.status(200).json({ date: new Date(), result });
    }
    if (req.method === "POST") {
      if (req.body.userId.trim() === "" || req.body.password.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      const db = (await connectDB).db("forum");
      const result = await db.collection("user").find().toArray();
      const find = result.findIndex(
        (user: User) => req.body.userId === user.userId
      );
      if (find !== -1) {
        console.log("이미 가입된 아이디입니다.");
        return res.redirect(302, "/auth");
      }
      db.collection("user").insertOne(req.body);
      return res.redirect(302, "/");
    }
  } catch (error) {
    console.log("Failed");
  }
};

export default auth;
