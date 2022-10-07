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

import { LoaderFunction } from "@remix-run/node";

import { logto } from "../../services/authentication";

export const loader: LoaderFunction = ({ request, params }) => {
  switch (params.action) {
    case "sign-in": {
      return logto.handleSignIn(request);
    }

    case "sign-in-callback": {
      return logto.handleSignInCallback(request);
    }

    case "sign-out": {
      return logto.handleSignOut(request);
    }
  }
};
