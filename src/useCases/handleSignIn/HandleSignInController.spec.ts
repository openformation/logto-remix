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

import { HandleSignInController } from "./HandleSignInController";

import { makeHandleSignInUseCase } from "./HandleSignInUseCase";

import { createLogtoAdapter, sessionStorage } from "../../framework/mocks";

describe("useCases:handleSignIn:HandleSignInController", () => {
  it("can be created", () => {
    const useCase = makeHandleSignInUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    const controller = HandleSignInController.fromDto({
      useCase,
      redirectUri: "/",
    });

    expect(controller.constructor.name).toBe("HandleSignInController");
  });
});
