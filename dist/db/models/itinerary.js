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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Itinerary = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const index_1 = require("./index");
let Itinerary = class Itinerary extends sequelize_typescript_1.Model {
};
exports.Itinerary = Itinerary;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Itinerary.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], Itinerary.prototype, "startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    }),
    __metadata("design:type", Date)
], Itinerary.prototype, "endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Itinerary.prototype, "cost", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Itinerary.prototype, "details", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Itinerary.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false
    }),
    __metadata("design:type", Boolean)
], Itinerary.prototype, "formed", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => index_1.Favorite),
    __metadata("design:type", Array)
], Itinerary.prototype, "favorites", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => index_1.Star),
    __metadata("design:type", Array)
], Itinerary.prototype, "star", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => index_1.Comment),
    __metadata("design:type", Array)
], Itinerary.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => index_1.Origin),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Itinerary.prototype, "originId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => index_1.Origin),
    __metadata("design:type", index_1.Origin)
], Itinerary.prototype, "origin", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => index_1.Country),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Itinerary.prototype, "countryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => index_1.Country),
    __metadata("design:type", index_1.Country)
], Itinerary.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => index_1.Agency),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Itinerary.prototype, "agencyId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => index_1.Agency),
    __metadata("design:type", index_1.Agency)
], Itinerary.prototype, "agency", void 0);
exports.Itinerary = Itinerary = __decorate([
    sequelize_typescript_1.Table
], Itinerary);
