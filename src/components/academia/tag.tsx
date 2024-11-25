import { slug } from "github-slugger"
import { badgeVariants } from "../ui/badge";
import { Link } from "@/i18n/routing";
interface TagProps {
    tag: string;
    current?: boolean;
    count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
    return <Link className={badgeVariants({ variant: current ? "default" : "secondary", className: "no-underline rounded-md" })} href={`/academia/temas-ejercicios/${slug(tag)}` as any}>
        {tag} {count ? `( ${count} )`:null}
    </Link>
}