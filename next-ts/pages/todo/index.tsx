import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Link from "next/link";

const ToDo = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log("DATA", data)
    return (
        <>
        <div>To Do</div>
        <div>
            {
                data.map((item: any) => (
                    <Link href={`/todo/${item.id}`} key={item.id}>
                        {item.title}
                    </Link>
                ))
            }
        </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch("http://localhost:1234/todo")
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