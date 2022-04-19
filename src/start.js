/* eslint strict:"off" */
"use strict";

import esMain from "es-main";
import { build } from "./build.js";
import "dotenv/config";

async function start() {
  const app = await build({ logger: true });

  try {
    await app.listen(8080);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

if (esMain(import.meta)) {
  start();
}
