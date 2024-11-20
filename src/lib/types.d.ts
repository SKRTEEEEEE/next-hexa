
import type { JSX } from "react";
// Other tech data 
export type TechLenguajeItem = {
    title: string;
    icon: React.ReactElement;
    version: string;
    desc: string;
  }

// Site config data
export type DataSiteConfig = {
  logo: {
      path: string;
      render: JSX.Element;
  };
  paths: {
      id: string;
      path: string;
      title: string;
  }[];
  icons: {
    id: string;
    path: string;
    title: string;
    render: JSX.Element;
    blank: boolean;
}[];
}