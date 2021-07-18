import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Box from '../Box';
import { ProfileCommunitiesBox, ProfileFollowBox } from '../ProfileRelations';
import { ProfileRepositoryBox } from '../ProfileRepositoryBox';
import { ProfileSidebar } from '../ProfileSidebar';
import { WhatYouGonnaDo } from '../WhatYouGonnaDo';

import { useUser } from '../../context/UserContext';

import { OrkutNostalgicIconSet } from '../../lib/AlurakutCommons';

import { api } from '../../services/api';

import { User } from '../../types';

const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;

  .profileArea {
    display: none;

    @media(min-width: 860px) {
      display: block;
    }
  }

  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 
      "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;

export function Main(){
  const { user } = useUser();
  
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    
    api.get(`${user}/followers`).then(res => 
      setFollowers(res.data)
    ).catch(
      err => console.log(err)
    )
    
    api.get(`${user}/following`).then(res => 
      setFollowing(res.data)
    ).catch(
      err => console.log(err)
    )

  }, [user])

  return(
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
        <WhatYouGonnaDo/>
        <ProfileRepositoryBox/>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileFollowBox title="Seguindo" followData={following} />
        <ProfileCommunitiesBox/>
        <ProfileFollowBox title="Seguidores" followData={followers} />
      </div>
    </MainGrid>
  )
}