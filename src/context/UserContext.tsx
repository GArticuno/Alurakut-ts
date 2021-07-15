import React, {
  createContext, 
  ReactNode, 
  useEffect, 
  useState, 
  useContext
} from 'react';
import { api } from '../services/api';

import { Community, User } from '../types';

type Props= {
  children: ReactNode
}

type UserProps = {
  user: string;
  profile: User | null;
  followers: User[];
  following: User[];
  communities: Community[];

  setUser: React.Dispatch<React.SetStateAction<string>>;
  setCommunities: React.Dispatch<React.SetStateAction<Community[]>>;
}

const UserContext = createContext({} as UserProps);

export function UserContextProvider({children}: Props){
  const [user, setUser] = useState('Garticuno');
  const [profile, setProfile] = useState<User|null>(null);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [communities, setCommunities] = useState<Community[]>([{
    id: '12802378123789378912789789123896123', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);


  useEffect(() => {
    api.get(`${user}`).then(res => 
      setProfile(res.data)
    ).catch(err =>
      console.log(err)
    )
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
    <UserContext.Provider value={{
      user,
      profile,
      followers,
      following,
      communities,

      setUser,
      setCommunities
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(){
  const value = useContext(UserContext);

  return value;
}