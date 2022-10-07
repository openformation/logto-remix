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

import { LoaderFunction, SessionStorage } from "@remix-run/node";
import { CreateLogtoAdapter } from "../../infrastructure/logto";
import { makeGetContext } from "../getContext";
import { makeHandleSignIn } from "../handleSignIn";
import { makeHandleSignInCallback } from "../handleSignInCallback";
import { makeHandleSignOut } from "../handleSignOut";

type AuthRouteConfig = {
  readonly path: string;
  readonly redirectBackTo: string;
};

type PossibleRouteTypes = "sign-in" | "sign-in-callback" | "sign-out";
type HandleAuthRoutesDto = Record<PossibleRouteTypes, AuthRouteConfig>;

type MakeHandleAuthRoutesDto = {
  readonly baseUrl: string;
  readonly createLogtoAdapter: CreateLogtoAdapter;
  readonly sessionStorage: SessionStorage;
};

export const makeHandleAuthRoutes =
  (deps: MakeHandleAuthRoutesDto) =>
  (dto: HandleAuthRoutesDto): LoaderFunction =>
  async ({ request }) => {
    const anticipatedPath = new URL(request.url).pathname;

    const configKey = Object.keys(dto).find(
      (type) => dto[type as PossibleRouteTypes].path === anticipatedPath
    ) as keyof HandleAuthRoutesDto;

    const configExists = Boolean(configKey);

    if (!configExists) {
      // TODO: Throw semantic error
      throw new Error();
    }

    const { sessionStorage, createLogtoAdapter } = deps;

    const config = dto[configKey];

    switch (configKey as PossibleRouteTypes) {
      case "sign-in": {
        const handler = makeHandleSignIn(
          {
            redirectBackTo: `${deps.baseUrl}${config.redirectBackTo}`,
          },
          { sessionStorage, createLogtoAdapter }
        );

        return handler(request);
      }

      case "sign-in-callback": {
        const handler = makeHandleSignInCallback(
          {
            redirectBackTo: `${deps.baseUrl}${config.redirectBackTo}`,
          },
          { sessionStorage, createLogtoAdapter }
        );

        return handler(request);
      }

      case "sign-out": {
        const handler = makeHandleSignOut(
          {
            redirectBackTo: `${deps.baseUrl}${config.redirectBackTo}`,
          },
          { sessionStorage, createLogtoAdapter }
        );

        return handler(request);
      }

      default: {
        // TODO: Throw semantic error

        throw new Error();
      }
    }
  };
