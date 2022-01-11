import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export const getPostSlugs = () => {
    return fs.readdirSync(postsDirectory)
}

export const getPostBySlug = (slug: string, fields: string[]) => {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContent = fs.readFileSync(fullPath, 'utf-8')
    const { content, data } = matter(fileContent)

    type Items = {
        [key: string]: string
    }

    const items: Items = {}

    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })

    return items
}

export const getAllPost = (fields: string[] = []) => {
    const slugs = getPostSlugs()
    const posts = slugs.map(slug => getPostBySlug(slug as any, fields) as any)
    return posts
}

