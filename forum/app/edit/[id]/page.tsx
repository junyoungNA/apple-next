import { NextPage } from "next";
import { findOne, IPost } from "@/app/util/mongo";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const Edit: NextPage<Props> = async ({ params }) => {
  const result: any = await findOne(params);
  console.log(result);
  return (
    <div>
      <h4>글 수정</h4>
      <form action={"/api/edit"} method="POST" className="write-form">
        <label>제목</label>
        <input
          className="write-title"
          name="title"
          defaultValue={result?.title}
        />
        <label>내용</label>
        <textarea
          className="write-content"
          maxLength={50}
          name="content"
          defaultValue={result?.content}
        ></textarea>
        <input
          type="text"
          style={{ display: "none" }}
          defaultValue={params.id}
          name="id"
        />
          <input
          type="text"
          style={{ display: "none" }}
          defaultValue={result.userEmail}
          name="userEmail"
        />
        
        <button type="submit" className="write-submit">
          버튼
        </button>
      </form>
    </div>
  );
};

export default Edit;
