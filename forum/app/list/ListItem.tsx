"use client";

import Link from "next/link";
import { IFindPost } from "../util/mongo";
import { NextPage } from "next";

interface ListItemProps {
  result: IFindPost[] | null;
}

const ListItem: NextPage<ListItemProps> = ({ result }) => {
  const deleteHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    try {
      event.preventDefault();
      await fetch(`/api/test?id=${postId}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(event => {
          event.currentTarget.parentElement.style.opacity = 0;
          setTimeout(() => {
            event.currentTarget.parentElement.style.display = "none";
          }, 1000);
        });
    } catch (error) {
      console.log("삭제 요청 중 오류가 발생했습니다.", error);
      // TODO: 오류 처리 로직 추가
    }
  };

  return (
    <>
      {result?.map(post => (
        <div className="list-item" key={String(post._id)}>
          <Link href={`/detail/${post._id}`}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            {/* <DetailLink /> */}
          </Link>
          <Link href={"/edit/" + post._id}>수정</Link>
          <button onClick={event => deleteHandler(event, String(post._id))}>
            삭제
          </button>
        </div>
      ))}
    </>
  );
};

export default ListItem;
