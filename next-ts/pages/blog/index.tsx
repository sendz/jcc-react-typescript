import Link from "next/link"
import { getAllPost } from "../../helpers/api"
import { Blog } from "../../types/Blog.interface"

type IBlog = {
    allPosts: Blog[]
}

const Blog = (props: IBlog) => {
    const { allPosts } = props
    return (
        <ul>
            {allPosts.map(post => (
                <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                        <a>{post.title} oleh {post.author}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export const getStaticProps = async () => {
    const allPosts = getAllPost([
        'title',
        'slug',
        'author'
    ])

    return {
        props: { allPosts }
    }
}

export default Blog