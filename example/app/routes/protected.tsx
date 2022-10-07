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

import type { LogtoContext } from "@openformation/logto-remix";
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { logto } from "~/services/authentication";

type LoaderResponse = {
  readonly context: LogtoContext;
};

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ includeAccessToken: false })(
    request
  );

  if (!context.isAuthenticated) {
    return redirect("/api/logto/sign-in", 302);
  }

  return json<LoaderResponse>({ context });
};

const Home = () => {
  const data = useLoaderData<LoaderResponse>();

  return (
    <div>
      <header>
        <h1>Protected Ressource</h1>
        <p>This view is only visible when the user was authenticated.</p>
      </header>
      <nav>
        <a href="/">Back to Home</a>
      </nav>
    </div>
  );
};

export default Home;
