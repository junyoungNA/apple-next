import { NextPage } from "next";

const Auth: NextPage = async () => {
  return (
    <div>
      <h4>회원가입</h4>
      <form action={"/api/auth"} method="POST">
        <label>아이디</label>
        <input type="text" name="userId" maxLength={20} />
        <label>비밀번호</label>
        <input type="password" name="password" maxLength={15} />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default Auth;
