"use strict";
// packages/ai/src/memory/BaseMemory.ts
// ============================================================
// Base Memory
// Defines lifecycle for derived AI state
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRIFTY_FILE_CONTRACT = exports.BaseMemory = void 0;
var BaseMemory = /** @class */ (function () {
    function BaseMemory() {
    }
    return BaseMemory;
}());
exports.BaseMemory = BaseMemory;
exports.DRIFTY_FILE_CONTRACT = {
    driftyVersion: "1.0.0",
    layers: [DriftyLayer.L5_AI],
};
