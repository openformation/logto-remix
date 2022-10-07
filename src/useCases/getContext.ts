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
import { CreateLogtoAdapter, LogtoContext } from "../infrastructure/logto";

type GetContextRequest = {
  readonly cookieHeader: string | null;
  readonly includeAccessToken?: boolean;
};

type GetContextResponse = {
  context: Readonly<LogtoContext>;
};

export const makeGetContext =
  (deps: {
    createLogtoAdapter: CreateLogtoAdapter;
    sessionStorage: SessionStorage;
  }) =>
  async (request: GetContextRequest): Promise<GetContextResponse> => {
    const { sessionStorage, createLogtoAdapter } = deps;

    const session = await sessionStorage.getSession(request.cookieHeader);

    const logto = createLogtoAdapter(session);

    const response = await logto.getContext({
      includeAccessToken: request.includeAccessToken,
    });

    return {
      context: response.context,
    };
  };
