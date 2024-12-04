/**
 *@NApiVersion 2.x
 *@NAmdConfig ../../config/amdconfig.json
 *@NScriptType Restlet
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/runtime", "ajv", "./operations/get_sys_info_operation", "./operations/search_operation", "./operations/read_file_operation", "./operations/config_operation", "./operations/list_bundles_operation", "./salto_auth", "./validation"], function (require, exports, runtime_1, ajv_1, get_sys_info_operation_1, search_operation_1, read_file_operation_1, config_operation_1, list_bundles_operation_1, salto_auth_1, validation_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.post = void 0;
    runtime_1 = __importDefault(runtime_1);
    ajv_1 = __importDefault(ajv_1);
    get_sys_info_operation_1 = __importDefault(get_sys_info_operation_1);
    search_operation_1 = __importDefault(search_operation_1);
    read_file_operation_1 = __importDefault(read_file_operation_1);
    config_operation_1 = __importDefault(config_operation_1);
    list_bundles_operation_1 = __importDefault(list_bundles_operation_1);
    var OPERATIONS = [
        get_sys_info_operation_1.default,
        search_operation_1.default,
        read_file_operation_1.default,
        config_operation_1.default,
        list_bundles_operation_1.default,
    ];
    var NO_AUTH_INPUT_SCHEMA = {
        type: 'object',
        properties: {
            operation: { type: 'string' },
            args: { type: 'object' },
        },
        required: ['operation', 'args'],
        additionalProperties: false,
    };
    var INPUT_SCHEMA = __assign(__assign({}, NO_AUTH_INPUT_SCHEMA), { properties: __assign(__assign({}, NO_AUTH_INPUT_SCHEMA.properties), { activationKey: { type: 'string' } }), required: NO_AUTH_INPUT_SCHEMA.required.concat('activationKey') });
    var runOperation = function (input) {
        var chosenOperation = OPERATIONS.filter(function (operation) { return operation.getName() === input.operation; })[0];
        if (chosenOperation === undefined) {
            return { status: 'error', message: "Operation " + input.operation + " does not exists" };
        }
        try {
            var results = chosenOperation.run(input.args);
            return { status: 'success', results: results };
        }
        catch (e) {
            return { status: 'error', message: "Got error from " + input.operation + " operation", error: e };
        }
    };
    exports.post = function (input) {
        var validator = new ajv_1.default({ allErrors: true });
        if (validation_1.validateInput(validator, NO_AUTH_INPUT_SCHEMA, input)
            && input.operation === get_sys_info_operation_1.default.getName()) {
            return runOperation(input);
        }
        if (!validation_1.validateInput(validator, INPUT_SCHEMA, input)) {
            return { status: 'error', message: "Invalid input: " + validator.errorsText() };
        }
        var verificationResult = salto_auth_1.verifySignature(runtime_1.default.accountId, input.activationKey);
        if (verificationResult.isVerified === false) {
            return { status: 'error', message: "User " + runtime_1.default.accountId + " Unauthorized - Invalid Activation Key", error: verificationResult.error };
        }
        return runOperation(input);
    };
});
//# sourceMappingURL=salto_restlet.js.map