import { NextPage } from "next";

const Auth: NextPage = async () => {
  return (
    <div>
      <h4>회원가입</h4>
      <form action={"/api/auth/signup"} method="POST">
        <label>아이디</label>
        <input type="text" name="userId" maxLength={20}  placeholder="아이디"/>
        <label>비밀번호</label>
        <input type="password" name="password" maxLength={15} placeholder="비밀번호" />
        <label>이메일</label>
        <input type="email" name="email" maxLength={15} placeholder="이메일" />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default Auth;
