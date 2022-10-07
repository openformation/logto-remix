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

import { GetContextController } from "./GetContextController";

import { makeGetContextUseCase } from "./GetContextUseCase";

import { createLogtoAdapter, sessionStorage } from "../../framework/mocks";

describe("useCases:getContext:GetContextController", () => {
  it("can be created", () => {
    const useCase = makeGetContextUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    const controller = GetContextController.fromDto({
      useCase,
      includeAccessToken: false,
    });

    expect(controller.constructor.name).toBe("GetContextController");
  });
});
