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

export class HandleAuthRoutesError extends Error {
  private constructor(
    private readonly props: {
      readonly code: number;
      readonly message: string;
      readonly cause?: Error;
    }
  ) {
    super(`#[${props.code}] ${props.message}`);
  }

  public readonly code = this.props.code;
  public readonly cause = this.props.cause;
  public readonly plainMessage = this.props.message;

  public static readonly becauseNoConfigForPath = (anticipatedPath: string) =>
    new HandleAuthRoutesError({
      code: 1665388277,
      message: `No configuration available for path "${anticipatedPath}".`,
    });

  public static readonly becauseOfUnknownRoute = (
    anticipatedConfigKey: string
  ) =>
    new HandleAuthRoutesError({
      code: 1665388278,
      message: `The config key "${anticipatedConfigKey}" is invalid.`,
    });
}
