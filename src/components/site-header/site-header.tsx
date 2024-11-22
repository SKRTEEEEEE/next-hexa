import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import UserFormDialog from "./user-form-dialog";
import { CConectButton } from "../oth/custom-connect-button";
import { DataSiteConfig } from "@/lib/types";
import { userInCookiesUC } from "@/core/interface-adapters/controllers/user";
import ThemePopover from "./theme-popover";



export async function SiteHeader({ dataSiteConfig }: { dataSiteConfig: DataSiteConfig }) {
    const user = await userInCookiesUC()
    return <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 background-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <nav className="flex items-center space-x-4 lg:space-x-6">
                {/* Logo part */}
                <Link href={dataSiteConfig.logo.path} className="flex items-center">
                    {dataSiteConfig.logo.render}
                </Link>
                {/* Paginas part */}
                <Link href={dataSiteConfig.paths[0].path} className={"text-sm font-medium transition-color hover:text-primary hidden md:inline-block"}>{dataSiteConfig.paths[0].title}</Link>
                {/* <Link href="/about" className={cn("text-sm font-medium transition-color hover:text-primary hidden sm:inline-block", pathname === "/about" ? "text-foreground" : "text-foreground/60")}>About</Link> */}
            </nav>

            <div className="flex flex-1 items-center justify-end space-x-2">
                <nav className="flex items-center gap-2">
                    {/* Icons part */}

                    {
                        dataSiteConfig.icons.map(item => {
                            return (
                                <Link key={item.title} href={item.path} target={item.blank ? "_blank" : "_self"} rel="noreferrer">
                                    <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden md:inline-flex")}>
                                        {item.render}
                                    </div>
                                </Link>
                            )
                        })
                    }</nav>
                    <span className="flex items-center gap-2">
                    <span className="md:inline-block hidden ">
                        <CConectButton />
                    </span>

                    <span className="hidden md:inline-block ">
                        <UserFormDialog user={user} /></span>


                    <ThemePopover />
                    <MobileNav dataSiteConfig={dataSiteConfig} user={user} /></span>
                

            </div>
        </div>
    </header>
}