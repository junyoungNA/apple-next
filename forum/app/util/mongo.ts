import { connectDB } from "../util/database";
import { ObjectId, WithId } from "mongodb";

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

export type FindOne = (params: Params) => Promise<IFindPost | IFindUser | null>;

export type findOneReslt = WithId<IFindPost> | WithId<IFindUser> | null;

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

export const findList = async (
  collection: string
): Promise<IFindPost[] | IFindUser[]> => {
  const db = (await connectDB)?.db("forum");
  const result = await db?.collection(collection).find().toArray();
  return result as IFindPost[] | IFindUser[];
};
