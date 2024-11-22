import { SiteHeader } from "@/components/site-header/site-header";
import { CThemeProvider } from "@/components/oth/theme-provider";
import { siteConfigMain as siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { Icons } from "@/components/site-header/icons";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: {name:siteConfig.author},
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL??siteConfig.url)
};
export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light", color: "white"},
    {media: "(prefers-color-scheme: dark", color: "black"}
  ]
}
const dataSiteConfig = {
  logo: {
      path: "/",
      render: <>
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold">{siteConfig.name}</span>
      </>
  },
  paths: [
      {
          id: "ejercicios",
          path: "/academia/ejercicios",
          title: "Ejercicios"
      }
  ],
  icons: [
      {
          id: "github",
          path: siteConfig.links.github,
          title: "Github",
          render: 
          <>
              <Icons.gitHub className="h-4 w-4"/>
              <span className="sr-only">GitHub</span>
          </>,
          blank: true
      },
      {
          id: "twitter",
          path: siteConfig.links.twitter,
          title: "Twitter",
          render: 
          <>
              <Icons.twitter className="h-4 w-4"/>
              <span className="sr-only">Twitter</span>
          </>,
          blank: true
      },
  ]

}
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <CThemeProvider defaultTheme="dark-soft" disableTransitionOnChange>
        <ThirdwebProvider>
          <SiteHeader dataSiteConfig={dataSiteConfig}/>
          {children}
          </ThirdwebProvider>
          </CThemeProvider>
          </div>
  );
}