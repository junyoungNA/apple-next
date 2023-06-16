import { connectDB } from "../util/database";
import { ObjectId } from "mongodb";

type Params = {
  id: string;
};

export interface IResult {
  _id: ObjectId;
  title: string;
  content: string;
}

type FindOne = (params: Params) => Promise<IResult | null>;

export const findOne: FindOne = async params => {
  const db = (await connectDB).db("forum");
  const result: IResult | null = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });
  console.log(result);
  return result;
};
