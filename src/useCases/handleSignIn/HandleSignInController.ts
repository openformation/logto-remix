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

import type { HandleSignInUseCase } from "./HandleSignInUseCase";

type HandleSignInControllerDto = {
  readonly redirectUri: string;
  readonly useCase: HandleSignInUseCase;
};

export class HandleSignInController {
  private constructor(
    private props: {
      redirectUri: string;
      useCase: HandleSignInUseCase;
    }
  ) {}

  private readonly useCase = this.props.useCase;
  private readonly redirectUri = this.props.redirectUri;

  public static readonly fromDto = (dto: HandleSignInControllerDto) =>
    new HandleSignInController({
      useCase: dto.useCase,
      redirectUri: dto.redirectUri,
    });

  public readonly execute = async (
    request: Request
  ): Promise<TypedResponse<never>> => {
    const cookieHeader = getCookieHeaderFromRequest(request);
    const redirectUri = this.redirectUri;

    const result = await this.useCase({
      cookieHeader,
      redirectUri,
    });

    return redirect(result.navigateToUrl, {
      headers: {
        "Set-Cookie": result.cookieHeader,
      },
    });
  };
}
