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
import { GetContextController } from "./GetContextController";
import { makeGetContextUseCase } from "./GetContextUseCase";

type GetContextDto = {
  readonly includeAccessToken?: boolean;
};

type HandleGetContextDeps = {
  readonly createLogtoAdapter: CreateLogtoAdapter;
  readonly sessionStorage: SessionStorage;
};

export const makeGetContext =
  (dto: GetContextDto, deps: HandleGetContextDeps) =>
  async (request: Request) => {
    const { createLogtoAdapter, sessionStorage } = deps;

    const useCase = makeGetContextUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    const controller = GetContextController.fromDto({
      useCase,
      includeAccessToken: dto.includeAccessToken,
    });

    return controller.execute(request);
  };
