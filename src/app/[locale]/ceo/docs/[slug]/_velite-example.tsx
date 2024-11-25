//@ts-nocheck

import { about } from "#site/content";
import { notFound } from "next/navigation";


async function getDocs(slug: string) {
    
  const doc = about.find((doc) => 
    doc.slug === `about/${slug}`
);
  return doc;
}




export default async function DocPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    // console.log("slug in ceo/docs/[slug] page: ",slug)
    const doc = await getDocs(slug)
    // console.log("doc in ceo/docs/[slug] page: ", doc)

  if (!doc) notFound();

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <div dangerouslySetInnerHTML={{ __html: doc.body }} />
    </article>
  );
}
