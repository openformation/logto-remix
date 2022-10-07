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
import { SessionStorage } from "@remix-run/node";
import { getCookieHeaderFromRequest } from "./framework/getCookieHeaderFromRequest";
import { makeLogtoAdapter } from "./infrastructure/logto";
import { makeGetContext } from "./useCases/getContext";
import { makeHandleSignIn } from "./useCases/handleSignIn";
import { makeHandleSignInCallback } from "./useCases/handleSignInCallback";
import { makeHandleSignOut } from "./useCases/handleSignOut";

type Config = Readonly<LogtoConfig> & {
  readonly baseUrl: string;
};

export const makeLogtoRemix = (
  config: Config,
  deps: {
    sessionStorage: SessionStorage;
  }
) => {
  const { sessionStorage } = deps;

  const createLogtoAdapter = makeLogtoAdapter(config);

  return Object.freeze({
    handleSignIn: makeHandleSignIn(
      { redirectBackTo: `${config.baseUrl}/authentication/sign-in-callback` },
      { createLogtoAdapter, sessionStorage }
    ),

    handleSignInCallback: makeHandleSignInCallback(
      { redirectBackTo: config.baseUrl },
      { createLogtoAdapter, sessionStorage }
    ),

    handleSignOut: makeHandleSignOut(
      { redirectBackTo: `${config.baseUrl}/` },
      { createLogtoAdapter, sessionStorage }
    ),

    getContext: (dto: { includeAccessToken: boolean }) =>
      makeGetContext(dto, {
        createLogtoAdapter,
        sessionStorage,
      }),
  });
};
