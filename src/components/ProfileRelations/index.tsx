/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

import Box from '../Box';

import { useUser } from '../../context/UserContext';

import { User } from '../../types';

type RelationBoxProps = {
  title: string;
  followData: User[]
}

export const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }

  li {
    a {
      display: inline-block;
      height: 102px;
      overflow: hidden;
      border-radius: 8px;
      position: relative;
      
      img {
        object-fit: cover;
        background-position: center center;
        width: 100%;
        height: 100%;
        position: relative;
      }

      span {
        color: #FFFFFF;
        font-size: 10px;
        position: absolute;
        left: 0;
        bottom: 10px;
        z-index: 1;
        padding: 0 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-indeX: 0;
        background-image: linear-gradient(0deg,#00000073,transparent);
      }
    }
  }
`;

export function ProfileFollowBox({title, followData}: RelationBoxProps){

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({followData.length})
      </h2>
      <ul>
        {followData.slice(0,6).map((item) => {
          return (
            <li key={item.id}>
              <a href={item.html_url} target='_blank' rel="noreferrer">
                <img src={item.avatar_url} alt={item.login} title={item.login} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
};

export function ProfileCommunitiesBox(){
  const { communities } = useUser();

  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      Comunidades ({communities.length})
    </h2>
    <ul>
      {communities.map((community) => {
        return (
          <li key={community.id}>
            <a href={`/communities/${community.title}`}>
              <img src={community.imageUrl} alt='Comunnity Image' />
              <span>{community.title}</span>
            </a>
          </li>
        )
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}