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

 import { Storage, StorageKey } from "@logto/node";
 import { Session } from "@remix-run/node";
 
 class LogtoStorage implements Storage {
   private constructor(
     private props: {
       session: Session;
     }
   ) {}
 
   public readonly session = this.props.session;
 
   public static readonly fromSession = (session: Session) => {
     return new LogtoStorage({ session });
   };
 
   public readonly setItem = async (key: StorageKey, value: string) => {
     this.session.set(key, value);
   };
 
   public readonly getItem = async (key: StorageKey) => {
     const itemExists = this.session.has(key);
 
     if (!itemExists) {
       return null;
     }
 
     return String(this.session.get(key));
   };
 
   public readonly removeItem = async (key: StorageKey) => {
     this.session.unset(key);
   };
 
   public readonly save = async () => {
     // Not required as the persistence happens in the integration layer
   };
 }
 
 export const createStorage = (session: Session) =>
   LogtoStorage.fromSession(session);
 
 export type { LogtoStorage };
 