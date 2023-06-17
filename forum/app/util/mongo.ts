import { connectDB } from "../util/database";
import { ObjectId } from "mongodb";

type Params = {
  id: string;
  userId?: string;
};

interface IResult {
  _id: ObjectId;
}

export interface IFindPost extends IResult {
  title: string;
  content: string;
}

export interface IFindUser extends IResult {
  userId: string;
  password: string;
}

type FindOne = (params: Params) => Promise<IFindPost | IFindUser | null>;

export type findOneReslt = IFindPost | IFindUser | null;

export const findOne: FindOne = async params => {
  console.log("유저아이디", params.userId);
  const db = (await connectDB)?.db("forum");
  const result: any = await db;
  // ?.collection("post")
  // .findOne({ _id: new ObjectId(params.id) });
  return result;
};

export const findPostList = async () => {
  const db = (await connectDB)?.db("forum");
  return await db?.collection("post").find().toArray();
};
