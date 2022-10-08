# @openformation/logto-remix

Logto Remix SDK written in TypeScript

## Prerequisites

- Running [Logto](https://logto.io) instance.
- Configured a _Traditional Web Application_ in Logto.

## Usage

Before initializing the SDK, we have to create a `SessionStorage` instance which takes care of the session persistence. In our case, we want to use a cookie-based session:

```ts
// services/authentication.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "logto-session",
    maxAge: 14 * 24 * 60 * 60,
    secrets: ["s3cret1"],
  },
});
```

Afterwards, we can initialize the SDK via:

```ts
// app/services/authentication.ts

export const logto = makeLogtoRemix(
  {
    endpoint: process.env.LOGTO_ENDPOINT!,
    appId: process.env.LOGTO_APP_ID!,
    appSecret: process.env.LOGTO_APP_SECRET!,
    baseUrl: process.env.LOGTO_BASE_URL!,
  },
  { sessionStorage }
);
```

Whereas the environment variables reflect the respective configuration of the application in Logto.

### Mounting the authentication route handlers

The SDK ships with a convenient function that mounts the authentication routes: sign-in, sign-in callback and the sign-out route:

```ts
// app/routes/api/logto/$action.ts

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
```

As you can see, the mount process is configurable and you can adjust it for your particular route structure. It is just important, that the Remix route needs to be named `$action.ts` in the end. The whole URL path structure can be customized via the passed configuration object.

When mounting the routes as described above, you can navigate your browser to `/api/logto/sign-in` and you should be redirected to your Logto instance where you have to authenticate then.

### Get the authentication context

A typical use case is to fetch the _authentication context_ which contains information about the respective user. With that information, it is possible to decide if the user is authenticated or not. The SDK exposes a function that can be used in a Remix `loader` function:

```ts
// app/routes/index.tsx
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

  if (!context.isAuthenticated) {
    return redirect("/api/logto/sign-in");
  }

  return json<LoaderResponse>({ context });
};

const Home = () => {
  const data = useLoaderData<LoaderResponse>();

  return <div>Protected Route.</div>;
};
```

## Example

A sample project can be found at [/example](https://github.com/openformation/logto-remix/tree/main/example)

Check out the source code and try it via:

```sh
pnpm i

cd example
docker-compose up -d

pnpm run dev
```

## License

![AGPLv3 Logo](./agplv3.png)

see [LICENSE](./LICENSE)
