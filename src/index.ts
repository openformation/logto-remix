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

import { LogtoConfig, LogtoContext } from "@logto/node";
import { SessionStorage } from "@remix-run/node";
import { makeLogtoAdapter } from "./infrastructure/logto";
import { makeGetContext } from "./useCases/getContext";
import { makeHandleAuthRoutes } from "./useCases/handleAuthRoutes";

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

  const { baseUrl } = config;

  const createLogtoAdapter = makeLogtoAdapter(config);

  return Object.freeze({
    handleAuthRoutes: makeHandleAuthRoutes({
      baseUrl,
      createLogtoAdapter,
      sessionStorage,
    }),

    getContext: (dto: { includeAccessToken: boolean }) =>
      makeGetContext(dto, {
        createLogtoAdapter,
        sessionStorage,
      }),
  });
};

export type { LogtoContext };
