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

//  import { logto } from "../../services/authentication";

//  export const loader = logto.handleAuthRoutes({
//    "sign-in": {
//      path: "/authentication/sign-in",
//      redirectBackTo: "/authentication/callback",
//    },
//    "sign-in-callback": {
//      path: "/authentication/callback",
//      redirectBackTo: "/",
//    },
//    "sign-out": {
//      path: "/authentication/sign-out",
//      redirectBackTo: "/",
//    },
//  });
