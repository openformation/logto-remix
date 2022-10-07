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

import { logto } from "../../../services/authentication";

export const loader = logto.handleAuthRoutes({
  "sign-in": {
    path: "/api/logto/sign-in",
    redirectBackTo: "/api/logto/callback",
  },
  "sign-in-callback": {
    path: "/api/logto/callback",
    redirectBackTo: "/",
  },
  "sign-out": {
    path: "/api/logto/sign-out",
    redirectBackTo: "/",
  },
});
