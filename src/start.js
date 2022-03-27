/* eslint strict:"off" */
'use strict';

import { build } from './build.js';
import esMain from 'es-main';

async function start() {
  const app = build({ logger: true });
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
