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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/config", "ajv", "../validation"], function (require, exports, config, ajv_1, validation_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    config = __importStar(config);
    ajv_1 = __importDefault(ajv_1);
    var argsSchema = {
        anyOf: [
            {
                type: 'object',
                properties: {
                    action: { const: 'get' },
                    types: {
                        items: {
                            type: 'string',
                        },
                        type: 'array',
                    },
                },
                required: ['action', 'types'],
            },
            {
                type: 'object',
                properties: {
                    action: { const: 'set' },
                    types: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                configType: { type: 'string' },
                                items: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            fieldId: { type: 'string' },
                                        },
                                        required: ['fieldId', 'value'],
                                    },
                                },
                            },
                            required: ['configType', 'items'],
                        },
                    },
                },
                required: ['action', 'types'],
            },
        ],
    };
    var getSelectOptions = function (field) {
        try {
            return field.getSelectOptions();
        }
        catch (_a) {
            return [];
        }
    };
    var getTypes = function (types) {
        var results = [];
        var errors = [];
        types.forEach(function (configType) {
            try {
                var record_1 = config.load({
                    type: config.Type[configType],
                    isDynamic: true,
                });
                results.push({
                    configType: configType,
                    fieldsDef: record_1.getFields().map(function (fieldId) {
                        var field = record_1.getField({ fieldId: fieldId });
                        if (!field) {
                            return { id: fieldId, label: '', type: 'never', selectOptions: [] };
                        }
                        return __assign(__assign({}, field.toJSON()), { selectOptions: getSelectOptions(field) });
                    }),
                    data: record_1.toJSON(),
                });
            }
            catch (error) {
                errors.push({ configType: configType, error: error });
            }
        });
        return { results: results, errors: errors };
    };
    var setTypes = function (types) {
        var results = [];
        types.forEach(function (_a) {
            var configType = _a.configType, items = _a.items;
            try {
                var record_2 = config.load({ type: config.Type[configType] });
                items.forEach(function (item) { return record_2.setValue(item); });
                record_2.save();
                results.push({ configType: configType, status: 'success' });
            }
            catch (e) {
                results.push({ configType: configType, status: 'fail', errorMessage: e.message });
            }
        });
        return results;
    };
    var isGetAction = function (args) {
        return args.action === 'get';
    };
    var operation = {
        run: function (args) {
            var validator = new ajv_1.default({ allErrors: true });
            if (!validation_1.validateInput(validator, argsSchema, args)) {
                throw new Error("Invalid input: " + validator.errorsText());
            }
            if (isGetAction(args)) {
                return getTypes(args.types);
            }
            return setTypes(args.types);
        },
        getName: function () { return 'config'; },
    };
    exports.default = operation;
});
//# sourceMappingURL=config_operation.js.map