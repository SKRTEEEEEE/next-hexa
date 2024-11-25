import { ToastTest } from "@/components/oth/toast-test";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("root")
  return (
  <main  className="container h-dvh mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-8">
      <h1 className="text-center">{t("h1")}</h1> <br />
      {/* <Link href={"/dashboard/config"}>Ir al dashboard config</Link> */}
      <Link href={"/admin"}>{t("links.admin")}</Link>
      <Link href={"/academia"}>{t("links.academia")}</Link>
      <Link href={"/ceo"}>{t("links.ceo")}</Link>
      <ToastTest/>
    </div>
  </main>
  );
}
