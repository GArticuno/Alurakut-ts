/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import NextLink from 'next/link';

import { useUser } from '../context/UserContext';

const BASE_URL = 'http://alurakut.vercel.app/';
const v = '1';

type LinkProps = {
  children: ReactNode,
  href: string,
  props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

type AluraMenuProps = {
  githubUser: string
}

function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  )
}

// ================================================================================================================
// Menu
// ================================================================================================================

AlurakutMenu.Wrapper = styled.header<{isMenuOpen: boolean}>`
  width: 100%;
  background-color: #fb2943;
  position: sticky; 
  top:0; 
  width:100%;
  z-index: 2;
  
  .alurakutMenuProfileSidebar {
    background: white;
    position: fixed;
    z-index: 100;
    padding: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    top: 48px;
    transition: .3s;
    pointer-events: ${({ isMenuOpen }) => isMenuOpen ? 'all' : 'none'};
    opacity: ${({ isMenuOpen }) => isMenuOpen ? '1' : '0'};
    transform: ${({ isMenuOpen }) => isMenuOpen ? 'translateY(0)' : 'translateY(calc(-100% - 48px))'};
    
    @media(min-width: 860px) {
      display: none;
    }
    > div {
      max-width: 400px;
      margin: auto;
    }
    a {
      font-size: 18px;
    }
    .boxLink {
      font-size: 18px;
      color: #a00808;
      -webkit-text-decoration: none;
      text-decoration: none;
      font-weight: 800;
    }

    hr {
      margin-top: 12px;
      margin-bottom: 8px;
      border-color: transparent;
      border-bottom-color: #ECF2FA;
    }
  }

  .container {
    background-color: #fb2943;
    padding: 7px 16px;
    max-width: 1110px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 101;
    @media(min-width: 860px) {
      justify-content: flex-start;
    }

    button {
      border: 0;
      background: transparent;
      align-self: center;
      display: inline-block;
      @media(min-width: 860px) {
        display: none;
      }
    }

    nav {
      display: none;
      @media(min-width: 860px) {
        display: flex;
      }
      a {
        font-size: 12px;
        color: white;
        padding: 10px 16px;
        position: relative;
        margin-left: 16px;
        text-decoration: none;
        &:after {
          content: " ";
          background-color: #a00808;
          display: block;
          position: absolute;
          width: 1px;
          height: 12px;
          margin: auto;
          left: 0;
          top: 0;
          bottom: 0;
        }
      }
    }
    input {
      color: #ffffff;
      background: #a00808;
      padding: 10px 42px;
      border: 0;
      background-image: url(${`${BASE_URL}/icons/search.svg`});
      background-position: 15px center;
      background-repeat: no-repeat;
      border-radius: 1000px;
      font-size: 12px;
      ::placeholder {
        color: #ffffff;
        opacity: 1;
      }
    } 
  }
`;

AlurakutMenu.Logo = styled.img`
  background-color: #ffffff;
  padding: 9px 14px;
  border-radius: 1000px;
  height: 34px;
`;

export function AlurakutMenu() {
  const [isMenuOpen, setMenuState] = React.useState(false);
  const { user, signOut } = useUser();
  return (
    <AlurakutMenu.Wrapper isMenuOpen={isMenuOpen}>
      <div className="container">
        <AlurakutMenu.Logo src={`${BASE_URL}/logo.svg`} />

        <nav style={{ flex: 1 }}>
          {[{ name: 'Inicio', slug: '/'}, {name: 'Amigos', slug: '/amigos'}, {name: 'Comunidades', slug: '/comunidades'}].map((menuItem) => (
            <Link key={`key__${menuItem.name.toLocaleLowerCase()}`} href={`${menuItem.slug.toLocaleLowerCase()}`}>
              {menuItem.name}
            </Link>
          ))}
        </nav>

        <nav>
          <div>
            <input placeholder="Pesquisar no Orkut" />
          </div>
          <a onClick={signOut}>
            Sair
          </a>
        </nav>

        <button onClick={() => setMenuState(!isMenuOpen)}>
          {isMenuOpen && <img src={`${BASE_URL}/icons/menu-open.svg?v=${v}`} alt='Menu open'/>}
          {!isMenuOpen && <img src={`${BASE_URL}/icons/menu-closed.svg?v=${v}`} alt='Menu close'/>}
        </button>
      </div>
      <AlurakutMenuProfileSidebar githubUser={user} />
    </AlurakutMenu.Wrapper>
  )
}

function AlurakutMenuProfileSidebar({ githubUser }: AluraMenuProps) {
  return (
    <div className="alurakutMenuProfileSidebar">
      <div>
        <img 
          src={`https://github.com/${githubUser}.png`} 
          style={{ borderRadius: '8px' }} 
          alt={`avatar`}
        />
        <hr />
        <p>
          <a className="boxLink" href={`/user/${githubUser}`}>
            @{githubUser}
          </a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault />
      </div>
    </div>
  )
}

// ================================================================================================================
// AlurakutProfileSidebarMenuDefault
// ================================================================================================================

AlurakutProfileSidebarMenuDefault.Wrapper = styled.div`
  a {
    font-size: 12px;
    color: #a00808;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px; 
    }
  }
`;

export function AlurakutProfileSidebarMenuDefault() {
  const { signOut } = useUser();
  return (
    <AlurakutProfileSidebarMenuDefault.Wrapper>
      <nav>
        <a href="https://github.com/GArticuno" target='_blank' rel="noreferrer">
          <img src={`${BASE_URL}/icons/user.svg`} alt='User'/>
            Perfil
          </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/book.svg`} alt='Book'/>
            Recados
          </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/camera.svg`} alt='Camera'/>
            Fotos
          </a>
        <a href="/">
          <img src={`${BASE_URL}/icons/sun.svg`} alt='Sun'/>
            Depoimentos
          </a>
      </nav>
      <hr />
      <nav>
        <a href="https://github.com/trending" target='_blank' rel="noreferrer">
          <img src={`${BASE_URL}/icons/plus.svg`} alt='Plus'/>
            GitHub Trends
          </a>
        <a href="/logout" onClick={signOut}>
          <img src={`${BASE_URL}//icons/logout.svg`} alt='Logout'/>
            Sair
          </a>
      </nav>
    </AlurakutProfileSidebarMenuDefault.Wrapper>
  )
}

// ================================================================================================================
// OrkutNostalgicIconSet
// ================================================================================================================

OrkutNostalgicIconSet.List = styled.ul`
  margin-top: 32px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    font-size: 12px;
    color: #5A5A5A;
    display: grid;
    grid-template-areas:
      "title title"
      "number number"; 
    
    &:not(:last-child) {
      margin-right: 5px;
    }
    .OrkutNostalgicIconSet__title {
      display: block;
      font-style: italic; 
    }
    .OrkutNostalgicIconSet__number {
      min-width: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .OrkutNostalgicIconSet__iconSample {
        margin-right: 7px;
      }
    }
  }
`;

export function OrkutNostalgicIconSet() {
  return (
    <OrkutNostalgicIconSet.List>
      {[
        { name: 'Recados', slug: 'recados', icon: 'book', total: 15 },
        { name: 'Fotos', slug: 'fotos', icon: 'camera', total: 20 },
        { name: 'Videos', slug: 'videos', icon: 'video-camera', total: 5 },
        { name: 'Fãs', slug: 'fas', icon: 'star', total: 138 },
        { name: 'Mensagens', slug: 'mensagens', icon: 'email', total: 354 },
      ].map(({ name, slug, icon, total }) => (
        <li key={`orkut__icon_set__${slug}`}>
          <span style={{ gridArea: 'title' }} className="OrkutNostalgicIconSet__title">
            {name}
          </span>
          <span className="OrkutNostalgicIconSet__number" style={{ gridArea: 'number' }}>
            <img 
              key={`orkut__icon_set__${slug}_img`} 
              className="OrkutNostalgicIconSet__iconSample" 
              src={`https://alurakut.vercel.app/icons/${icon}.svg`}
              alt='Orkut icon'
            />
            {total}
          </span>
        </li>
      ))}
      {[
        { name: 'Confiável', slug: 'confiavel', icon: 'smile', total: 3 },
        { name: 'Legal', slug: 'legal', icon: 'cool', total: 2 },
        { name: 'Sexy', slug: 'sexy', icon: 'heart', total: 2 },
      ].map(({ name, slug, icon, total }) => {
        return (
          <li key={`orkut__icon_set__${slug}`}>
            <span className="OrkutNostalgicIconSet__title">
              {name}
            </span>
            <span className="OrkutNostalgicIconSet__iconComplex OrkutNostalgicIconSet__number" style={{ gridArea: 'number' }}>
              {[0, 1, 2].map((_, index) => {
                const isHeartActive = index <= (total - 1);
                return (
                  <img 
                    key={`orkut__icon_set__${slug}_img_${index}`} 
                    src={`https://alurakut.vercel.app/icons/${icon}.svg`} 
                    style={{ marginRight: '2px', opacity: isHeartActive ? 1 : '0.5' }} 
                    alt='Orkut icon'
                  />)
              })}
            </span>
          </li>
        );
      })}
    </OrkutNostalgicIconSet.List>
  )
}

// ================================================================================================================
// Login Page
// ================================================================================================================

const AlurakutLoginScreen = css`

  .loginScreen {
    padding: 16px;
    max-width: 1110px;
    display: grid;
    --gap: 12px;
    --gutter: 16px;
    grid-gap: var(--gap);
    grid-template-areas: 
      "logoArea"
      "formArea"
      "footerArea";
    
    @media(min-width: 860px) {
      grid-template-columns: 2fr 1fr;
      grid-template-areas: 
              "logoArea formArea"
              "logoArea formArea"
              "footerArea footerArea";
    }

    .logoArea {
      grid-area: logoArea;
      background-color: var(--backgroundTertiary);
      border-radius: var(--commonRadius);
      padding: var(--gutter);
      text-align: center;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      min-height: 263px;

      @media(min-width: 860px) {
        min-height: 368px;
      }

      p {
        font-size: 12px;
        line-height: 1.2;
        &:not(:last-child) {
          margin-bottom: 12px;
        }

        strong {
          color: var(--colorQuarternary);
        }
      }

      img {
        &#alurakutLogo {
          max-height: 2.8rem;
          margin-bottom: 36px;
        }

        &#artBacground {
          position: absolute;
          z-index: 0;
          height: 21rem;
          left: 30px;
          opacity: .3;

          @media(max-width: 860px){
            height: 15rem;
          }
        }

      }
    }

    .formArea {
      grid-area: formArea;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--gutter);
        padding-left: 3.125rem;
        padding-right: 3.125rem;
        background-color: var(--backgroundSecondary);
        border-radius: var(--commonRadius);
        flex: 1;

        &:not(:last-child) {
          margin-bottom: var(--gap);
        }

        &:first-child {
          min-height: 224px;
          @media(min-width: 860px) {
            min-height: 282px;
          }
        }

        p {
          font-size: 14px;
        }

        a {
          text-decoration: none;
          color: var(--colorPrimary);
          cursor: pointer;
        }

        img {
          @media(max-width: 860px){
            height: 15rem;
          }
        }

        button {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: .5rem;
          border: 0;
          padding: 6px 12px;
          border-radius: var(--commonRadius);
          background-color: var(--colorSecondary);
          color: var(--textSecondaryColor);
        }
      }
    }

    .footerArea {
      grid-area: footerArea;
      background-color: var(--backgroundQuarternary);
      border-radius: var(--commonRadius);
      padding: 8px;

      p {
        font-size: 12px;
        text-align: center;

        a {
          text-decoration: none;
          color: var(--colorPrimary);
        }
      }
    }
  }
`;

// ================================================================================================================
// Reset Styles
// ================================================================================================================

export const AlurakutStyles = css`
  *::-webkit-scrollbar {
    width: 8px;
  }
  *::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  *::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  a,
  button {
    cursor: pointer;
    transition: .3s;
    outline: 0;
    &:hover,
    &:focus {
      opacity: .8;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }
  }
  input {
    transition: .3s;
    outline: 0;
    &:disabled {
      cursor: not-allowed;
      opacity: .5;
    }
    &:hover,
    &:focus {
      box-shadow: 0px 0px 5px #33333357;
    }
  }

  ${AlurakutLoginScreen}
`;