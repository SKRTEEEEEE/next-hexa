'use client'

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Plus } from 'lucide-react'
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DeleteTechButton from "./delete-tech-button"
import { TechDialog } from "./tech-dialog"
import { Tooltip } from "@radix-ui/react-tooltip"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { FullTechData } from "@/core/domain/entities/Tech"

// - [ ] Falta mostrar el error del delete, y mejorar...
// - [ ] Falta terminar la parte del mobile
type AdminTechTableProps = {
    lenguajes: FullTechData[];
    isAdmin: boolean;  
    dispo: {
      dispoLeng?: {name:string}[]
      dispoFw?: {name:string}[]
    }
    admins: any[];
  }
const renderButtonNew = 
<Button className="gap-2">
<Plus className="h-4 w-4" />
Añadir nueva tecnología
</Button>

export default function AdminTechTable({ lenguajes, isAdmin, dispo, admins }: AdminTechTableProps) {
  const {dispoLeng, dispoFw} = dispo
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const totalPages = Math.ceil(lenguajes.length / rowsPerPage)
  const [error, setError] = useState<string | null>(null);

  const paginatedData = lenguajes.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-10 bg-none z-10 py-4">
        <TechDialog dispoLeng={dispoLeng} dispoFw={dispoFw} renderButton={renderButtonNew} admins={admins}/>
      </div>

      {/* Desktop view */}
      <div className="rounded-md border z-0 bg-card hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Name</TableHead>
              <TableHead>Afinidad</TableHead>
              <TableHead>Experiencia</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((tech) => 
            {
              console.log("tech tech-table: ",tech)
              const renderButtonEdit = 
              <span>
              <TooltipProvider>
              <Tooltip>
    
                <TooltipTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Delete {tech.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-transparent border-none p-0">
                  <Button variant={"secondary"}>{ `Editar ${tech.name}` }</Button>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider>
              </span>
   // <Button variant="ghost" size="icon" asChild>
              //   <div>
              //     <Pencil className="h-4 w-4" />
              //     <span className="sr-only">Edit {tech.name}</span>
              //   </div>
              // </Button>;

              return(
              <TableRow key={tech.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={tech.img ? tech.img : ""} alt={tech.name} />
                      <AvatarFallback>{tech.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{tech.name.charAt(0).toUpperCase() + tech.name.slice(1).toLowerCase()}</span>

                  </div>
                </TableCell>
                <TableCell>{tech.afinidad}</TableCell>
                <TableCell>{tech.experiencia}</TableCell>
                <TableCell>
                  <Badge 
                    style={{ 
                      backgroundColor: `${tech.color}`,
                      color: parseInt(tech.color, 16) > 0xffffff / 2 ? '#000' : '#fff'
                    }}
                  >
                    {tech.color}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <TechDialog dispoLeng={dispoLeng} dispoFw={dispoFw} renderButton={renderButtonEdit} tech={tech} admins={admins}/>
                    <DeleteTechButton isAdmin={isAdmin} name={tech.name} onError={(error) => setError(error)}/>
                  </div>
                </TableCell>
              </TableRow>
            )}
            
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view ⚠️⬇️ FALTA TERMINAR ⬇️⚠️ */}
      <div className="z-0 space-y-2 sm:hidden">
        {paginatedData.map((tech) => (
          <Card key={tech.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-2">
              <CardTitle className="text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={tech.img?tech.img:""} alt={tech.name} />
                    <AvatarFallback>{tech.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Badge 
                    style={{ 
                      backgroundColor: `${tech.color}`,
                      color: parseInt(tech.color.split("#")[0], 16) > 0xffffff / 2 ? '#000' : '#fff'
                    }}
                    className="ml-2 text-xl px-4"
                  >{tech.name}</Badge>
                </div>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/techs/${tech.name}`}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit {tech.name}</span>
                  </Link>
                </Button>
                <DeleteTechButton isAdmin={isAdmin} name={tech.name} onError={(error) => setError(error)}/>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm flex gap-2">
               
                <p><span className="text-xs "> Afinidad: </span>{tech.afinidad}</p>
                <p><span className="text-xs"> Experiencia: </span>{tech.experiencia}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (page > 1) setPage(p => p - 1)
                }}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i} className="hidden sm:inline-block">
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(i + 1)
                  }}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (page < totalPages) setPage(p => p + 1)
                }}
                aria-disabled={page === totalPages}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}