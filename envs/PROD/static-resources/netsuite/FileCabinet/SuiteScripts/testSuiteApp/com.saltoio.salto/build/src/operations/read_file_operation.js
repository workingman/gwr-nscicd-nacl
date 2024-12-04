var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/file", "ajv", "../validation"], function (require, exports, file_1, ajv_1, validation_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    file_1 = __importDefault(file_1);
    ajv_1 = __importDefault(ajv_1);
    var argsSchema = {
        properties: {
            ids: {
                items: {
                    type: 'number',
                },
                type: 'array',
            },
        },
        required: ['ids'],
    };
    var operation = {
        run: function (args) {
            var validator = new ajv_1.default({ allErrors: true });
            if (!validation_1.validateInput(validator, argsSchema, args)) {
                throw new Error("Invalid input: " + validator.errorsText());
            }
            return args.ids.map(function (id) {
                try {
                    var loadedFile = file_1.default.load({ id: id });
                    return { status: 'success', content: loadedFile.getContents(), type: loadedFile.fileType };
                }
                catch (error) {
                    return { status: 'error', error: error };
                }
            });
        },
        getName: function () { return 'readFile'; },
    };
    exports.default = operation;
});
//# sourceMappingURL=read_file_operation.js.map