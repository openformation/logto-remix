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

import { makeHandleSignInCallbackUseCase } from "./HandleSignInCallbackUseCase";

import {
  createLogtoAdapter,
  sessionStorage,
  handleSignInCallback,
} from "../../framework/mocks";

describe("useCases:handleSignInCallback:HandleSignInCallbackUseCase", () => {
  afterEach(() => jest.resetAllMocks());

  it("can make a use case executer", async () => {
    const execute = makeHandleSignInCallbackUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    await execute({
      cookieHeader: "abcd",
      callbackUri: "/",
    });

    expect(handleSignInCallback).toBeCalledTimes(1);
  });
});
