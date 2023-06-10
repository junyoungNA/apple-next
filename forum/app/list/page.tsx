import Link from "next/link";
import { connectDB } from "../util/database";
import DetailLink from "./DetailLink";

export default async function List() {
  interface IPost {
    _id:object;
    title : string;
    content : string;
  }
  
  const db = (await connectDB).db('forum');
  const result = await db.collection('post').find().toArray();
  
    return (
      <div className="list-bg">
        {result?.map((post : IPost) => 
        // <Link href={`/detail/${post._id}`} key={post._id.toString()}>
          <div  className="list-item"  >
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <DetailLink/>
          </div>
        // </Link>
        
      )}
    </div>
    )
    
}