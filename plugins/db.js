"use strict";

const fp = require("fastify-plugin");
const pgp = require('pg-promise')();

const appconfig = require("../config/appConfig");

module.exports = fp(async function (fastify, opts) {
    const db = pgp(appconfig.postgresURI);

    fastify.decorate('db', db);
});