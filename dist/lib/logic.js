"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicNamping2Class = void 0;
const utils_general_1 = require("utils-general");
class LogicNamping2Class {
    constructor(_settings) {
        this._settings = _settings;
        this._marketPrice = 0;
        this._totalProfit = 0;
        this._badget = 0;
        this.positions = {};
        this._nampingCount = 0;
        this._nampingCountStatic = {};
        this._losscutCount = 0;
    }
    set marketPrice(price) {
        this._marketPrice = price;
    }
    get marketPrice() {
        return this._marketPrice;
    }
    setPosition(price, size, id) {
        if (this.positions[id]) {
            this.positions[id].id = id;
            this.positions[id].price = price;
            this.positions[id].size = size;
        }
        else {
            this.positions[id] = {
                id: id,
                price: price,
                size: size
            };
        }
        this._nampingCount++;
    }
    clearPosition(clearPrice, losscut) {
        for (const id of Object.keys(this.positions)) {
            const profit = (clearPrice - this.positions[id].price) * this.positions[id].size;
            this._totalProfit += profit;
        }
        if (!this._nampingCountStatic[this._nampingCount]) {
            this._nampingCountStatic[this._nampingCount] = {
                count: 1,
                volume: this.averagePrice * this.totalSize
            };
        }
        else {
            this._nampingCountStatic[this._nampingCount].count++;
        }
        this._nampingCount = 0;
        this.positions = {};
        if (losscut)
            this._losscutCount++;
    }
    updateBadget(badget) {
        this._badget = badget;
    }
    get totalProfit() {
        return this._totalProfit;
    }
    get profitRate() {
        return (this.marketCap - this.realCap) / this.realCap;
    }
    get nampingPrice() {
        return this.totalSize > 0 ? this.averagePrice * this._settings.nampingLowerRate : this.marketPrice;
    }
    get nampingSize() {
        let size = 0;
        if (this.realCap === 0)
            size = (this._badget / this._settings.initialSizeRate) / this.marketPrice;
        else
            size = (this.nampingCap - this._settings.nampingUpperRate * this.realCap) / ((this._settings.nampingUpperRate - 1) * this.nampingPrice);
        return (0, utils_general_1.floor)(size, this._settings.sizePrecision);
    }
    get nampingCap() {
        return this.totalSize * this.nampingPrice;
    }
    get totalSize() {
        let size = 0;
        for (const id of Object.keys(this.positions))
            size += this.positions[id].size;
        return size;
    }
    get lossRate() {
        return (this.marketCap - this.realCap) / this.realCap;
    }
    get marketCap() {
        return this.totalSize * this._marketPrice;
    }
    get realCapIncludeNextNampingSize() {
        return this.realCap + this._marketPrice * this.nampingSize;
    }
    get realCap() {
        let cap = 0;
        for (const id of Object.keys(this.positions))
            cap += this.positions[id].size * this.positions[id].price;
        return cap;
    }
    get averagePrice() {
        return this.realCap / this.totalSize;
    }
    get limitPrice() {
        return (0, utils_general_1.floor)(this.averagePrice * this._settings.profitRate, this._settings.pricePrecision);
    }
    get nampingCounts() {
        return this._nampingCountStatic;
    }
    get nampingCount() {
        return this._nampingCount;
    }
    get losscutCount() {
        return this._losscutCount;
    }
}
exports.LogicNamping2Class = LogicNamping2Class;
