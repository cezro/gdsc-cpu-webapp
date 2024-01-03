"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToEventForms = void 0;
const db_1 = __importDefault(require("../../db/database/db"));
function sendToEventForms(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `INSERT INTO event_forms (RVSP_code, event_id, user_id, date_time_submited) 
        VALUES ($1, $2, $3, $4)`;
            const data = [
                params.rvsp,
                params.event_id,
                params.user_id,
                params.date_time_submited,
            ];
            db_1.default.query(query, data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.sendToEventForms = sendToEventForms;
