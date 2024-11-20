import { SiteHeader } from "@/components/site-header/site-header";
import { CThemeProvider } from "@/components/oth/theme-provider";
import { siteConfigAdmin as siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { Icons } from "@/components/site-header/icons";
import { UsersRound } from "lucide-react";

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
      render: 
      <>
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold">{siteConfig.name}</span>
      </>
  },
  paths: [
      {
          id: "techs",
          path: "/admin/techs",
          title: "Tecnologías"
      }
  ],
  icons: [
      {
          id: "users",
          path: siteConfig.links.users,
          title: "Usuarios",
          render: 
          <>
              <UsersRound  className="h-5 w-5"/>
              <span className="sr-only">Usuarios</span>
          </>,
          blank: false
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
      <CThemeProvider disableTransitionOnChange defaultTheme="dark-soft">
        <ThirdwebProvider>
          <SiteHeader dataSiteConfig={dataSiteConfig}/>
          {children}
          </ThirdwebProvider>
          </CThemeProvider>
          </div>
  );
}