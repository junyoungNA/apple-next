import { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <div>
      <h4>글 작성</h4>
      <form action={"/api/test"} method="POST" className="write-form">
        <label>제목</label>
        <input className="write-title" name="title" />
        <label>내용</label>
        <textarea
          className="write-content"
          maxLength={50}
          name="content"
        ></textarea>
        <button type="submit" className="write-submit">
          버튼
        </button>
      </form>
    </div>
  );
};

export default Write;
