define(["require", "exports", "N/suiteAppInfo"], function (require, exports, suiteAppInfo_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var operation = {
        run: function () { return suiteAppInfo_1.listInstalledBundles(); },
        getName: function () { return 'listBundles'; },
    };
    exports.default = operation;
});
//# sourceMappingURL=list_bundles_operation.js.map