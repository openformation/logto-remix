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

import { redirect, TypedResponse } from "@remix-run/node";
import { getCookieHeaderFromRequest } from "../../framework/getCookieHeaderFromRequest";

import type { HandleSignOutUseCase } from "./HandleSignOutUseCase";

type HandleSignOutControllerDto = {
  readonly useCase: HandleSignOutUseCase;
  readonly redirectUri: string;
};

export class HandleSignOutController {
  private constructor(
    private props: {
      useCase: HandleSignOutUseCase;
      redirectUri: string;
    }
  ) {}

  private readonly useCase = this.props.useCase;
  private readonly redirectUri = this.props.redirectUri;

  public static readonly fromDto = (dto: HandleSignOutControllerDto) =>
    new HandleSignOutController({
      useCase: dto.useCase,
      redirectUri: dto.redirectUri,
    });

  public readonly execute = async (
    request: Request
  ): Promise<TypedResponse<never>> => {
    const cookieHeader = getCookieHeaderFromRequest(request);

    // TODO: Throw semantic error
    if (!cookieHeader) {
      throw new Error();
    }

    const result = await this.useCase({
      cookieHeader,
      redirectUri: this.redirectUri,
    });

    return redirect(this.redirectUri, {
      headers: {
        "Set-Cookie": result.cookieHeader,
      },
    });
  };
}
