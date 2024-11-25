import { BookText, CodeSquare,  HomeIcon, UserRound, Linkedin, Github, Mail, Link, Info } from "lucide-react";

export const socialNetworks = [
    {
        id: 1,
        logo: <Github  size={30} strokeWidth={1} aria-describedby="Github"/>,
        src: "https://github.com/SKRTEEEEEE",
        title: "Github",
        desc: "Mi perfil en Github"
    },
    // {
    //     id: 2,
    //     logo: <Linkedin size={30} strokeWidth={1} />,
    //     src: "https://github.com/SKRTEEEEEE",
    // },
    {
        id: 3,
        logo: <Mail size={30} strokeWidth={1} aria-describedby="Mail"/>,
        src: "mailto:adanreh.m@gmail.com",
        title: "Mail",
        desc: "Contacto de correo electrónico"
    },

];
export const itemsNavbar = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="#fff" strokeWidth={1} aria-describedby="Home" />,
        link: "/",
        desc: {
            es: "Volver al inicio",
            de: "Zur Startseite zurückkehren",
            en: "Go to start"
        }
    },
    {
        id: 2,
        title: "Perfil",
        icon: <UserRound size={25} color="#fff" strokeWidth={1} aria-describedby="Perfil" />,
        link: "/ceo",
        desc: {
            es: "Presentación perfil",
            de: "Profilpräsentation",
            en: "Profile presentation"
        }
    },
    {
        id: 3,
        title: "Información",
        icon: <Info size={25} color="#fff" strokeWidth={1} aria-describedby="Información" />,
        link: "/ceo/info",
        desc: {
            es: "Principal Información tecnológica",
            de: "Wichtige technologische Informationen",
            en: "Main technological information"
        }
    },
    {
        id: 4,
        title: "Portafolio",
        icon: <CodeSquare size={25} color="#fff" strokeWidth={1} aria-describedby="Portafolio" />,
        link: "/ceo/portafolio",
        desc: {
            es: "Principales proyectos de código abierto",
            de: "Wichtigste Open-Source-Projekte",
            en: "Main open-source projects"
        }
    },
    {
        id: 5,
        title: "Estudios",
        icon: <BookText size={25} color="#fff" strokeWidth={1} aria-describedby="Estudios" />,
        link: "/ceo/estudios",
        desc: {
            es: "Estudios certificados oficiales",
            de: "Offizielle zertifizierte Studien",
            en: "Official certified studies"
        }
    },
    {
        id: 6,
        title: "Code",
        icon: <Link size={25} color="#fff" strokeWidth={1} aria-describedby="Code" />,
        link: "/ceo/code",
        desc: {
            es: "Información sobre proyectos de código abierto web3",
            de: "Informationen zu Open-Source-Web3-Projekten",
            en: "Information about open-source web3 projects"
        }
    },
];

// De aquí, para abajo, se ha de recoger/guardar en la bdd
export const dataStudiesPage = [
    {
        id: 1,
        institution: "CIEF",
        date: "30/10/24",
        badges: [
            "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MySQL", "BDD", "OOP", "DOM"
        ],
        link: "https://www.grupcief.com/"
    },
    {
        id: 2,
        institution: "Chainlink",
        date: "20/01/24",
        badges: [
            "Chainlink", "Blockchain", "Solidity", "ERC721", "ERC20", "Blockchain Oracles", "CCIP", "Chainlink Functions"
        ],
        link: "https://coinmarketcap.com/currencies/chainlink/"
    },
    {
        id: 3,
        institution: "Coliseum",
        date: "19/12/23",
        badges: [
            "Python"
        ],
        link: "https://www.centrocoliseum.com/"
    },
];

export const dataCounter = [
    {
        id: 0,
        endCounter: 2,
        lineRight: true,
        lineRightMobile: true,
    },
    {
        id: 1,
        endCounter: 80,
        lineRight: true,
        lineRightMobile: false,
    },
    {
        id: 2,
        endCounter: 30,
        lineRight: true,
        lineRightMobile: true,
    },
    // {
    //     id: 3,
    //     endCounter: 30,
    //     text: "Premios ganadores",
    //     lineRight: false,
    //     lineRightMobile: false,
    // },
];



export const admins = [
    "0x490bb233c707A0841cA52979Be4D88B6621d1988",
    "0x246264E2741C1bdDA990e9d48fF63DAa6fF242A3",
    "0xd65EC541B9EC79859A9a34F0665B824d46b62F6f"
]
