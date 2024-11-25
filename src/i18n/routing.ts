import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export type AllPathnamesType = keyof typeof routing.pathnames;


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de', "es", "ca"],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // List of rutes translation
  pathnames: {
    "/":"/",
    "/ceo": "/ceo",
    "/ceo/proyectos": {
      en: "/ceo/projects",
      de: "/ceo/projekte",
      es: "/ceo/proyectos",
      ca: "/ceo/projectes"
    },
    "/ceo/proyectos/[id]": {
      en: "/ceo/projects/[id]",
      de: "/ceo/projekte/[id]",
      es: "/ceo/proyectos/[id]",
      ca: "/ceo/projectes/[id]"
    },
    "/ceo/portafolio": {
      en: "/ceo/portfolio",
      de: "/ceo/portfolio",
      es: "/ceo/portafolio",
      ca: "/ceo/portafoli"
    },
    "/ceo/info": "/ceo/info",
    "/ceo/estudios": {
      en: "/ceo/studies",
      de: "/ceo/studien",
      es: "/ceo/estudios",
      ca: "/ceo/estudis"
    },
    "/ceo/docs/[slug]":"/ceo/docs/[slug]",
    "/ceo/code": "/ceo/code",
    "/academia":{
      en: "/academy",
      de: "/akademie",
      es: "/academia",
      ca: "/academia"
    },
    "/academia/ejercicios":"/academia/ejercicios",
    "/academia/ejercicios/[...slug]":"/academia/ejercicios/[...slug]",
    "/academia/tarifas":"/academia/tarifas",
    "/academia/temas-ejercicios": "/academia/temas-ejercicios",
    "/academia/temas-ejercicios/[tema]": "/academia/temas-ejercicios/[tema]",
    "/academia/verify-email":"/academia/verify-email",
    "/admin":"/admin",
    "/admin/techs":"/admin/techs",
    "/admin/users":"/admin/users",

  }
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);