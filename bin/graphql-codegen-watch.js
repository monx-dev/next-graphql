#!/usr/bin/env node

'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
const cli = require('@graphql-codegen/cli');

const { codegenConfig } = require('./codegenConfig');

cli.generate({ ...codegenConfig, watch: true }, true);
