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

import { makeGetContextUseCase } from "./GetContextUseCase";

import {
  createLogtoAdapter,
  sessionStorage,
  getContext,
  getSession,
} from "../../framework/mocks";

describe("useCases:getContext:GetContextUseCase", () => {
  afterEach(() => jest.resetAllMocks());

  it("can make a use case executer", async () => {
    const execute = makeGetContextUseCase({
      createLogtoAdapter,
      sessionStorage,
    });

    const response = await execute({
      cookieHeader: "abcd",
      includeAccessToken: false,
    });

    expect(getContext).toBeCalledTimes(1);
    expect(getSession).toBeCalledTimes(1);
    expect(response.context.isAuthenticated).toBe(true);
    expect(response.context.claims.email).toBe("test@test.io");
  });
});
