import { Request, Response } from "express";
import { connectDB } from "../../app/util/database";
import { ObjectId } from "mongodb";
import { editPost } from "@/app/util/mongo";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Edit = (req: Request, res: Response) => any;

const Edit: Edit = async (req, res) => {
  try {
    if (req.method === "GET") {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .findOne({ _id: new ObjectId(req.body.id) });
    }
    // MongoDB 클라이언트 연결
    if (req.method === "POST") {
      const session = await getServerSession(req,res,authOptions);
      console.log(req.body);
      if(!session) {
        console.log('로그인되지 않았습니다');
        return;
      }
      if(session.user?.email !== req.body.userEmail) {
        console.log('자신이 작성하지 않은 게시물은 수정할 수 없습니다.');
        return;
      }
      if (req.body.title.trim() === "" || req.body.content.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      await editPost({_id:new ObjectId(req.body.id)}, req.body)
      console.log("Success");
      return res.redirect(302, "/list");
    }
  } catch (error) {
    console.log("Failed");
  }
};

export default Edit;
