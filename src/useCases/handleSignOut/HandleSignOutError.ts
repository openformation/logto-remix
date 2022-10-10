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

export class HandleSignOutError extends Error {
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

  public static readonly becauseNoCookieHeaderPresent = () =>
    new HandleSignOutError({
      code: 1665388713,
      message: `The authentication sign-out route can't be accessed without a valid cookie.`,
    });
}
