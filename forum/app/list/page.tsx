import { connectDB } from "../util/database";

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
          <div className="list-item"  key={post._id.toString()}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
      )}
    </div>
    )
    
}