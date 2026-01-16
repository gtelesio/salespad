"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiMockService = void 0;
const common_1 = require("@nestjs/common");
let AiMockService = class AiMockService {
    generateReply(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('price') || lowerInput.includes('cost')) {
            return 'Our pricing starts at $99/month. Would you like a demo?';
        }
        if (lowerInput.includes('demo')) {
            return 'I can schedule a demo for you tomorrow. What time works best?';
        }
        return 'Thanks for your message! A specialist will reach out shortly.';
    }
};
exports.AiMockService = AiMockService;
exports.AiMockService = AiMockService = __decorate([
    (0, common_1.Injectable)()
], AiMockService);
//# sourceMappingURL=ai-mock.service.js.map