import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ReqRes } from "./test";
import { deleteComment, editComment, getComment, insertComment } from "@/app/util/mongo";
import { ObjectId } from "mongodb";

const comment: ReqRes = async (req, res) => {
  try {
    if (req.method === "GET") {
      const result = await getComment(String(req.query.id));
      return res.status(200).json(result);
    }
    // MongoDB 클라이언트 연결
    if (req.method === "POST") {
      req.body = JSON.parse(req.body);
      const session: any = await getServerSession(req, res, authOptions);
      if (!session) {
        console.log("로그인되지 않았습니다");
        return;
      }
      if (!req.body.comment || req.body.comment.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      const newComment = {
        comment: req.body.comment,
        email: session.user.email,
        parent: req.body.id,
      };
      req.body.user = session.email;
      await insertComment(newComment);
      const result = await getComment(req.body.id);
      return res.status(200).json(result);
    }
    if (req.method === "PUT") {
      req.body = JSON.parse(req.body);
      const session: any = await getServerSession(req, res, authOptions);
      if (!session) {
        console.log("로그인되지 않았습니다");
        return;
      }
      if (!req.body.comment || req.body.comment.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      if(session.user?.email !== req.body.email) {
        console.log('자신이 작성하지 않은 댓글은 수정할 수 없습니다.');
        return;
      }
      const newComment = {
        comment: req.body.comment,
        email: req.body.email,
        parent: req.body.parent,
      };
      await editComment({_id:new ObjectId(req.body._id)},newComment);
      const result = await getComment(req.body.parent);
      return res.status(200).json(result);
    }
    if(req.method === 'DELETE') {
      const { id } = req.query;
      await deleteComment({_id: new ObjectId(String(id))});
      return res.status(200).json("삭제완료");
    }
  } catch (error) {
    console.log("Failed");
    return res.status(500).json("서버 오류가 발생했습니다.");
  }
};

export default comment;
