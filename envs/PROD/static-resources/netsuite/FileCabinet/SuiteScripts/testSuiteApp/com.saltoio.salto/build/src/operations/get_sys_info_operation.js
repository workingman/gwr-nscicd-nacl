var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/file"], function (require, exports, file_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    file_1 = __importDefault(file_1);
    var MILLISECONDS_IN_MINUTE = 60000;
    var operation = {
        run: function () {
            var versionFile = file_1.default.load('../../../config/version.txt');
            var currentDate = new Date();
            return {
                time: currentDate.getTime() - currentDate.getTimezoneOffset() * MILLISECONDS_IN_MINUTE,
                appVersion: versionFile.getContents().split('.').map(function (num) { return parseInt(num, 10); }),
            };
        },
        getName: function () { return 'sysInfo'; },
    };
    exports.default = operation;
});
//# sourceMappingURL=get_sys_info_operation.js.map