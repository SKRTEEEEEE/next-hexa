"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

import { CConectButton } from "../oth/custom-connect-button";
import { User } from "@/core/domain/entities/User";
import UserFormDialog from "../site-header/user-form-dialog";
import { DataSiteConfig } from "@/lib/types";
import { Separator } from "../ui/separator";
import { Link as LinkLocale, useRouter} from "@/i18n/routing";
import Link, { LinkProps } from "next/link";
import { useLocale } from "next-intl";

export function MobileNav({ user, dataSiteConfig }: { user: User | false | null, dataSiteConfig: DataSiteConfig }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Escoger tema</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle><LinkLocale className="font-bold flex items-center text-xl gap-4" onClick={()=>{
          setOpen(false)
        }} href={dataSiteConfig.logo.path as any}>
          {dataSiteConfig.logo.render}
        </LinkLocale>
        <Separator className="mt-2"/>
        </SheetTitle>
     
        
        <div className="flex flex-col gap-3 mt-3">
          {/* "Paginas " */}
          <MobileLink onOpenChange={setOpen} href={dataSiteConfig.paths[0].path}>
            {dataSiteConfig.paths[0].title}
          </MobileLink>
          {/* <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink> */}
          {/* Icons part */}

          {
            dataSiteConfig.icons.map(icon => {
             if(icon.blank){
              return(
              <Link key={icon.id} onClick={()=>{setOpen(false)}} target="_blank" rel="noreferrer" href={icon.path}>
              {icon.title}
            </Link>)
             }else{
              return(
                <LinkLocale key={icon.id} onClick={()=>{setOpen(false)}} rel="noreferrer" href={icon.path as any}>
                  {icon.title}
                </LinkLocale>
              )
             }
            })
          }
  
          <CConectButton/>
          <UserFormDialog user={user}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
}: MobileLinkProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(href.toString() as any);
        onOpenChange?.(false);
      }}
      className={className}
      // {...props}
    >
      {children}
    </div>
  );
}