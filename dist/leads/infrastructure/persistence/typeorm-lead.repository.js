"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmLeadRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("../../domain/entities/event.entity");
const lead_entity_1 = require("../../domain/entities/lead.entity");
let TypeOrmLeadRepository = class TypeOrmLeadRepository {
    leadRepo;
    eventRepo;
    constructor(leadRepo, eventRepo) {
        this.leadRepo = leadRepo;
        this.eventRepo = eventRepo;
    }
    async save(lead) {
        return this.leadRepo.save(lead);
    }
    async findById(id) {
        return this.leadRepo.findOne({
            where: { id },
            relations: ['events'],
            order: {
                events: {
                    timestamp: 'ASC',
                },
            },
        });
    }
    async saveEvent(event) {
        return this.eventRepo.save(event);
    }
    async updateStatus(id, status) {
        await this.leadRepo.update(id, { status: status });
    }
};
exports.TypeOrmLeadRepository = TypeOrmLeadRepository;
exports.TypeOrmLeadRepository = TypeOrmLeadRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lead_entity_1.Lead)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [Function, Function])
], TypeOrmLeadRepository);
//# sourceMappingURL=typeorm-lead.repository.js.map