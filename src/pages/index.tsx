/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Main } from '../components/Main';

import { useUser } from '../context/UserContext';

import { AlurakutMenu } from '../lib/AlurakutCommons';

const Redirect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rem;
  color: #ffffff;
  font-size: 1.7rem;
`;

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  function ForcePush(){
    return(
      <Redirect >
        redirecionando...
      </Redirect>
    )
  }

  useEffect(() => {
    if(user === ''){
      router.push('/login')
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Alurakut | Home</title>
      </Head>
      
      {user === '' ? (<ForcePush/>):(
        <>
          <AlurakutMenu/>
          <Main/>
        </>
      )}
    </>
  )
}