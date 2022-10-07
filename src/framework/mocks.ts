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

import { createSession, Session, SessionStorage } from "@remix-run/node";
import { CreateLogtoAdapter, LogtoContext } from "../infrastructure/logto";
import { createStorage } from "../infrastructure/logto/createStorage";

export const getContext = jest.fn(async () => ({
  context: {
    isAuthenticated: true,
    claims: {
      email: "test@test.io",
    },
  } as LogtoContext,
}));

const session = createSession();
export const storage = createStorage(session);

export const handleSignIn = jest.fn(async () => ({
  session,
  navigateToUrl: "/success-handle-sign-in",
}));

export const handleSignInCallback = jest.fn(async () => ({
  session,
}));

export const handleSignOut = jest.fn(async () => ({
  navigateToUrl: "/success-handle-sign-out",
}));

export const createLogtoAdapter: CreateLogtoAdapter = jest.fn(
  (session: Session) => {
    return {
      handleSignIn,
      handleSignInCallback,
      handleSignOut,
      getContext,
    };
  }
);

export const commitSession = jest.fn(
  async (session: Session) => session.data as unknown as string
);
export const destroySession = jest.fn();
export const getSession = jest.fn();

export const sessionStorage: SessionStorage = {
  commitSession,
  destroySession,
  getSession,
};
