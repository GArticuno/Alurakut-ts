/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import Box from '../Box';

import { useUser } from '../../context/UserContext';

import { api } from '../../services/api';

import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

import { User } from '../../types';
import styled from 'styled-components';

export function ProfileSidebar() {
  const { user } = useUser();
  const [profile, setProfile] = useState<User|null>(null);

  useEffect(() => {
    api.get(`${user}`).then(res => 
      setProfile(res.data)
    ).catch(err =>
      console.log(err)
    )
  }, [user])

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