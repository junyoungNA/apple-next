import { NextPage } from "next";
import { findOne, IPost } from "@/app/util/mongo";
type Props = {
  title: string;
  content: string;
  params: Params;
};

type Params = {
  id: string;
};

const Detail: NextPage<Props> = async ({ params }) => {
  const result: IPost | null = await findOne(params);
  return (
    <div>
      <h4>상세페이지</h4>
      <h4 className="title">{result?.title}</h4>
      <p className="title-sub">{result?.content}</p>
    </div>
  );
};

export default Detail;
