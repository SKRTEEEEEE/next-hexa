import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card } from "@/components/ui/card";
import style from "./style.module.css"
import Link from "next/link";

// async function getDocs(slug: string) {
    
//   const doc = about.find((doc) => 
//     doc.slug === `about/${slug}`
// );
//   return doc;
// }

const GITHUB_RAW_TECHS_URL =
  "https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/refs/heads/main/about/techs.md";
const GITHUB_RAW_TECHS_BASE = 
  "https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/refs/heads/main/about/"


async function fetchMarkdownFile(filename?: string): Promise<string | null> {
  try {
    let response: Response|{ok:false} = {ok:false}
    if(!filename){
    response = await fetch(`${GITHUB_RAW_TECHS_URL}`);
  }
    if(filename === "techs" || filename === "degrees"){
    response = await fetch(`${GITHUB_RAW_TECHS_BASE}${filename}.md`);
  }
    if (!response.ok) {
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error("Error fetching the Markdown file:", error);
    return null;
  }
}

// async function parseMarkdownToHtml(markdown: string): Promise<string> {
//   const processedContent = await remark().use(html).process(markdown);
//   return processedContent.toString();
// }

const components = {
    blockquote: (props: any) => (
      <Card
        {...props}
        className="relative my-2 shadow-sm shadow-secondary-foreground hover:shadow-md hover:shadow-secondary border-l-4 border-border/5 bg-muted/15 hover:bg-secondary/5 px-4 py-3"
      />
    ),
    p: (props: any) => (
      <p className={style.img} {...props}>
      </p>
    ),
    h4: (props:any)=> <h4 className="mt-1" {...props}></h4>,
    hr: (props:any)=><hr className="mt-2 " {...props}/>,
    a: (props:any)=><Link target="_blank" href={props.href}{...props}></Link>
    
  };

  export default async function DocPage(
    {
    params,
  }: {
    params: Promise<{ slug: string }>
  }
) {
    const slug = (await params).slug
    const doc = await fetchMarkdownFile(slug)
    // const doc = await fetchMarkdownFile()
  
    if (!doc) notFound();
  
    return (
      <main className="container mt-24 pb-36 mx-auto max-w-5xl py-3">
        <article className="rounded-lg border bg-card p-6 shadow-sm">
          <MDXRemote source={doc} components={components}/>
        </article>
      </main>
    );
  }