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

import LogtoClient, { LogtoConfig } from "@logto/node";
import { LogtoStorage } from "./createStorage";

export const makeLogtoClient =
  (config: LogtoConfig, storage: LogtoStorage) =>
  (navigate: (url: string) => void = () => {}) => {
    return new LogtoClient(config, { storage, navigate });
  };

export type CreateLogtoClient = ReturnType<typeof makeLogtoClient>;
export type { LogtoConfig };
