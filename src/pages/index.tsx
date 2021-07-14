/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';

import MainGrid from '../components/MainGrid';
import Box from '../components/Box';
import ProfileRelationsBoxWrapper from '../components/ProfileRelations';

import { 
  AlurakutMenu, 
  AlurakutProfileSidebarMenuDefault, 
  OrkutNostalgicIconSet 
} from '../lib/AlurakutCommons';


type Props = {
  githubUser: string;
}

type Community = {
  id: string,
  title: string,
  image: string
}

function ProfileSidebar(props : Props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt='Avatar' style={{borderRadius: '8px'}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const [user, setUser] = useState('omariosouto');
  const [comunidades, setComunidades] = useState<Community[]>([{
    id: '12802378123789378912789789123896123', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);


  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  function handleCriaComunidade(event: FormEvent){
    event.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#communityForm');

    if(form !== null){
      const dataForm =  new FormData(form);
      console.log('Campo: ', dataForm.get('title'));
      console.log('Campo: ', dataForm.get('image'));

      const comunidade: Community = {
        id: new Date().toISOString(),
        title: dataForm.get('title')?.toString() ?? '',
        image: dataForm.get('image')?.toString() ?? '',
      }
      const comunidadesAtualizadas: Community[] = [...comunidades, comunidade];
      setComunidades(comunidadesAtualizadas)
    }else {
      return;
    }
  }

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((community) => {
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
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`}>
                      <img src={`https://github.com/${person}.png`} alt={`${person} avatar`}/>
                      <span>{person}</span>
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