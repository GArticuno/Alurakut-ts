import React, { FormEvent, useState } from 'react'

import Box from '../Box';

import { useUser } from '../../context/UserContext';

import axios from 'axios';

export function WhatYouGonnaDo(){
  const { user, communities, changeCommunities } = useUser();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  function handleCriaComunidade(event: FormEvent){
    event.preventDefault();
    const form: HTMLFormElement | null = document.querySelector('#communityForm');

    if(form !== null){

      const community = {
        title: title,
        imageUrl: imageUrl,
        creatorSlug: user
      }

      axios.post('/api/communities',community,{
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        const data = response.data.community;
        console.log(data);
        const comunidadesAtualizadas = [...communities, data];
        changeCommunities(comunidadesAtualizadas)
      })

      setTitle('')
      setImageUrl('')
    }else {
      return;
    }
  }

  return(
    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <form onSubmit={ event => handleCriaComunidade(event) } id='communityForm'>
        <div>
          <input
            placeholder="Qual vai ser o nome da sua comunidade?"
            name="title"
            aria-label="Qual vai ser o nome da sua comunidade?"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            />
        </div>
        <div>
          <input
            placeholder="Coloque uma URL para usarmos de capa"
            name="image"
            aria-label="Coloque uma URL para usarmos de capa"
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
          />
        </div>

        <button disabled={title === '' || imageUrl === ''}>
          Criar comunidade
        </button>
      </form>
    </Box>
  )
}