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

import { LogtoContext } from "@logto/node";

import { CreateLogtoClient } from "./createClient";
import { LogtoStorage } from "./createStorage";

type GetContextRequest = {
  readonly includeAccessToken: boolean;
};

type GetContextResponse = {
  readonly context: LogtoContext;
};

export const makeGetContext =
  (deps: { storage: LogtoStorage; createClient: CreateLogtoClient }) =>
  async (request: GetContextRequest): Promise<GetContextResponse> => {
    const { createClient } = deps;

    const client = createClient();

    const context = await client.getContext(request.includeAccessToken);

    return {
      context,
    };
  };
