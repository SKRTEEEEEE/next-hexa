"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LenguajesDispo, FrameworksDispo, FullTechData, FrameworkData, LibreriaData } from "@/lib/types"
import {  SearchCombobox } from "../oth/search-combobox"
import techBadges from "@/lib/data-slugs"
import { useActiveAccount } from "thirdweb/react"
import { updateTech } from "@/actions/techs/update"
import { ILenguaje } from "@/models/lenguajes-schema"
import { actualizarMd } from "@/actions/techs/actualizarMd"
import { publicarFwALeng, publicarLeng, publicarLibAFw } from "@/actions/techs/create"
import { actualizarJson } from "@/actions/techs/actualizarJson"
import {  rvrd } from "@/actions/revrd"
import { FaSpinner } from "react-icons/fa"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { CConectButton } from "../oth/custom-connect-button"
import Image from "next/image"
import { updateImg, uploadImg } from "@/actions/img"

const techSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  category: z.enum(["lenguaje", "framework", "libreria"], {
    required_error: "Debes seleccionar una categoría",
  }),
  badge: z.string().min(2, "El badge debe tener al menos 2 caracteres"),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color inválido"),
  preferencia: z.number().int().min(1, "Debe ser al menos 1").max(100, "No puede ser mayor a 100"),
  experiencia: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
  afinidad: z.number().min(0, "No puede ser negativo").max(100, "No puede ser mayor a 100"),
  lenguajeTo: z.string().optional(),
  frameworkTo: z.string().optional(),
  img: z.string().regex(/https:\/\/utfs\.io\/f\/([a-f0-9\-]+)-([a-z0-9]+)\.(jpg|webp|png)/, "URL invalida").nullable().default(null)
})

type TechFormValues = z.infer<typeof techSchema>

// const defaultValues: Partial<TechFormValues> = {
//   category: "lenguaje",
//   experiencia: 25,
//   afinidad: 30,
//   preferencia: 1,
// }

type FlattenAdmin = {
  id: string;
  address: string;
}
type TechDialogProps = {
  dispoLeng: LenguajesDispo[]
  dispoFw: FrameworksDispo[]
  renderButton: JSX.Element
  tech?: FullTechData
  admins: FlattenAdmin[]
}
const useIsAdmin = (admins: FlattenAdmin[]) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const account = useActiveAccount();

  useEffect(() => {
      const checkIsAdmin = async () => {
          try {
              if (account?.address) {
                  const isAdminUser = admins.some(admin => admin.address === account.address);
                  setIsAdmin(isAdminUser);
                  console.log("isAdmin (TechTable): ", isAdminUser);
                  console.log("address: ", account.address);
              }
          } catch (error) {
              console.error('Error al verificar si la cuenta es administrador', error);
          }
      };

      checkIsAdmin();
  }, [admins, account]);

  return {isAdmin, account};
};
export function TechDialog({ dispoLeng, dispoFw, renderButton, tech, admins }: TechDialogProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(tech ? tech.img : null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isUpdating = !!tech;
  const { isAdmin, account } =  useIsAdmin(admins);

  const form = useForm<TechFormValues>({
    resolver: zodResolver(techSchema),
    defaultValues: {
      name: tech ? tech.name : "",
      badge: tech ? tech.badge : "",
      category: tech ? (tech.isLib ? "libreria" : (tech.isFw ? "framework" : "lenguaje")) : "lenguaje",
      experiencia: tech ? tech.experiencia : 25,
      afinidad: tech ? tech.afinidad: 30,
      preferencia: tech? tech.preferencia : 1,
      color: tech ? tech.color : "",
      lenguajeTo: tech ? tech.isFw ? tech.isFw as string : "" : "",
      frameworkTo: tech ? tech.isLib ? tech.isLib as string : "" : "",
      img: tech ? tech.img : null,
    },
  })
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }
  const setData = async () => {
    if (!selectedFile) return

    try {
      const formData = new FormData();
      formData.append('img', selectedFile);

      let imageUrl: string;
      if (!!tech && tech.img) {
        console.log("updating image: ", tech.img)
        imageUrl = await updateImg(formData, tech.img);
      } else {
        imageUrl = await uploadImg(formData);
      }
      form.setValue("img", imageUrl)
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  }
  async function onSubmit(baseData: TechFormValues) {
    //Esto esta por hacer
    console.log(baseData)
    setIsLoading(true);
    try {
      if (selectedFile !== null) {
        await setData(); // Sube la imagen y actualiza el campo "img"
    }
      const data = {
        ...baseData,
        img: form.getValues("img")
      }
      const selectedCat = form.watch("category")
      const commonData = {
        name: data.name,
        afinidad: data.afinidad,
        badge: data.badge,
        preferencia: data.preferencia,
        color: data.color,
        experiencia: data.experiencia,
        img: data.img
    };

    let transformedData;
    switch (selectedCat) {
        case "lenguaje":
            transformedData = commonData;
            break;
        case "framework":
            transformedData = {
                ...commonData,
                lenguajeTo: isUpdating ? tech?.isFw : data.lenguajeTo,
            };
            break;
        case "libreria":
            transformedData = {
                ...commonData,
                lenguajeTo: isUpdating ? tech?.isFw : data.lenguajeTo,
                frameworkTo: isUpdating ? tech?.isLib : data.frameworkTo,
            };
            break;
        default:
            throw new Error("Categoría no reconocida");
    }

    console.log("transformedData: ", transformedData);
    let response;
    if(isAdmin){
        if (isUpdating) {
            response = await updateTech(transformedData as ILenguaje | FrameworkData | LibreriaData);
        } else {
            await actualizarMd({name: data.name, badge:data.badge, colorhash: data.color});
            switch (selectedCat) {
                case "lenguaje":
                    response = await publicarLeng(transformedData as ILenguaje);
                    break;
                case "framework":
                    response = await publicarFwALeng(transformedData as FrameworkData);
                    break;
                case "libreria":
                    response = await publicarLibAFw(transformedData as LibreriaData);
                    break;
                default:
                    response = {success:false, message: "Categoría no reconocida"}
                    throw new Error("Categoría no reconocida");                         
            }
            await actualizarJson();                    
            }
        }else{response={success:false, message: "User not admin"}}
        console.log("response: ", response);
        if (response.success) {
            alert(`¡Felicidades! ${response.message}`);
            rvrd("/admin/techs");
            
        } else {
            alert(`Oops! ${response.message}`);
        }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
      setOpen(false)
      form.reset()
    }    
  }
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {renderButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isUpdating?"Editar":"Añadir"} tecnología</DialogTitle>
          <DialogDescription className="text-xs">
            Ingresa los datos de la tecnología.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="details">Detalles</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <SearchCombobox name="name" title="nombre" form={form} data={techBadges} />
                <FormField 
                control={form.control}
                name="img"
                render={({field}) =>(
                  <FormItem><div className="flex items-center space-x-4 justify-between w-full">
                    <FormLabel className="top-0">Logo tecnología</FormLabel>
                    <FormControl>
                      <>
                    {previewImage && (
                        <>
                          <Image src={previewImage} id="picture" alt="Logo de tecnología" width={60} height={60} className="rounded-xl" />
                              <Button variant={"secondary"} className="my-auto" onClick={() => {
                                  setPreviewImage(null);
                                  setSelectedFile(null);
                                  form.setValue("img", null); // Limpia el valor en el formulario
                              }} >Modificar imagen</Button>
                        </>
                      )}

                      {!previewImage && (


                        <Input id="picture" type="file" placeholder="Click para cargar una imagen" onChange={handleFileChange} />

                      )} 
                      </>
                    </FormControl></div>
                    <FormDescription>Imagen para usar como logo de la tecnología</FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center text-sm space-x-3"
                        >
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="lenguaje" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Lenguaje
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="framework" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Framework
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="libreria" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Librería
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("category") !== "lenguaje" && (
                  <SearchCombobox name="lenguajeTo" title="lenguaje" data={dispoLeng} form={form}/>
                )}
                {form.watch("category") === "libreria" && (
                  <SearchCombobox name="frameworkTo" title="framework" data={dispoFw} form={form}/>
                )}
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="badge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge</FormLabel>
                      <FormControl>
                        <Input placeholder="Badge para usar en markdown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between w-full space-x-4">
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                      </div>
                      <FormDescription className="text-xs">
                        Color para usar en los badges de shields.io
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferencia"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between w-full gap-x-4">
                      <FormLabel>Preferencia</FormLabel>
                      <FormControl>
                        <Input className="w-16 text-center" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      </div>
                      <FormDescription className="text-xs">
                        Orden en categoría 
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experiencia"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex space-x-4 mt-4 items-center">
                      <div className="w-full">
                      <div className="flex items-center justify-between w-full gap-x-4">
                      <FormLabel>Experiencia</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={2.5}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      </div>
                      <FormDescription>
                        Nivel de experiencia (0-100)
                      </FormDescription>
                      <FormMessage />
                      </div>
                      <div className="text-2xl">{field.value}</div>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="afinidad"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex space-x-4 mt-4 items-center">
                      <div className="w-full">
                      <div className="flex items-center justify-between w-full gap-x-4">
                      <FormLabel>Afinidad</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={5}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      </div>
                      <FormDescription>
                        Nivel de afinidad (0-100)
                      </FormDescription>
                      <FormMessage />
                      </div>
                      <div className="text-2xl">{field.value}</div>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <DialogFooter>
            {
            account ? (
                isLoading ? (
                  <Button disabled variant={"outline"} className="gap-2"><FaSpinner width={6} height={6} /> <span>Cargando...</span></Button>
                ) : (
                  <TooltipProvider>
                    <Tooltip>

                      <TooltipTrigger asChild>
                                <Button variant={isAdmin?"outline":"destructive"}>
                                  Guardar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-transparent border-none p-0">
                              <Button style={{cursor: !isAdmin?"not-allowed":"pointer"}} variant={isAdmin?"secondary":"destructive"} disabled={!isAdmin} type="submit">{isUpdating?(isAdmin?"Actualizar":"Solo Admin"):(isAdmin?"Crear Tech":"Solo Admin")}</Button>
                              </TooltipContent>
                  </Tooltip></TooltipProvider>
                )
              ) : <CConectButton/>
            
            }
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}