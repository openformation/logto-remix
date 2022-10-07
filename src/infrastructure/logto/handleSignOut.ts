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

import { CreateLogtoClient } from "./createClient";
import { LogtoStorage } from "./createStorage";

type HandleSignOutRequest = {
  readonly redirectUri: string;
};

type HandleSignOutResponse = {
  readonly navigateToUrl: string;
};

export const makeHandleSignOut =
  (deps: { storage: LogtoStorage; createClient: CreateLogtoClient }) =>
  async (request: HandleSignOutRequest): Promise<HandleSignOutResponse> => {
    const { storage, createClient } = deps;

    let navigateToUrl = "/api/sign-in";

    const client = createClient((url) => (navigateToUrl = url));

    await client.signOut(request.redirectUri);

    return {
      navigateToUrl,
    };
  };
