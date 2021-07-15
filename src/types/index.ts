import { AnchorHTMLAttributes, ReactNode } from "react"

export type User = {
  id: number,
  name: string,
  login: string,
  location: string,
  avatar_url: string,
  url: string,
  html_url: string,
  bio: string

}

export type Community = {
  id: string,
  title: string,
  image: string
}

export type LinkProps = {
  children: ReactNode,
  href: string,
  props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

export type AlurakutMenuProps = {
  githubUser: string
}