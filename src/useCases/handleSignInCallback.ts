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

 import { SessionStorage } from "@remix-run/node";
 import { CreateLogtoAdapter } from "../infrastructure/logto";
 
 type SignInCallbackRequest = {
   readonly cookieHeader: string;
   readonly callbackUri: string;
 };
 
 type SignInCallbackResponse = {
   readonly cookieHeader: string;
 };
 
 export const makeHandleSignInCallback =
   (deps: {
     createLogtoAdapter: CreateLogtoAdapter;
     sessionStorage: SessionStorage;
   }) =>
   async (request: SignInCallbackRequest): Promise<SignInCallbackResponse> => {
     const { sessionStorage, createLogtoAdapter } = deps;
 
     const session = await sessionStorage.getSession(request.cookieHeader);
 
     const logto = createLogtoAdapter(session);
 
     const response = await logto.handleSignInCallback({
       callbackUri: request.callbackUri,
     });
 
     const cookieHeader = await sessionStorage.commitSession(response.session);
 
     return {
       cookieHeader,
     };
   };
 