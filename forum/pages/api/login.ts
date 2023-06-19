import { Request, Response } from "express";
import { connectDB } from "../../app/util/database";
import { findOne } from "@/app/util/mongo";
import { ReqRes } from "./test";

const login: ReqRes = async (req, res) => {
  try {
    // MongoDB 클라이언트 연결
    if (req.method === "GET") {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("user")
        .findOne({ userId: req.body.userId });
      return res.status(200).json({ date: new Date(), result });
    }
    if (req.method === "POST") {
      if (req.body.userId.trim() === "" || req.body.password.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      const result = await findOne(req.body);
      return res.status(200).json({ message: "로그인 성공", result });
    }
  } catch (error) {
    console.log("Failed");
  }
};

export default login;
