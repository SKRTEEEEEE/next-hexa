import Link from 'next/link';
import { getProjects, Project } from '@/lib/projects';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link as LinkLocale } from '@/i18n/routing';


type SearchParams = Promise<{
  page?: string
}>

export default async function ProjectsPage({ searchParams }: { searchParams: SearchParams }) {
  const projectsPerPage = 4;
  // const [currentPage, setCurrentPage] = useState(1);
  const sp = (await searchParams).page
  const t = await getTranslations()
  const mappedProjects = await getProjects()
  const currentPage = sp ? parseInt(sp) : 1;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = mappedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(mappedProjects.length / projectsPerPage);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-4 text-3xl xl:text-4xl font-bold mb-8">{t("ceo.proyectos.main.h1")}</h1>
      <ul className="w-11/12 xl:w-9/12 flex flex-col gap-4">
        {currentProjects.map((data: Project) => {
          console.log("data projects: ", data)
          return (
            <li className="flex justify-between" key={data.id}>
              <h2 className='text-md xl:text-2xl'>{data.title}</h2>
              <div className='flex'>
                {data?.urlDemo &&
                  <Link
                    className='mr-4 px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50
               hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80 sm:inline hidden'
                    href={data.urlDemo}
                    target='_blank'>
                    {t("ceo.proyectos.main.ul.buttons.url_demo.0")}
                    <span className="hidden xl:inline"> {t("ceo.proyectos.main.ul.buttons.url_demo.1")}
                    </span>🧑‍💻
                  </Link>
                }
                  {data?.urlGithub && 
                  <Link 
                    className='mr-4 px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-300/50 
                    hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80 sm:inline hidden' 
                    href={data.urlGithub} 
                    target='_blank'>
                    <span className="hidden xl:inline">{t("ceo.proyectos.main.ul.buttons.url_github.0")} </span>
                    {t("ceo.proyectos.main.ul.buttons.url_github.1")}📄
                  </Link>
                }

                <LinkLocale 
                  className='px-2 py-1 border-2 border-primary-ceo-200 rounded-md bg-secondary-ceo-400/30 
                  hover:bg-secondary-ceo-600 hover:border-primary-ceo-400/80' 
                  href={{ pathname: `/ceo/proyectos/[id]`, params: { id: data.id } }}>
                  {t("ceo.proyectos.main.ul.buttons.url_project.0")} 
                  <span className="hidden lg:inline mr-4"> {t("ceo.proyectos.main.ul.buttons.url_project.1")}</span>➡️
                </LinkLocale>
              </div>
            </li>
          )
        }

        )}
      </ul>
      <div className="mt-8 flex gap-4">

        <button
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-danger/10 text-primary-ceo-100/30 cursor-not-allowed' : 'border-secondary-ceo-200/80 hover:border-secondary-ceo-300 border-2 bg-primary-ceo-500/40 hover:bg-primary-ceo-800/80 text-primary-ceo-100'
            }`}
          disabled={currentPage === 1}
        >
          {
            currentPage !== 1 ?
              <LinkLocale
                className={currentPage === 1 ? "cursor-not-allowed" : ""}
                href={{ pathname: `/ceo/proyectos`, query: { page: (currentPage - 1) } }}>
                {t("common.previous")}</LinkLocale> : t("common.previous")}
        </button>

        <button
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-danger/10 text-primary-ceo-100/30 cursor-not-allowed' : 'border-secondary-ceo-200/80 hover:border-secondary-ceo-300 border-2 bg-primary-ceo-500/40 hover:bg-primary-ceo-800/80 text-primary-ceo-100'
            }`}
          disabled={currentPage === totalPages}
        >
          {
            currentPage !== totalPages ?
              <LinkLocale
                className={currentPage === 1 ? "cursor-not-allowed" : ""}
                href={{ pathname: `/ceo/proyectos`, query: { page: (currentPage + 1) } }}>
                {t("common.next")}</LinkLocale> : t("common.next")}
        </button>
      </div>
    </main >
  );
}
