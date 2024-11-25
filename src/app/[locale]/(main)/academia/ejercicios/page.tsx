import {ejercicios} from "#site/content"
import { EjercicioItem } from "@/components/academia/ejercicio-item";
import { QueryPagination } from "@/components/oth/query-pagination";
import { Tag } from "@/components/academia/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

const POSTS_PAGE = 5;

interface BlogPageProps {
    searchParams: {
        page?: string;
    }
}

export const metadata: Metadata = {
    title: "Skrt Blog",
    description: "This is a example blog by Skrt"
}

export default async function BlogPage({searchParams}: BlogPageProps){
    const currentPage = Number(searchParams?.page) || 1
    const sortedPosts = sortPosts(ejercicios.filter(post=>post.published))
    const totalPages = Math.ceil(sortedPosts.length/POSTS_PAGE)
    // console.log("ejercicios: ", ejercicios)
    const displayPosts = sortedPosts.slice(
        POSTS_PAGE * (currentPage - 1),
        POSTS_PAGE * currentPage
    );

    const tags = getAllTags(ejercicios);
    const sortedTags = sortTagsByCount(tags)


    return <div className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-4">
            <div className="flex-1 space-y-4">
                <h1 className="inline-block font-black text-4xl lg:text-5xl">
                    Ejercicios
                </h1>
                <p className="text-xl text-muted-foreground">
                    Aprendiendo de forma dinámica 👾
                </p>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-3 mt-8">
            <div className="col-span-12 col-start-1 sm:col-span-8">
        <hr className="mt-8" />
        {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
                {displayPosts.map(post =>{
                    const {slug, date, title, description,tags} = post
                    return <li key={slug}>
                        <EjercicioItem slug={slug} date={date} title={title} description={description} tags={tags}/>
                    </li>
                })}
            </ul>
        ):(
            <p>No hay ejercicios, vuelve pronto!</p>
        )
        }
        <QueryPagination totalPages={totalPages} className="justify-end mt-4"/>
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
                <CardTitle>Temas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {sortedTags?.map(tag=><Tag tag={tag} key={tag} count={tags[tag]}/>)}
            </CardContent>
        </Card>
        </div>
        </div> 
}