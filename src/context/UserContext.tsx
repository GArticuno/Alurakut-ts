/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, ReactNode, useEffect, useState, useContext } from 'react';
import { apiGraph } from '../services/api';
import { firebase, auth } from '../services/firebase';
import { useRouter } from 'next/router';
import { Cookies } from "react-cookie-consent";

type Props= {
  children: ReactNode;
  githubUser: string;
  Cookies: boolean;
}

type Community = {
  id: string,
  title: string,
  imageUrl: string,
  creatorSlug: string
}

type UserProps = {
  user: string;
  communities: Community[];

  changeUser: (user: string) => void;
  changeCommunities: (communities: Community[]) => void;
  signInWithGitHub: () => void;
  signOut: () => void;
}

const query = {
  query: `{
    allCommunities {
      id
      title
      imageUrl
      creatorSlug
    }
  }`
}
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer 1d6d54e6c6d135e7395ab950607bba`,
  }
}
const UserContext = createContext({} as UserProps);

export function UserContextProvider({children, ...rest}: Props){
  const [user, setUser] = useState(rest.githubUser ?? '');
  const [communities, setCommunities] = useState<Community[]>([]);

  const router = useRouter();
  
  function changeUser(user: string){
    setUser(user)
  }

  function changeCommunities(communities: Community[]){
    setCommunities(communities)
  }

  async function signInWithGitHub(){
    console.log('até aqui')
    const provider = new firebase.auth.GithubAuthProvider();

    const result = await auth.signInWithPopup(provider)
    const githubUser = result.additionalUserInfo?.username

    setUser(githubUser ?? '')
    Cookies.set('user', githubUser)
    router.push('/')
  }

  async function signOut(){
    firebase.auth().signOut().then(function() {
      Cookies.remove('user')
      router.push('/login')
    }, function(error) {
      console.log(error)
    });
  }
  useEffect(()=>{
    apiGraph.post('https://graphql.datocms.com/', query, headers)
    .then( async (res) => {
      const allCommunities = await res.data.data.allCommunities
      setCommunities(allCommunities)
    })
    .catch((error) => {
      console.log(error);
    });
  },[])

  useEffect(()=>{
    if(rest.Cookies){
      Cookies.set('user', user)
    }
  }, [user])
  
  return(
    <UserContext.Provider value={{
      user,
      communities,

      changeUser,
      changeCommunities,
      signInWithGitHub,
      signOut
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(){
  const value = useContext(UserContext);

  return value;
}