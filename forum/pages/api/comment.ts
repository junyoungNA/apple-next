import { Request, Response } from "express";
import { connectDB } from "../../app/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ReqRes } from "./test";
import { getComment, insertComment } from "@/app/util/mongo";

const comment: ReqRes = async (req, res) => {
  try {
    if(req.method === 'GET') {
      const result =  await getComment(String(req.query.id));
      return res.status(200).json(result);
    }
    // MongoDB 클라이언트 연결
    if (req.method === "POST") {
      const session:any = await getServerSession(req,res,authOptions);
      if(!session) {
        console.log('로그인되지 않았습니다');
        return;
      }
      if (!req.body.comment || req.body.comment.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      const newComment = {
        comment :req.body.comment,
        email: session.user.email,
        parent:req.body.id
      }
      req.body.user = session.email;
      await insertComment(newComment);
      // const result = await getComment(req.body.id);
      return res.status(200).json('성공');
    }
  } catch (error) {
    console.log("Failed");
    return res.status(500).json("서버 오류가 발생했습니다.");

  }
};

export default comment;
