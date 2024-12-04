define(["require", "exports", "jsrsasign"], function (require, exports, jsrsasign_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verifySignature = void 0;
    var PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAza1llGw9j0b222myCaJ6\n/UMP+uRsx4/21Am4VRb9dqYneCO1JI2aAa/UhkKGZacLvqupwAidks2dpT9ma9DI\nL8GvaQ/ESzo4Hs6Ys7nIctEeCgvKIVg+6E/ybYkGvF9EXhaJaa0BebeuPnJ7F07j\nlKCFkW6aVNY0e1417I4Ty8N8Br3scbI3hXV0EwJesk+P+pjhoiCMIQdPY2pWg7w+\nxCMm49hl5AeBDosBHHHlsFfDb6zMZsrdYJawT5ihnxSzx8HeEugsBhyEOtgbpHOD\ncfcq9yihR6nwlA4aWfKW2Tq1eoopbsM7EOob4lwbxcSlnjxruDocbsTaa/IkcinK\nWwIDAQAB\n-----END PUBLIC KEY-----";
    exports.verifySignature = function (input, signature) {
        try {
            var pubKey = jsrsasign_1.KEYUTIL.getKey(PUBLIC_KEY);
            var result = pubKey.verify(input, signature);
            // RSAKey.verify from the TS package returns 1/0 but jsrsasign-all-min.js returns True/False
            // so Boolean(result) should work for both of them
            return { isVerified: Boolean(result) };
        }
        catch (error) {
            return { isVerified: false, error: error };
        }
    };
});
//# sourceMappingURL=salto_auth.js.map