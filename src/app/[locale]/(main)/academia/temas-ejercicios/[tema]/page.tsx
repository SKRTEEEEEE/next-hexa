import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import {ejercicios} from "#site/content"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/academia/tag";
import {slug} from "github-slugger"
import { Metadata } from "next";
import { EjercicioItem } from "@/components/academia/ejercicio-item";

interface TagPageProps {
    params: {
        tema: string
    }
}

export async function generateMetadata({params}: TagPageProps): Promise<Metadata>{
    const {tema}= params;
    return {
        title: tema,
        description: `Ejercicios con de ${tema}`
    }
}

export const generateStaticParams = () =>{
    const tags = getAllTags(ejercicios);
    const paths = Object.keys(tags).map(tag=> ({tag:slug(tag)}))
    return paths
}

export default function TemaPage({params}: TagPageProps){
    const {tema} = params;
    const title = tema.split("-").join(" ")

    const displayPosts = getPostsByTagSlug(ejercicios, tema)
    const tags = getAllTags(ejercicios)
    const sortedTags = sortTagsByCount(tags
    )

    return (
        <div className="container max-w-4xl py-6 lg:py-10">
    <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-4">
        <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
               {title}
            </h1>
            <p className="text-xl text-muted-foreground">
                Ejercicios para potenciar tu experiencia dev.
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
        <p>No hay ejercicios de este tema actualmente</p>
    )
    }
    
    <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
        <CardHeader>
            <CardTitle>Temas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map(t=><Tag tag={t} key={t} count={tags[t]} current={slug(t)===tema}/>)}
        </CardContent>
    </Card>
    </div>
    </div> 
    </div>
    )


}