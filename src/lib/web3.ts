import { getTranslations } from "next-intl/server"

export type Web3I18 = {
    id: number
    h2: string
    desc: string
    list: string[]
    instructions: string[]
}

export type Web3Stat = {
    id: number
    path: string
    contract: string
}
const web3Static: Web3Stat[] = [{
    id: 1,
    path: "/nft-raffle",
    contract: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md"
}, {
    id: 2,
    path: "/nft-membership",
    contract: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md"
}, {
    id: 3,
    path: "/counter",
    contract: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md"
}]

export async function getWeb3(): Promise<(Web3I18 & Web3Stat)[]> {
    const t = await getTranslations()

    const localeWeb3: Web3I18[] = t.raw("ceo.code.slider")
    const mWeb3 = localeWeb3.map((locale: Web3I18) => {
        const web3base = web3Static.find(web3st => web3st.id === locale.id)
        if (!web3base) throw new Error("Not found static info")
        const { path, contract } = web3base
        return {
            ...locale,
            path,
            contract
        }
    })
    return mWeb3
}