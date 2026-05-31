import data from './json/design-tools.json'

export type Post = {
  id: number
  name: string
  url: string
  icon: string
  image?: string
  score: number
  percent: number
  tags: string[]
  description: string
}

export const posts: Post[] = data.map((post, index) => ({
  ...post,
  id: index + 1,
}))
