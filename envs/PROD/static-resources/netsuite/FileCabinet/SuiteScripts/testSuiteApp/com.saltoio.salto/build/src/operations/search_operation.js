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
define(["require", "exports", "N/search", "ajv", "../validation"], function (require, exports, search, ajv_1, validation_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    search = __importStar(search);
    ajv_1 = __importDefault(ajv_1);
    var argsSchema = {
        type: 'object',
        properties: {
            type: { type: 'string' },
            columns: { type: 'array', items: { type: 'string' } },
            filters: { type: 'array',
                items: {
                    anyOf: [
                        { type: 'array', items: { type: 'string' } },
                        { type: 'string' },
                    ],
                } },
            offset: { type: 'number', minimum: 0 },
            limit: { type: 'number', minimum: 1 },
        },
        required: ['type', 'columns', 'filters', 'offset', 'limit'],
        additionalProperties: false,
    };
    var operation = {
        run: function (args) {
            var validator = new ajv_1.default({ allErrors: true });
            if (!validation_1.validateInput(validator, argsSchema, args)) {
                throw new Error("Invalid input: " + validator.errorsText());
            }
            var searchRunner = search.create({
                type: args.type,
                columns: args.columns,
                filters: args.filters,
            });
            var searchResult = searchRunner.run();
            var resultsBlock = searchResult.getRange({
                start: args.offset,
                end: args.offset + args.limit,
            });
            return resultsBlock.map(function (results) { return results.getAllValues(); });
        },
        getName: function () { return 'search'; },
    };
    exports.default = operation;
});
//# sourceMappingURL=search_operation.js.map