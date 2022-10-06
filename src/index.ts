/**
 * @openformation/logto-remix
 *
 * Copyright, 2022 - Open Formation GmbH, Hamburg, Germany
 *
 * All rights reserved
 */

/**
 * @author André König <andre.koenig@openformation.io>
 *
 */

 import { LogtoConfig } from "@logto/node";
 import { json, LoaderArgs, redirect, SessionStorage } from "@remix-run/node";
 import { makeLogtoAdapter } from "./infrastructure/logto";
 import { makeHandleSignIn } from "./useCases/handleSignIn";
 import { makeHandleSignInCallback } from "./useCases/handleSignInCallback";
 import { makeHandleSignOut } from "./useCases/handleSignOut";
 
 type Config = Readonly<LogtoConfig> & {
   readonly baseUrl: string;
 };
 
 export const makeLogtoRemix = (
   config: Config,
   deps: {
     sessionStorage: SessionStorage;
   }
 ) => {
   const { sessionStorage } = deps;
 
   const createLogtoAdapter = makeLogtoAdapter(config);
 
   return {
     handleSignIn: async ({ request }: LoaderArgs) => {
       const execute = makeHandleSignIn({ createLogtoAdapter, sessionStorage });
 
       const cookieHeader = request.headers.get("Cookie");
 
       const result = await execute({
         cookieHeader,
         redirectUri: `${config.baseUrl}/api/sign-in-callback`,
       });
 
       return redirect(result.navigateToUrl, {
         headers: {
           "Set-Cookie": result.cookieHeader,
         },
       });
     },
     handleSignInCallback: async ({ request }: LoaderArgs) => {
       const execute = makeHandleSignInCallback({
         createLogtoAdapter,
         sessionStorage,
       });
 
       const cookieHeader = request.headers.get("Cookie");
 
       if (!cookieHeader) {
         // TODO: Throw proper error
         return json({}, 400);
       }
 
       const result = await execute({
         cookieHeader,
         callbackUri: request.url.replace("http", "https"),
       });
 
       return redirect("/", {
         headers: {
           "Set-Cookie": result.cookieHeader,
         },
       });
     },
     handleSignOut: async ({ request }: LoaderArgs) => {
       const execute = makeHandleSignOut({
         createLogtoAdapter,
         sessionStorage,
       });
 
       const cookieHeader = request.headers.get("Cookie");
 
       if (!cookieHeader) {
         // TODO: Throw proper error
         return json({}, 400);
       }
 
       const result = await execute({
         cookieHeader,
         redirectUri: "/api/sign-in",
       });
 
       return redirect("/", {
         headers: {
           "Set-Cookie": result.cookieHeader,
         },
       });
     },
   };
 };
 