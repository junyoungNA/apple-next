import { NextPage } from "next";

const Login: NextPage = async () => {
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
