export type Author = {
    name: string
  }
  

export type Blog = {
    slug: string
    title: string
    date: string
    author: Author
    excerpt: string
    content: string
  }