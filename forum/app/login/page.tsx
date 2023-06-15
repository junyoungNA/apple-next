import { ObjectId } from "mongodb";
import { connectDB } from "../util/database";
import { NextPage } from "next";

const Login: NextPage = async () => {
  const db = (await connectDB).db("forum");
  //   const result = await db
  //     .collection("post")
  //     .findOne({ _id: new ObjectId(params.id) });
  return (
    <div>
      <h4>로그인</h4>
      <form action={"/api/login"} method="POST">
        <label>아이디</label>
        <input type="text" name="userId" />
        <label>비밀번호</label>
        <input type="password" name="password" />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default Login;
