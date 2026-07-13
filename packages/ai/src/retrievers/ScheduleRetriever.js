"use strict";
// ============================================================
// packages/ai/src/retrievers/ScheduleRetriever.ts
// Technician schedule retrieval (JSONB visits projection)
// ============================================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRetriever = exports.DRIFTY_FILE_CONTRACT_SYMBOL = void 0;
var ScheduleService_1 = require("@fsm/core/services/ScheduleService");
var BaseRetriever_1 = require("./BaseRetriever");
var module_1 = require();
exports.DRIFTY_FILE_CONTRACT_SYMBOL = module_1.DRIFTY_FILE_DECLARATION_SYMBOL;
var ScheduleRetriever = /** @class */ (function (_super) {
    __extends(ScheduleRetriever, _super);
    function ScheduleRetriever(prisma) {
        var _this = _super.call(this) || this;
        _this.name = 'schedule-retriever';
        _this.version = 2;
        _this.schedule = new ScheduleService_1.ScheduleService(prisma);
        return _this;
    }
    ScheduleRetriever.prototype.perform = function (ctx, input) {
        return __awaiter(this, void 0, void 0, function () {
            var from, to, rows, items;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!ctx.companyId) {
                            return [2 /*return*/, this.reject('FORBIDDEN_SCOPE', 'Missing company scope')];
                        }
                        from = (_a = input.from) !== null && _a !== void 0 ? _a : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                        to = (_b = input.to) !== null && _b !== void 0 ? _b : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, this.schedule.listVisitsInRange(ctx, {
                                from: from,
                                to: to,
                                technicianId: input.technicianId,
                                limit: (_c = input.limit) !== null && _c !== void 0 ? _c : 50,
                            })];
                    case 1:
                        rows = _d.sent();
                        if (!rows.length) {
                            return [2 /*return*/, {
                                    outcome: 'success',
                                    code: 'NO_RESULTS',
                                    reason: 'No scheduled visits found',
                                    items: [],
                                    meta: { version: this.version },
                                }];
                        }
                        items = rows.map(function (v) { return ({
                            id: v.id,
                            source: 'jobs.data.visits',
                            data: {
                                jobId: v.jobId,
                                technicianId: v.technicianId,
                                startTime: v.scheduledStart,
                                endTime: v.scheduledEnd,
                                summary: v.title,
                                customerName: v.customerName,
                            },
                        }); });
                        return [2 /*return*/, {
                                outcome: 'success',
                                code: 'OK',
                                reason: 'Schedule retrieved',
                                items: items,
                                meta: {
                                    version: this.version,
                                    examinedCount: rows.length,
                                    sources: ['job.data.visits'],
                                },
                            }];
                }
            });
        });
    };
    return ScheduleRetriever;
}(BaseRetriever_1.BaseRetriever));
exports.ScheduleRetriever = ScheduleRetriever;
