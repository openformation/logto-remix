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

import { LoaderFunction, json, redirect } from "@remix-run/node";

import { logto } from "../../services/authentication";

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ includeAccessToken: true })(request);

  return json({ context });
};
