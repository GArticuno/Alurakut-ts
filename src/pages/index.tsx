/* eslint-disable @next/next/no-img-element */
import React, { FormEvent } from 'react';
import Head from 'next/head';

import MainGrid from '../components/MainGrid';
import Box from '../components/Box';
import ProfileRelationsBoxWrapper from '../components/ProfileRelations';

import { Community } from '../types';

import { useUser } from '../context/UserContext';

import { 
  AlurakutMenu, 
  AlurakutProfileSidebarMenuDefault, 
  OrkutNostalgicIconSet 
} from '../lib/AlurakutCommons';

function ProfileSidebar() {
  const { profile } = useUser();

  return (
    <Box as="aside">
      <img src={profile?.avatar_url} alt='Avatar' style={{borderRadius: '8px'}}/>
      <hr />
      <p>
        <a className="boxLink" href={profile?.html_url} target='_blank' rel="noreferrer">
          @{profile?.login}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox({title}: { title: string }) {
  const { following } = useUser();
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({following.length})
      </h2>
      <ul>
        {following.slice(0,6).map((follow) => {
          return (
            <li key={follow.id}>
              <a href={follow.html_url} target='_blank' rel="noreferrer">
                <img src={follow.avatar_url} alt={follow.login} />
                <span>{follow.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const {
    user,
    followers, 
    communities,
    
    setCommunities 
  } = useUser();
  
  function handleCriaComunidade(event: FormEvent){
    event.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#communityForm');

    if(form !== null){
      const dataForm =  new FormData(form);
      console.log('Campo: ', dataForm.get('title'));
      console.log('Campo: ', dataForm.get('image'));

      const community: Community = {
        id: new Date().toISOString(),
        title: dataForm.get('title')?.toString() ?? '',
        image: dataForm.get('image')?.toString() ?? '',
      }
      const comunidadesAtualizadas: Community[] = [...communities, community];
      setCommunities(comunidadesAtualizadas)
    }else {
      return;
    }
  }


  return (
    <>
      <Head>
        <title>Alurakut</title>
      </Head>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={ event => handleCriaComunidade(event) } id='communityForm'>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguindo" />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`}>
                      <img src={community.image} alt='Comunnity Image' />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Seguidores ({followers.length})
            </h2>

            <ul>
              {followers.slice(0,6).map((follower) => {
                return (
                  <li key={follower.id}>
                    <a href={follower.url} target='_blank' rel="noreferrer">
                      <img src={follower.avatar_url} alt={follower.login}/>
                      <span>{follower.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}