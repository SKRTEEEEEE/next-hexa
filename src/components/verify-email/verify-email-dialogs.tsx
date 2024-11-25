"use client"

import { rd } from "@/actions/revrd";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function VerifyEmailConfirmDialog() {
    const[loading, setLoading] = useState(false)


  const handleContinue = () => {
    try {
        setLoading(true)
        rd("/")
        
    } catch (error) {
        console.error("error at redirect")
    }finally{
        setLoading(false)
    }
  };

  return (
    <AlertDialog open={true}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Email Verificado 🎉 !</AlertDialogTitle>
          <AlertDialogDescription>
            Tu email a sido verificado correctamente. Descubre todas nuestras funcionalidades exclusivas para miembros verificados 🔎
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleContinue}>{loading?<p>Cargando...</p>:<p>Continua</p>}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export function RenderAlert({title,description}:{title: string, description: string}) {
    function navigate(){
      rd("/")
    }
    return (
      <AlertDialog open={true}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={()=>navigate()} >Continua</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
  }

  