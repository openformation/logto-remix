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

import { makeHandleSignInUseCase } from "./HandleSignInUseCase";

import {
  createLogtoAdapter,
  sessionStorage,
  handleSignIn,
} from "../../framework/mocks";

describe("useCases:handleSignIn:HandleSignInUseCase", () => {
  afterEach(() => jest.resetAllMocks());

  it("can make a use case executer", async () => {
    const execute = makeHandleSignInUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    await execute({
      cookieHeader: "abcd",
      redirectUri: "/",
    });

    expect(handleSignIn).toBeCalledTimes(1);
  });
});
