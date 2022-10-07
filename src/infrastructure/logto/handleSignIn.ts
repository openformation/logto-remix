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

type HandleSignInRequest = {
  readonly redirectUri: string;
};

type HandleSignInResponse = {
  readonly session: Session;
  readonly navigateToUrl: string;
};

export const makeHandleSignIn =
  (deps: { storage: LogtoStorage; createClient: CreateLogtoClient }) =>
  async (request: HandleSignInRequest): Promise<HandleSignInResponse> => {
    const { storage, createClient } = deps;

    let navigateToUrl = "/";

    const client = createClient((url) => (navigateToUrl = url));

    await client.signIn(request.redirectUri);

    return {
      session: storage.session,
      navigateToUrl,
    };
  };
