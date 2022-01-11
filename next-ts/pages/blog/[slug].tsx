import {Blog} from "../../types/Blog.interface"
import { getAllPost, getPostBySlug } from "../../helpers/api"
import { markdownToHtml } from "../../helpers/markdownToHtml"

type IProps = {
    post: Blog
}

const BlogDetail = (props: IProps) => {
    const { post } = props
    return (
        <article>
        <h2>{post.title}</h2>
        <h3>Oleh {post.author}</h3>
        <article dangerouslySetInnerHTML={{ __html: post.content }}>
        </article>
        </article>
    )
}

type IParams = {
    params: {
        slug: string
    }
}

export const getStaticProps = async (params: IParams) => {
    const post = getPostBySlug(params.params.slug, [
        'title',
        'author',
        'content'
    ])

    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content
            }
        }
    }
}

export const getStaticPaths = async () => {
    const posts = getAllPost(['slug'])

    return {
        paths: posts.map(post => ({
            params: {
                slug: post.slug
            }
        })),
        fallback: false
    }
}
export default BlogDetail