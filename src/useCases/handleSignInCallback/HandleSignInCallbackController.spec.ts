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

import { HandleSignInCallbackController } from "./HandleSignInCallbackController";

import { makeHandleSignInCallbackUseCase } from "./HandleSignInCallbackUseCase";

import { createLogtoAdapter, sessionStorage } from "../../framework/mocks";

describe("useCases:handleSignInCallback:HandleSignInCallbackController", () => {
  it("can be created", () => {
    const useCase = makeHandleSignInCallbackUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    const controller = HandleSignInCallbackController.fromDto({
      useCase,
      redirectUri: "/",
    });

    expect(controller.constructor.name).toBe("HandleSignInCallbackController");
  });
});
