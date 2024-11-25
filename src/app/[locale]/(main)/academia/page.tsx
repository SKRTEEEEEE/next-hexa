import { ejercicios } from "#site/content";
import { EjercicioItem } from "@/components/academia/ejercicio-item";
import { SubscriptionPlansDialog } from "@/components/oth/plains-dialog/subscription-plans-dialog";
import { buttonVariants } from "@/components/ui/button";
import { routesConfig } from "@/config/routes";
import { getCookiesUC } from "@/core/application/usecases/services/auth";
import { userInCookiesUC } from "@/core/interface-adapters/controllers/user";
import { Link } from "@/i18n/routing";
import { cn, sortPosts } from "@/lib/utils";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: routesConfig.academia.title,
  description: routesConfig.academia.description
}
export default async function AprenderPage() {
  const latestPosts = sortPosts(ejercicios).slice(0,5)
  const user = await userInCookiesUC()
  const session = await getCookiesUC()
  console.log("session in academia page: ", {session})

  return (
    <>
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
      <div className="container flex flex-col gap-4 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
          Aprendiendo <span className="text-accent">rápido</span> 🏃‍♂️‍➡️🧠
        </h1>
        <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
          Aprende con ejercicios prácticos. Descubre nuestros ejercicios gratuitos o obtén acceso a todos por solo 3€/mes.
        </p>
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
          <Link href="/academia/ejercicios" className={cn(buttonVariants({size:"lg"}), "w-full sm:w-fit")}>Ver ejercicios</Link>
          {/* <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className={cn(buttonVariants({variant: "outline", size: "lg"}), "w-full sm:w-fit")}>GitHub</Link> */}
          
          <SubscriptionPlansDialog buttonTitle="Tarifas" user={user}/>
        </div>
      </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-secondary text-center">
          Últimos ejercicios
        </h3>
        <ul className="flex flex-col">
          {latestPosts.map(post=><li key={post.slug} className="first:border-t first:border-border">
            <EjercicioItem slug={post.slug} title={post.title} description={post.description} date={post.date} tags={post.tags}/>
          </li>)}
        </ul>
      </section>
      </>
  );
}
