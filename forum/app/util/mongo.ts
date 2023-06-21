import { connectDB } from "../util/database";
import { ObjectId, WithId } from "mongodb";

type Params = {
  id: string;
  userId?: string;
};

interface IResult {
  _id: ObjectId;
}

export interface IPost extends IResult {
  title: string;
  content: string;
}
export interface IUser extends IResult {
  userId: string;
  password: string;
}

export type FindOne = (params: Params) => Promise<IPost | IUser | null>;

export type findOneReslt = WithId<IPost> | WithId<IUser> | null;

export const findOne: FindOne = async params => {
  const db = (await connectDB)?.db("forum");
  const result: findOneReslt = await db
    ?.collection(params.userId ? "user" : "post")
    .findOne<findOneReslt>(
      params.userId
        ? { userId: params.userId }
        : {
            _id: new ObjectId(params.id),
          }
    );
  return result;
};

export const findPostList = async (
): Promise<IPost[]> => {
  const db = (await connectDB)?.db("forum");
  const result = await db?.collection('post').find().toArray();
  return result as IPost[];
};

export const insertUser = async(user:IUser) => {
  const db = (await connectDB)?.db("forum");
  const result = await db?.collection('user').insertOne(user);
  return result;
} 

export const inserPost = async(post:IPost) => {
  const db = (await connectDB)?.db("forum");
  const result = await db?.collection('post').insertOne(post);
  return result;
} 

export const deletePost = async(postId:IResult) => {
  const db = (await connectDB)?.db("forum");
  const result = await db?.collection('post').deleteOne(postId);
  return result;
} 

export const editPost = async(postId:IResult, newPost: IPost) => {
  const db = (await connectDB)?.db("forum");
  const result = await db?.collection('post').updateOne(postId,{ $set:newPost});
  return result;
} 




export const findUserList = async (
  ): Promise<IUser[]> => {
    const db = (await connectDB)?.db("forum");
    const result = await db?.collection('user').find().toArray();
    return result as IUser[];
  };
  


