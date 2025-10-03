'use strict';

module.exports = require('eslint-config-sukka').sukka({
  ts: {
    allowDefaultProject: []
  },
  ignores: {
    customGlobs: [
      'postcss.config.mjs',
      'drizzle.config.ts',
      'next.config.ts',
      'supabase/*'
    ]
  }
});
