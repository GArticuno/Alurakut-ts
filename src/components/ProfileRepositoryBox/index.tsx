/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


import Box from '../Box';

import { useUser } from '../../context/UserContext';

import { api } from '../../services/api';

type Repository = {
  id: number,
  name: string,
  description: string,
  html_url: string,
  homepage: string,
}

const RepositoryBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
  align-items: center;  
  gap: 2rem;

  margin: 1rem .3rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;

  background: linear-gradient( #fafafa 0%,  #FF6287 100%);
  
  font-family: 'Poppins', sans-serif;

  h3 {
    color: #000000;
    margin: .5rem 0;
    font-weight: 400;
    font-size: 1.3rem;

  }
  
  p {
    color: #2f2f2f;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    a {
      color: #000000;
      font-size: 1rem;
      font-size: 1.25rem;

      &.noHomepage{
        cursor: default;
        color: #525252;
    }
    }
  }
`

export function ProfileRepositoryBox() {
  const { user } = useUser();
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    api.get(`${user}/repos`).then(res => 
      setRepos(res.data)
    ).catch(err =>
      console.log(err)
    )
  }, [user])

  return (
    <Box as="aside">
      <h2 className="subTitle">Repositories ({repos.length})</h2>
      {repos.slice(0,5).map(repo => {
        return(
          <RepositoryBox key={repo.id}>
            <img src={'/images/github-logo.svg'} alt='GithubLogo'/>
            <div>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <span>
                <a href={repo.html_url} target='_blank' rel="noreferrer">
                  Code
                </a>
                <a 
                  href={repo.homepage} 
                  className={repo.homepage === null ? 'noHomepage' : ''} 
                  target='_blank' 
                  rel="noreferrer"
                >
                  Site
                </a>
              </span>              
            </div>
          </RepositoryBox>
        )
      })}
    </Box>
  )
}