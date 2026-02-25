import { DriftyLayer } from "../../drifty/laws";
// packages/services/AuthService.ts - Core auth logic
export const DRIFTY_FILE_DECLARATION_SYMBOL = "L2_DOMAIN";
export const AuthService = {
 async login(data:any){
  return { success:true, company:"demo" };
 }
};


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
