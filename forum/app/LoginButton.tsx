'use client';
import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react'
import { ISession } from './layout';



// interface LoginBtnProps {
//   session
// }


const LoginBtn:NextPage<{session : ISession | null} >= ({session})  => {
  return session?.user ? (
      <>
      <p className='user-name'>{session.user?.name}</p>
      <button onClick={()=>{ signOut() }}>로그아웃버튼</button> 
    </>
    ) : (
      <button onClick={()=>{ signIn() }}>로그인버튼</button>
    )
} 


export default LoginBtn;