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

const config: LogtoConfig = {
  appId: "app_id_value",
  endpoint: "https://logto.dev",
};

import { makeLogtoClient } from "./createClient";
import type { LogtoConfig } from "./createClient";
import { createStorage } from "./createStorage";
import { createSession } from "@remix-run/node";

describe("infrastructure:logto:createClient", () => {
  it("creates an instance without crash", () => {
    expect(() => {
      const storage = createStorage(createSession());

      const createLogtoClient = makeLogtoClient(config, storage);

      createLogtoClient();
    }).not.toThrow();
  });
});
