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

type SignInRequest = {
  readonly cookieHeader: string | null;
  readonly redirectUri: string;
};

type SignInResponse = {
  readonly cookieHeader: string;
  readonly navigateToUrl: string;
};

export const makeHandleSignInUseCase =
  (deps: {
    createLogtoAdapter: CreateLogtoAdapter;
    sessionStorage: SessionStorage;
  }) =>
  async (request: SignInRequest): Promise<SignInResponse> => {
    const { sessionStorage, createLogtoAdapter } = deps;

    const session = await sessionStorage.getSession(request.cookieHeader);

    const logto = createLogtoAdapter(session);

    const response = await logto.handleSignIn({
      redirectUri: request.redirectUri,
    });

    const cookieHeader = await sessionStorage.commitSession(response.session);

    return {
      cookieHeader,
      navigateToUrl: response.navigateToUrl,
    };
  };

export type HandleSignInUseCase = ReturnType<typeof makeHandleSignInUseCase>;
