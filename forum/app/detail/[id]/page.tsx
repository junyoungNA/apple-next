import { ObjectId } from "mongodb";
import { connectDB } from "../../util/database";
import { NextPage } from "next";
type Props = {
  title: string;
  content: string;
  params: Params;
};

type Params = {
  id: string;
};

const Detail: NextPage<Props> = async ({ params }) => {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });
  return (
    <div>
      <h4>상세페이지</h4>
      <h4 className="title">{result.title}</h4>
      <p className="title-sub">{result.content}</p>
    </div>
  );
};

export default Detail;
