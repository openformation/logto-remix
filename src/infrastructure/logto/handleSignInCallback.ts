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

import { Session } from "@remix-run/node";
import { CreateLogtoClient } from "./createClient";
import { LogtoStorage } from "./createStorage";

type HandleSignInCallbackRequest = {
  callbackUri: string;
};

type HandleSignInCallbackResponse = {
  readonly session: Session;
};

export const makeHandleSignInCallback =
  (deps: { storage: LogtoStorage; createClient: CreateLogtoClient }) =>
  async (
    request: HandleSignInCallbackRequest
  ): Promise<HandleSignInCallbackResponse> => {
    const { storage, createClient } = deps;

    const client = createClient();

    await client.handleSignInCallback(request.callbackUri);

    return {
      session: storage.session,
    };
  };
