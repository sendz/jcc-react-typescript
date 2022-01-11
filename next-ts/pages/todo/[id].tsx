import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next"

const ToDoDetail = ({ data }: any) => {
    return (
        <>
        To Do Detail
        <div>
            <ul>
                <li>ID: {data.id}</li>
                <li>Title: {data.title}</li>
                <li>Done? {data.isDone.toString()}</li>
            </ul>
        </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const response = await fetch("http://localhost:1234/todo")
    const { data } = await response.json();

    if (!data) {
        return {
          notFound: true,
        }
    }

    const paths =  data.map((item: any) => ({
        params: {id: item.id}
    }))

    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: any) => {
    const response = await fetch("http://localhost:1234/todo/" + params.id)
    
    const { data } = await response.json();

    return {
        props: {
            data
        }
    }
}

export default ToDoDetail