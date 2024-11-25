import { getTranslations } from 'next-intl/server';
import { JSX } from 'react';
import { SiChakraui, SiSolidity, SiStyledcomponents, SiSwiper, SiTailwindcss, SiThirdweb } from 'react-icons/si';
import { TbBrandNextjs, TbBrandThreejs } from 'react-icons/tb';

export type Tech = {

    title: string;
    iconName: string;
    version: string;
    desc: string;
  
  };
export type Techs = {
    frontend?: Tech[],
    backend?: Tech[]
  
  }
  
export type Project = {
    id: number;
    title: string;
    description: string;
    main_objetive: string;
    objetives: string[];
    technologies: Techs;
    image: string;
    urlGithub: string;
    urlDemo?: string; 
    operative: boolean;
    ejemplo: boolean;
  };
  const getIcon = (techName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "TbBrandNextjs": <TbBrandNextjs size={40} />,
      "SiTailwindcss": <SiTailwindcss size={40} />,
      "SiSwiper": <SiSwiper size={40} />,
      "SiStyledcomponents": <SiStyledcomponents size={40} />,
      "SiChakraui": <SiChakraui size={40} />,
      "SiThirdweb": <SiThirdweb size={40} />,
      "SiSolidity": <SiSolidity size={40} />,
      "TbBrandThreejs": <TbBrandThreejs size={40} />
    };
    return iconMap[techName] || null;
  };

export async function getProjects(): Promise<Project[]> {
  const t = await getTranslations()

  const projects = t.raw("ceo.proyectos.id");
  const mappedProjects = projects.map((project: Project, index: number) => {
    const frontends = project.technologies?.frontend || [];
    const backends = project.technologies?.backend || [];
    return {
      id: project.id,
      title: project.title || '',
      description: project.description || '',
      objetivo: project.main_objetive || '',
      objetivos: project.objetives || [],
      technologies: {
        frontend: frontends.map((tech: Tech) => ({
          ...tech,
          icon: getIcon(tech.iconName)
        })),
        backend: backends.map((tech: Tech) => ({
          ...tech,
          icon: getIcon(tech.iconName)
        }))
      },
      image: project.image || "",
      urlDemo: project.urlDemo || '',
      urlGithub: project.urlGithub || '',
      operative: project.operative || false,
      ejemplo: project.ejemplo || false
    };
  });
  console.log("mappedProjects: ", mappedProjects)
  return mappedProjects
}