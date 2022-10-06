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
 import { Session } from "@remix-run/node";
 import { makeLogtoClient } from "./createClient";
 import { createStorage } from "./createStorage";
 import { makeHandleSignIn } from "./handleSignIn";
 import { makeHandleSignInCallback } from "./handleSignInCallback";
 import { makeHandleSignOut } from "./handleSignOut";
 
 type MakeLogtoAdapterConfiguration = LogtoConfig;
 
 export const makeLogtoAdapter =
   (config: MakeLogtoAdapterConfiguration) => (session: Session) => {
     const storage = createStorage(session);
     const createClient = makeLogtoClient(config, storage);
 
     return {
       handleSignIn: makeHandleSignIn({ storage, createClient }),
       handleSignInCallback: makeHandleSignInCallback({ storage, createClient }),
       handleSignOut: makeHandleSignOut({ storage, createClient }),
     };
   };
 
 export type CreateLogtoAdapter = ReturnType<typeof makeLogtoAdapter>;
 