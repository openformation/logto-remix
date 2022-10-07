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
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { logto } from "~/services/authentication";

type LoaderResponse = {
  readonly context: LogtoContext;
};

export const loader: LoaderFunction = async ({ request }) => {
  const context = await logto.getContext({ includeAccessToken: false })(
    request
  );

  return json<LoaderResponse>({ context });
};

const Home = () => {
  const data = useLoaderData<LoaderResponse>();

  return (
    <div>
      <header>
        <h1>Hello Logto (with Remix).</h1>
      </header>
      <nav>
        {data?.context.isAuthenticated ? (
          <a href="/api/logto/sign-out">Sign Out</a>
        ) : (
          <a href="/api/logto/sign-in">Sign In</a>
        )}
      </nav>
      {data?.context.isAuthenticated && (
        <div>
          <div>
            <h2>User info:</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th align="right">Value</th>
                </tr>
              </thead>
              <tbody>
                {data.context.claims &&
                  Object.entries(data.context.claims).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td align="right">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <h3>
            <a href="/protected">
              Example: View which needs an authenticated user. It also redirects
              to the sign-in when the user was not authenticated.
            </a>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Home;
