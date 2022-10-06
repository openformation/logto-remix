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

import { LoaderArgs } from "@remix-run/node";

import { logto } from "../../services/authentication";

export async function loader(loaderArgs: LoaderArgs) {
  switch (loaderArgs.params.action) {
    case "sign-in": {
      return logto.handleSignIn(loaderArgs);
    }

    case "sign-in-callback": {
      return logto.handleSignInCallback(loaderArgs);
    }

    case "sign-out": {
      return logto.handleSignOut(loaderArgs);
    }
  }
}
