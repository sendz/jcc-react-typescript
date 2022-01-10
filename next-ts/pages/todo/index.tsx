import { GetStaticProps, InferGetStaticPropsType } from "next";

const ToDo = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log("DATA", data)
    return (
        <>
        <div>To Do</div>
        <div>
            {
                data.map((item: any) => (
                    <div key={item.id}>
                        {item.title}
                    </div>
                ))
            }
        </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const response = await fetch("http://localhost:1234/todo")
    console.log("response", response)
    const { data } = await response.json();

    if (!data) {
        return {
          notFound: true,
        }
    }

    return {
        props: {
            data: data 
        }
    }
}

export default ToDo