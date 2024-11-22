"use client"
//Se usa en bastaantes sitios
import { generatePayload, isLoggedIn, login, logout } from "@/actions/auth"
import { rd } from "@/actions/revrd";
import { ConnectButton, darkTheme } from "thirdweb/react"
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { ThirdwebClientConfig } from "@/core/infrastructure/connectors/thirdweb-auth";
import { useState } from "react";
const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "discord",
          "telegram",
          "email",
          "facebook",
          "passkey",
          "phone",
          "apple",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("com.hashpack.wallet"),
    createWallet("org.uniswap"),
    createWallet("com.okex.wallet"),
    createWallet("ai.hacken"),
    createWallet("com.trusteeglobal"),
    createWallet("com.thirdweb"),
    createWallet("com.coinsdo"),
    createWallet("us.binance"),
    createWallet("dev.auroracloud"),
    createWallet("zone.bitverse"),
    createWallet("co.xellar"),
    createWallet("app.subwallet"),
    createWallet("com.kraken"),
    createWallet("com.alphawallet"),
    createWallet("org.mathwallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.trustwallet.app"),
    createWallet("com.ledger"),
    createWallet("com.bybit"),
    createWallet("com.safepal"),
    createWallet("pro.tokenpocket"),
    createWallet("xyz.timelesswallet"),
    createWallet("global.safe"),
    createWallet("io.1inch.wallet"),
    createWallet("com.robinhood.wallet"),
    createWallet("com.crypto.wallet"),
    createWallet("com.exodus"),
    createWallet("im.token"),
    createWallet("com.blockchain"),
    createWallet("com.zengo"),
    createWallet("com.mewwallet"),
    createWallet("app.keyring"),
    createWallet("xyz.frontier.wallet"),
    createWallet("app.omni"),
    createWallet("app.onto"),
    createWallet("com.fireblocks"),
    createWallet("technology.obvious"),
    createWallet("co.lobstr"),
    createWallet("com.ambire"),
    createWallet("com.bitcoin"),
    createWallet("io.internetmoney"),
    createWallet("app.walletnow"),
    createWallet("com.mtpelerin"),
    createWallet("io.alpha-u.wallet.web"),
  ];

  const getClient = new ThirdwebClientConfig()
const client = getClient.client


export const CConectButton =  ({connectButtonLabel="Iniciar session"}:{connectButtonLabel?:string}) =>{
    const [img, setImg] = useState<string|undefined>(undefined)
    return(
      <div suppressHydrationWarning>
        <ConnectButton
        
        // theme={darkTheme({
        // })}
        client={client}
        wallets={wallets}
        connectModal={{
            size: "compact",
            showThirdwebBranding: false,
          }}
        locale={"es_ES"}
        detailsModal={{
            footer: () => <div className="w-full text-2xl"><p>SKRT👾</p></div>
            ,
            hideSwitchWallet: true,
            hideDisconnect: false,
            connectedAccountAvatarUrl: img
        }}
        // El style parece que si modifica el connectButton w y height
        connectButton={{ label: connectButtonLabel, style:{
          height:  "2.25rem",
          width: "100%",
          borderRadius: "0.25rem",
          fontSize: "0.875rem",
          lineHeight:  "1.25rem",
        }, className: "bg-background hover:shadow-xl hover:shadow-primary h-9 px-4 py-2 " }}
        // 💡 El render lo podemos hacer dinamico para que en mobile muestre el original, podríamos mirar si es necesario/efectivo unificar con Configurar usuario button que tambien es dinamico por props
        detailsButton={{
          render: () => <Button variant={"outline"} className="w-full px-2">    <Wallet width={20} height={20} />
          <span className="inline-block sm:hidden px-2">Tu cartera</span>
          <p className="hidden sm:sr-only">Configuración de tu cartera</p></Button>,
        }}
        auth={{
            isLoggedIn: async (address:string )=> {
                console.log("check if logged in: ", {address})
                return await isLoggedIn()
            },
            doLogin: async (params) => {
                console.log("loggin in!")
                const jwt = await login(params)
                setImg(jwt.ctx.img)
                rd("/academia")
            },
            getLoginPayload: async ({address}) => generatePayload({address}),
            doLogout:async () => {
              await fetch('/api/logout', { method: 'GET' });
          }
        }}/></div>
    )
}