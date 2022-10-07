/**
 * @openformation/logto-remix-example
 *
 * Copyright, 2022 - Open Formation GmbH, Hamburg, Germany
 *
 * All rights reserved
 */

/**
 * @author André König <andre.koenig@openformation.io>
 *
 */

export const getCookieHeaderFromRequest = (request: Request) =>
  request.headers.get("Cookie");
