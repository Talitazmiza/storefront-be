const Joi = require("joi");

const RolesPayloadSchema = Joi.object({

    name: Joi.string()
        .required(),
});

module.exports = { RolesPayloadSchema };