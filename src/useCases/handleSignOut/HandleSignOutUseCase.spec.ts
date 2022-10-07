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

import { makeHandleSignOutUseCase } from "./HandleSignOutUseCase";

import {
  createLogtoAdapter,
  sessionStorage,
  handleSignOut,
} from "../../framework/mocks";

describe("useCases:handleSignOut:makeHandleSignOutUseCase", () => {
  afterEach(() => jest.resetAllMocks());

  it("can make a use case executer", async () => {
    const execute = makeHandleSignOutUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    await execute({
      cookieHeader: "abcd",
      redirectUri: "/",
    });

    expect(handleSignOut).toBeCalledTimes(1);
  });
});
