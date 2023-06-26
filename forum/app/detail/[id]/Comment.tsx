'use client'

import { NextPage } from "next";
import { useEffect, useState } from "react";

type Props  = {
  _id : string
}

const Comment: NextPage<Props> = ({_id} ) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 서버로 GET 요청 보내기
    fetch(`/api/comment?id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // 받은 댓글 목록을 상태에 저장
        setComments(data);
      })
      .catch((error) => {
        console.log("Failed to fetch comments:", error);
      });
  }, []);

    return (
        <>
          <input type="text" name="comment"  onChange={(e) => setComment(e.target.value)}/>
          <button onClick={() => {
            fetch('/api/comment', {method: 'POST', body : JSON.stringify({ id : _id, comment :comment})}) 
          }}>확인</button>
          <div>댓글 목록</div>
          {comments.length > 0 ? comments.map((comment: any) => {
            return(
              <div key={comment._id}>
                <p>{comment.email}</p>
                <p>{comment.comment}</p>
              </div>
            )
          }) : '댓글없음'}
        </>
    )
}


export default Comment;