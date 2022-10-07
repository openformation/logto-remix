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

import { LogtoContext } from "@logto/node";
import { getCookieHeaderFromRequest } from "../../framework/getCookieHeaderFromRequest";

import type { GetContextUseCase } from "./GetContextUseCase";

type GetContextControllerDto = {
  readonly includeAccessToken?: boolean;
  readonly useCase: GetContextUseCase;
};

export class GetContextController {
  private constructor(
    private props: {
      includeAccessToken: boolean;
      useCase: GetContextUseCase;
    }
  ) {}

  private readonly useCase = this.props.useCase;
  private readonly includeAccessToken = this.props.includeAccessToken;

  public static readonly fromDto = (dto: GetContextControllerDto) =>
    new GetContextController({
      useCase: dto.useCase,
      includeAccessToken: dto.includeAccessToken ?? false,
    });

  public readonly execute = async (request: Request): Promise<LogtoContext> => {
    const cookieHeader = getCookieHeaderFromRequest(request);
    const includeAccessToken = this.includeAccessToken;

    const result = await this.useCase({
      cookieHeader,
      includeAccessToken,
    });

    return result.context;
  };
}
