import { LogicNamping2Settings } from "./params";
export declare class LogicNamping2Class {
    private _settings;
    private positions;
    private _marketPrice;
    private _totalProfit;
    private _badget;
    constructor(_settings: LogicNamping2Settings);
    set marketPrice(price: number);
    get marketPrice(): number;
    setPosition(price: number, size: number, id: string): void;
    clearPosition(clearPrice: number): void;
    updateBadget(badget: number): void;
    get totalProfit(): number;
    get profitRate(): number;
    get nampingPrice(): number;
    get nampingSize(): number;
    get nampingCap(): number;
    get totalSize(): number;
    get lossRate(): number;
    get marketCap(): number;
    get realCapIncludeNextNampingSize(): number;
    get realCap(): number;
    get averagePrice(): number;
    get limitPrice(): number;
}
