"use strict";
// packages/ai/src/tools/BaseTool.ts
// ============================================================
// Base Tool
// Enforces capability gating and execution shape
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRIFTY_FILE_CONTRACT = exports.BaseTool = void 0;
var BaseTool = /** @class */ (function () {
    function BaseTool() {
    }
    BaseTool.prototype.requireCapability = function (ctx, capability) {
        if (!ctx.capabilities.includes(capability)) {
            return { outcome: 'rejected' };
        }
    };
    return BaseTool;
}());
exports.BaseTool = BaseTool;
exports.DRIFTY_FILE_CONTRACT = {
    driftyVersion: "1.0.0",
    layers: [DriftyLayer.L5_AI],
};
