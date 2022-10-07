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

import { createSession } from "@remix-run/node";
import { createStorage } from "./createStorage";

describe("infrastructure:logto:createStorage", () => {
  it("can create a LogtoStorage instance", async () => {
    const session = createSession();
    const storage = createStorage(session);

    expect(storage.constructor.name).toBe("LogtoStorage");
  });

  it("can set items", async () => {
    const session = createSession();
    const storage = createStorage(session);

    storage.setItem("idToken", "a");
    storage.setItem("accessToken", "b");
    storage.setItem("refreshToken", "c");
    storage.setItem("signInSession", "d");

    expect(session.data.idToken).toBe("a");
    expect(session.data.accessToken).toBe("b");
    expect(session.data.refreshToken).toBe("c");
    expect(session.data.signInSession).toBe("d");
  });

  it("can remove items", async () => {
    const session = createSession();
    const storage = createStorage(session);

    storage.setItem("idToken", "a");
    storage.setItem("accessToken", "b");

    storage.removeItem("accessToken");

    expect(session.data.idToken).toBe("a");
    expect(session.data.accessToken).toBeUndefined();
  });

  it("can get items", async () => {
    const session = createSession();
    const storage = createStorage(session);

    storage.setItem("idToken", "a");
    storage.setItem("accessToken", "b");

    expect(storage.getItem("accessToken")).resolves.toBe("b");
    expect(storage.getItem("refreshToken")).resolves.toBeNull();
  });
});
