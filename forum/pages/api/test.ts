import { Request, Response } from "express";
import { connectDB } from "../../app/util/database";
import { deletePost, findPostList, inserPost } from "@/app/util/mongo";
import { ObjectId } from "mongodb";

export type ReqRes = (req: Request, res: Response) => any;

const test: ReqRes = async (req, res) => {
  try {
    // MongoDB 클라이언트 연결
    if (req.method === "GET") {
      const result = await findPostList();
      return res.status(200).json({ date: new Date(), result });
    }
    if (req.method === "POST") {
      if (req.body.title.trim() === "" || req.body.content.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      await inserPost(req.body);
      console.log("Success");
      return res.redirect(302, "/list");
    }
    if (req.method === "DELETE") {
      const { id } = req.query;
      await deletePost({_id: new ObjectId(id?.toString())});
      return res.status(200).json("삭제완료");
    }
  } catch (error) {
    return res.status(500).json("요청 처리 중 오류가 발생했습니다.");
  }
};

export default test;
