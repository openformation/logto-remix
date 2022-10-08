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
import { CreateLogtoAdapter } from "../../infrastructure/logto";

type SignOutRequest = {
  readonly cookieHeader: string | null;
  redirectUri: string;
};

type SignOutResponse = {
  cookieHeader: string;
  readonly navigateToUrl: string;
};

export const makeHandleSignOutUseCase =
  (deps: {
    createLogtoAdapter: CreateLogtoAdapter;
    sessionStorage: SessionStorage;
  }) =>
  async (request: SignOutRequest): Promise<SignOutResponse> => {
    const { sessionStorage, createLogtoAdapter } = deps;

    const session = await sessionStorage.getSession(request.cookieHeader);

    const logto = createLogtoAdapter(session);

    const response = await logto.handleSignOut({
      redirectUri: request.redirectUri,
    });

    const cookieHeader = await sessionStorage.destroySession(session);

    return {
      cookieHeader,
      navigateToUrl: response.navigateToUrl,
    };
  };

export type HandleSignOutUseCase = ReturnType<typeof makeHandleSignOutUseCase>;
