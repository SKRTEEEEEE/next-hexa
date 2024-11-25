import { FullTechData, Fw, Leng, LengFull, Lib } from "@/core/domain/entities/Tech";

type BadgeAndValue = {
    badge: string;
    value: string;
}

//El badge ya no se obtendrá de aquí sino que de la bdd, ya que depende del lenguaje al que pertenece el badge. Esto lo guardamos para un futuro en una posible card, etc..
export function getColorByRange(numValue:number):BadgeAndValue{
    let badge: string;
    let value: string;
    if (numValue > 80) {
        badge="darkgreen";
        value="max" // darkgreen para valores >= 80
    } else if (numValue > 60) {
        badge = "brightgreen";
        value = "high"; // brightgreen para valores >= 60 y < 80
    } else if (numValue > 40) {
        badge = "blue";
        value = "neut"; // "moderada" para valores >= 40 y < 60
    } else if (numValue >= 20) {
        badge = "yellow";
        value = "low"; // "baja" para valores >= 20 y < 40
    } else {
        badge = "red";
        value = "min"; // "minima" para valores < 20
    }
    return { badge, value };
}
export function getGithubUsoByRange(numValue:number):BadgeAndValue{
    let badge: string;
    let value: string;
    switch (true) {
        case numValue === 0:
            badge = "%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Ninguno";
            break;
        case numValue > 0 && numValue <= 0.05:
            badge = "%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Ínfimo";
            break;
        case numValue > 0.05 && numValue <= 0.2:
            badge = "%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Minúsculo";
            break;
        case numValue > 0.2 && numValue <= 0.5:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Bajo";
            break;
        case numValue > 0.5 && numValue <= 1.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98%F0%9F%94%98";
            value = "Reducido";
            break;
        case numValue > 1.0 && numValue <= 1.5:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98";
            value = "Menor";
            break;
        case numValue > 1.5 && numValue <= 2.5:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98%F0%9F%94%98";
            value = "Moderado";
            break;
        case numValue > 2.5 && numValue <= 4.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98";
            value = "Notable";
            break;
        case numValue > 4.0 && numValue <= 6.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%94%98";
            value = "Alto";
            break;
        case numValue > 6.0 && numValue <= 9.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1";
            value = "Elevado";
            break;
        case numValue > 9.0 && numValue <= 14.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1";
            value = "Superior";
            break;
        case numValue > 14.0:
            badge = "%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1%F0%9F%9F%A1";
            value = "Dominante";
            break;
        default:
            badge = "";
            value = "";
            break;
    }

    return { badge, value };
}

export const flattenTechs = (proyectos: LengFull[]|Leng[]) => {
    let flattenedArray: FullTechData[] = [];

    proyectos.forEach((proyecto) => {
        flattenedArray.push({
            name: proyecto.name,
            afinidad: proyecto.afinidad,
            value: getColorByRange(proyecto.afinidad).value,
            experiencia: proyecto.experiencia,
            valueexp: getColorByRange(proyecto.experiencia).value,
            color: proyecto.color,
            badge: proyecto.badge,
            isFw: false,
            isLib: false,
            preferencia: proyecto.preferencia,
            img: proyecto.img
        });

        proyecto.frameworks?.forEach((framework) => {
            flattenedArray.push({
                name: framework.name,
                afinidad: framework.afinidad,
                value: getColorByRange(framework.afinidad).value,
                experiencia: framework.experiencia,
                valueexp: getColorByRange(framework.experiencia).value,
                color: framework.color,
            badge: framework.badge,
            isFw: proyecto.name,
            isLib: false,
            preferencia: framework.preferencia,
            img: framework.img
            });

            framework.librerias?.forEach((libreria) => {
                flattenedArray.push({
                    name: libreria.name,
                    afinidad: libreria.afinidad,
                    value: getColorByRange(libreria.afinidad).value,
                    experiencia: libreria.experiencia,
                    valueexp: getColorByRange(libreria.experiencia).value,
                    color: libreria.color,
                    badge: libreria.badge,
                    isFw: proyecto.name,
                    isLib: framework.name,
                    preferencia: libreria.preferencia,
                    img: libreria.img
                });
            });
        });
    });

    return flattenedArray;
};

export function createBadgeTech(tech: Lib | Leng | Fw) {
    const color = tech.color.slice(1)
    console.log("color: ", color)
    return (
        `${tech.badge}\n>![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.value&label=%F0%9F%92%97%20Afinidad&color=${color}&style=flat&logo=${tech.name})![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.afinidad&color=${color}&style=flat&label=%20&suffix=%25)\n![Experiencia](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.valueexp&label=%F0%9F%8F%85%20Experiencia&color=${color}&style=flat&logo=${tech.name})![Experiencia %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.experiencia&color=${color}&style=flat&label=%20&suffix=%25)\n![Uso En Github](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.valueuso&label=%F0%9F%98%BB%20Uso%20en%20github&color=${color}&style=flat&logo=${tech.name})![Uso en Github %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$.${tech.name}.usogithub&color=${color}&style=flat&label=%20&suffix=%25)`
    )
}