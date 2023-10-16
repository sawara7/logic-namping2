"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logic_1 = require("./logic");
const setting = {
    profitRate: 1.01,
    pricePrecision: 1,
    sizePrecision: 4,
    minSize: 0.0001,
    nampingUpperRate: 0.995,
    nampingLowerRate: 0.99
};
const logic = new logic_1.LogicNamping2Class(setting);
logic.marketPrice = 70;
for (let i = 0; i < 100; i++) {
    logic.marketPrice = logic.marketPrice - 0.1 * i;
    if (logic.realCapIncludeNextNampingSize > 100000)
        break;
    if (logic.nampingSize > 0)
        logic.setPosition(logic.marketPrice, logic.nampingSize, i.toString());
}
console.log(logic.marketCap, logic.realCap, logic.nampingSize, logic.averagePrice, logic.totalSize, logic.totalProfit);
logic.clearPosition(logic.limitPrice);
console.log(logic.totalProfit);
