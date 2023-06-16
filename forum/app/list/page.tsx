import Link from "next/link";
import { connectDB } from "../util/database";
import DetailLink from "./DetailLink";

interface IPost {
  _id: object;
  title: string;
  content: string;
}

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  //Link태그에 prefetch기능 내장 되어있음
  //prefetch기능은 이동할 route경로에 파일을 미리 로드해주는 기능
  //태그 인라인에 prefetch ={false}로 기능을 끌 수 있음
  //usePathname 은 현재 경로 확인
  //useSearchParams 로 쿼리스트링 확인
  return (
    <div className="list-bg">
      {result?.map((post: IPost) => (
        <div className="list-item">
          <Link href={`/detail/${post._id}`} key={post._id.toString()}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            {/* <DetailLink /> */}
          </Link>
          <Link href={"/edit/" + post._id}>수정</Link>
        </div>
      ))}
    </div>
  );
}
