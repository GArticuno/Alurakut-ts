/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

import { useUser } from '../context/UserContext';
import Head from 'next/head';


export default function LoginScreen() {
  const { user, signInWithGitHub } = useUser();
  
  return (
    <>
    <Head>
      <title>Alurakut | Login</title>
    </Head>
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="/images/ilustra-Alura.svg" id='artBacground' alt="ilustra Alura" />
          <img src="https://alurakut.vercel.app/logo.svg" id='alurakutLogo' alt='Alura logo'/>
          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea"> 
          <div className="box">
            <img src="/images/github-octocat.svg" alt="Octocat" />
            <button onClick={signInWithGitHub}>
              <AiFillGithub size={30}/>
              Login com github
            </button>
          </div>
          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="https://github.com/" target='_blank' rel="noreferrer" >
                <strong>
                  Cadastre-se no github e acesse!
                </strong>                  
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <Link href="/">Sobre o Orkut.br</Link> - <Link href="/">Centro de segurança</Link> - <Link href="/">Privacidade</Link> - <Link href="/">Termos</Link> - <Link href="/">Contato</Link>
          </p>
        </footer>
      </div>
    </main>
    </>
  )
} 