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
import { redirect, SessionStorage } from "@remix-run/node";
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
    handleSignIn: async (request: Request) => {
      const execute = makeHandleSignIn({ createLogtoAdapter, sessionStorage });

      const cookieHeader = request.headers.get("Cookie");

      const result = await execute({
        cookieHeader,
        redirectUri: `${config.baseUrl}/api/sign-in-callback`,
      });

      return redirect(result.navigateToUrl, {
        headers: {
          "Set-Cookie": result.cookieHeader,
        },
      });
    },
    handleSignInCallback: async (request: Request) => {
      const execute = makeHandleSignInCallback({
        createLogtoAdapter,
        sessionStorage,
      });

      const cookieHeader = request.headers.get("Cookie");

      if (!cookieHeader) {
        // TODO: Throw semantic error
        throw new Error();
      }

      // DOCME
      const isForwardedHttpsTraffic =
        request.headers.get("x-forwarded-proto") === "https";

      const callbackUri = isForwardedHttpsTraffic
        ? request.url.replace("http", "https")
        : request.url;

      const result = await execute({
        cookieHeader,
        callbackUri,
      });

      return redirect("/", {
        headers: {
          "Set-Cookie": result.cookieHeader,
        },
      });
    },
    handleSignOut: async (request: Request) => {
      const execute = makeHandleSignOut({
        createLogtoAdapter,
        sessionStorage,
      });

      const cookieHeader = request.headers.get("Cookie");

      if (!cookieHeader) {
        // TODO: Throw semantic error
        throw new Error();
      }

      const result = await execute({
        cookieHeader,
        redirectUri: "/api/sign-in",
      });

      return redirect("/", {
        headers: {
          "Set-Cookie": result.cookieHeader,
        },
      });
    },

    getContext: async (request: Request) => {
      const execute = makeGetContext({
        createLogtoAdapter,
        sessionStorage,
      });

      const cookieHeader = request.headers.get("Cookie");

      if (!cookieHeader) {
        // TODO: Throw semantic error
        throw new Error();
      }

      const result = await execute({
        cookieHeader,
      });

      return result.context;
    },
  });
};
