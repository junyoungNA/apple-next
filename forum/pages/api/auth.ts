import { findOne, findUserList, insertUser } from "@/app/util/mongo";
import { ReqRes } from "./test";

const auth: ReqRes = async (req, res) => {
  try {
    // MongoDB 클라이언트 연결
    if (req.method === "GET") {
      const result = await findOne(req.body);
      return res.status(200).json({ date: new Date(), result });
    }
    if (req.method === "POST") {
      if (req.body.userId.trim() === "" || req.body.password.trim() === "") {
        return res.status(500).json("공백은 입력할 수 없습니다.");
      }
      const result = await findUserList();
      const find = result.findIndex(item => {
        if ("userId" in item) {
          return req.body.userId === item.userId;
        }
        return false;
      });

      if (find !== -1) {
        console.log("이미 가입된 아이디입니다.");
        return res.redirect(302, "/auth");
      }
      await insertUser(req.body);
      return res.redirect(302, "/");
    }
  } catch (error) {
    console.log("Failed");
  }
};

export default auth;
