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

import { HandleSignOutController } from "./HandleSignOutController";

import { makeHandleSignOutUseCase } from "./HandleSignOutUseCase";

import { createLogtoAdapter, sessionStorage } from "../../framework/mocks";

describe("useCases:handleSignOut:HandleSignOutController", () => {
  it("can be created", () => {
    const useCase = makeHandleSignOutUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    const controller = HandleSignOutController.fromDto({
      useCase,
      redirectUri: "/",
    });

    expect(controller.constructor.name).toBe("HandleSignOutController");
  });
});
