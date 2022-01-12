import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"

const ToDoDetail = ({ data }: any) => {
    const [formData, setFormData] = useState<any>()
    const [isEdit, setIsEdit] = useState(false)

    const refetch = async (id: string) => {
        const response = await fetch("http://localhost:1234/todo/" + id)
        const { data } = await response.json();
        setFormData(data)
    }

    useEffect(() => {
        if (isEdit) {
            (async () => {
                await refetch(data.id)
            })()
        }
    }, [isEdit, data])

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
            <div>
                <button onClick={() => setIsEdit(true)}>Edit</button>
            </div>
            {isEdit && (
                <form>
                    <input value={formData?.title}/>
                </form>
            )}
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