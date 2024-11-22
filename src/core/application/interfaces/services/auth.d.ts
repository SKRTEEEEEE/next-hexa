import { ExtendedJWTPayload, JWTContext } from "@/types/auth";
import { GenerateLoginPayloadParams, LoginPayload, VerifyLoginPayloadParams, VerifyLoginPayloadResult } from "thirdweb/auth";
import { RoleType } from "@/core/domain/entities/Role";
import { createAuth, VerifyLoginPayloadResult } from "thirdweb/auth";
import { JWTPayload } from "thirdweb/utils";




type AuthRepository = {
    
    logout(): Promise<void>;
    setJwt(payload: VerifyLoginPayloadParams, context:JWTContext): Promise<ExtendedJWTPayload>;
    getCookies(): Promise<ExtendedJWTPayload|false>;
    //->Comprobaciones
    isLoggedIn(): Promise<boolean>;
    isAdmin(): Promise<boolean>;
    //->Protected actions
    //Protected "logged" action, w. redirect
    // protLogAct(path:string|false): Promise<void>
    //Protected "admin" action, wo. redirect
    protAdmAct(): Promise<true>;
    protLogAct(): Promise<ExtendedJWTPayload>;
    //->Protected routes
    protLogRou(path:string): Promise<ExtendedJWTPayload>;
    protAdmRou(path:string): Promise<ExtendedJWTPayload>;
    generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> 
    verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> 
}

// JWT TYPES
// Define el tipo completo de ThirdwebAuth

type ThirdwebAuthType = ReturnType<typeof createAuth>;

// Extraer los tipos de las funciones individuales dentro de ThirdwebAuthType
// type GeneratePayloadType = ThirdwebAuthType['generatePayload'];
// type VerifyPayloadType = ThirdwebAuthType['verifyPayload'];
type GenerateJWTType = ThirdwebAuthType['generateJWT'];
type VerifyJWTType = ThirdwebAuthType['verifyJWT'];

// Ejemplos de uso de los tipos extraídos
// type GeneratePayloadParams = Parameters<GeneratePayloadType>[0];
// type VerifyPayloadParamsType = Parameters<VerifyPayloadType>[0];
 type GenerateJWTParams = Parameters<GenerateJWTType>[0];
 type VerifyJWTParamsType = Parameters<VerifyJWTType>[0];

type ValidVerifyLoginPayload = Extract<VerifyLoginPayloadResult, {valid: true}>
 type VerifiedLoginPayload = ValidVerifyLoginPayload["payload"]

// type GeneratePayloadReturnType = ReturnType<GeneratePayloadType>;
// type VerifyPayloadReturnType = ReturnType<VerifyPayloadType>;
type GenerateJWTReturnType = Awaited<ReturnType<GenerateJWTType>>;
type VerifyJWTReturnType = Awaited<ReturnType<VerifyJWTType>>;

// type ValidJWTReturnType = Extract<VerifyJWTReturnType, { valid: true }>;
// export type JWTPayload = ValidJWTReturnType['parsedJWT'];

type JWTContext = {
    role: RoleType | null;
    nick: string | undefined;
    id: string;
    img: string | undefined;

  }
interface ExtendedJWTPayload extends JWTPayload{
    ctx: JWTContext
}

// export type AuthAdapterRepository = {
//     generatePayload(params: GenerateLoginPayloadParams): Promise<LoginPayload> 

//     // verifyPayload(params: VerifyLoginPayloadParams): Promise<VerifyLoginPayloadResult> 
        

//     // generateJWT(payload: GenerateJWTParams): Promise<GenerateJWTReturnType> 
        

//     // verifyJWT(token: VerifyJWTParamsType): Promise<VerifyJWTReturnType> 
// }