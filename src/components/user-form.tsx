"use client"
import { updateUser } from "@/actions/user";
import { Button } from "./ui/button";
import { useActiveAccount } from "thirdweb/react";
import { signLoginPayload } from "thirdweb/auth";
import { generatePayload } from "@/actions/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { User } from "@/core/domain/entities/User";
import { useState } from "react";
import Image from "next/image";
import { Label } from "./ui/label";
import { updateImg, uploadImg } from "@/actions/img";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Link from "next/link";
import { RoleType } from "@/core/domain/entities/Role";
const roleEnum = z.enum([RoleType.ADMIN, RoleType.STUDENT, RoleType.STUDENT_PRO]);

const formSchema = z.object({
  nick: z.string().min(5,{message:"⚠️ Debe tener 5 caracteres como mínimo."}).max(25,{message:"⚠️ Debe tener 25 caracteres como máximo."}).optional(),
  solicitud: z.union([roleEnum,z.null() ],{message:"Debes marcar una de las posibilidades"}).default(null),
  img: z.string().nullable().default(null),
  email: z.string().email({ message: "El email debe ser válido" }).optional(), // Cambia a string y establece un valor por defecto

}).refine(data => {
  // Si el email no está presente, la solicitud debe ser null
  if (!data.email) {
    return data.solicitud === null;
  }
  return true; // Si hay email, no hay restricciones sobre la solicitud
}, {
  message: "Si no proporcionas un email, la solicitud debe ser: 'Sin privilegios'",
  path: ["solicitud"], // Indica que el error se refiere al campo 'solicitud'
});

export default function UserForm({ user }: { user: User | false | null }) {
  const account = useActiveAccount()
  const [previewImage, setPreviewImage] = useState<string | null>(user ? user.img : null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nick: user ? user.nick : "",
      solicitud: user ? user.solicitud : null,
      img: user ? user.img : null,
      email: user ? user.email || undefined : undefined,
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  }

  const setData = async () => {
    if (!selectedFile || !user) return

    try {
      const formData = new FormData();
      formData.append('img', selectedFile);

      let imageUrl: string;
      if (user.img) {
        imageUrl = await updateImg(formData, user.img);
      } else {
        imageUrl = await uploadImg(formData);
      }
      form.setValue("img", imageUrl)
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  }
  
  async function onSubmit(formData: z.infer<typeof formSchema>) {
    if (!account || !user) {
      console.error("Please connect your wallet or log in")
      return
    }

    if (selectedFile !== null) await setData()

    const payload = await generatePayload({address: account.address})
    const signatureRes = await signLoginPayload({account, payload})
    const updatedData = {
      ...formData,
      email: (typeof formData.email ===  "string")? formData.email: null,
      img: form.getValues().img
    };
  
    const res = await updateUser(user.id, signatureRes, updatedData);
    console.log("res: ", res)
  }

  const isFormDisabled = !user

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update User Profile</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="nick"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nick</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="👾 De 5 a 25 caracteres" disabled={isFormDisabled} />
                </FormControl>
                <FormDescription>Este será tu nombre público.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input {...field}  placeholder="ejemplo@correo.com" disabled={isFormDisabled} />
                </FormControl>
                <FormDescription>Email para verificación.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solicitud"
            render={({field}) => (
              <FormItem>
              <FormLabel>Privilegio</FormLabel>
              <Select onValueChange={value => field.onChange(value === "NONE" ? null : value)} defaultValue={ field.value === null ? undefined : field.value }>               
                 <FormControl>
                  <SelectTrigger> 
                    <SelectValue placeholder="Solicita una vez configurado el email" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value="m@example.com">m@example.com</SelectItem> */}
                  <SelectItem value="NONE">Sin privilegios</SelectItem>
                  <SelectItem value="STUDENT">Alumno</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Configura un email y solicita privilegios, nos pondremos en contacto inmediatamente.{" "}
                <Link href="#">Información aquí.</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
            )}
          />
          
          {previewImage && (
            <div>
              <Image src={previewImage} alt="Imagen de perfil" width={200} height={200} style={{ maxWidth: '200px', maxHeight: '200px' }} />
              <Button onClick={() => setPreviewImage(null)} disabled={isFormDisabled}>Modificar imagen</Button>
            </div>
          )}
          
          {!previewImage && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleFileChange} disabled={isFormDisabled} />
            </div>
          )}

          <Button
            type="submit"
            disabled={isFormDisabled || !account}
          >
            {isFormDisabled ? "Please Log In to Update Profile" : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  )
}