import { IPost, findPostList } from "../util/mongo";
import ListItem from "./ListItem";

export default async function List() {
  const result: IPost[] = await findPostList();
  //Link태그에 prefetch기능 내장 되어있음
  //prefetch기능은 이동할 route경로에 파일을 미리 로드해주는 기능
  //태그 인라인에 prefetch ={false}로 기능을 끌 수 있음
  //usePathname 은 현재 경로 확인
  //useSearchParams 로 쿼리스트링 확인
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
