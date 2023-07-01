"use client";

import { IComment } from "@/app/util/mongo";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

type Props = {
  _id: string;
};



const Comment: NextPage<Props> = ({ _id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isUpdate, setUpdate] = useState<IComment | false>(false);

  useEffect(() => {
    // 서버로 GET 요청 보내기
    fetch(`/api/comment?id=${_id}`)
      .then(res => res.json())
      .then(data => {
        // 받은 댓글 목록을 상태에 저장
        setComments(data);
      })
      .catch(error => {
        console.log("Failed to fetch comments:", error);
      });
  }, []);
  return (
    <>
      <input
        type="text"
        name="comment"
        onChange={e => setComment(e.target.value)}
        value={comment}
      />
      {isUpdate === false ?   <button
        onClick={() => {
          fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({id:_id, comment: comment }),
          })
            .then(res => res.json())
            .then(data => setComments(data));
        }}
      >
        확인
      </button> : 
      <>
        <button onClick={() => {
          if (!isUpdate) return;
          fetch("/api/comment", {
            method: "PUT",
            body: JSON.stringify({ ...isUpdate ,comment: comment }),
          })
            .then(res => res.json())
            .then(data => {setComments(data); setUpdate(false); setComment('');});
        }}> 확인</button>
        <button onClick={() => {setComment(''); setUpdate(false)}} > 취소</button>
      </>
    }
      <div>댓글 목록</div>
      {comments.length > 0
        ? comments.map((comment: any) => {
            return (
              <div key={comment._id}>
                <p> 작성자: {comment.email}</p>
                <p> 내용: {comment.comment}</p>
                <button onClick={() => {setComment(comment.comment); setUpdate(comment)}}>수정</button>
                {isUpdate === false && <button onClick={() => {
                  fetch(`/api/comment?id=${comment._id}`, {
                    method:'DELETE',
                  })
                }}>삭제</button>}
              </div>
            );
          })
        : "댓글없음"}
    </>
  );
};

export default Comment;
