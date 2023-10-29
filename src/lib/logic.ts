import {
    floor
} from "utils-general"

import {
    NampingPosition,
    LogicNamping2Settings
} from "./params"

export interface NampingCount {
    count: number,
    volume: number
}

export class LogicNamping2Class {
    private positions: {[id: string]: NampingPosition}
    private _marketPrice: number
    private _totalProfit: number
    private _badget: number
    private _nampingCount: number
    private _nampingCountStatic: {[nampingCount: number]: NampingCount}
    private _losscutCount: number

    constructor(private _settings: LogicNamping2Settings) {
        this._marketPrice = 0
        this._totalProfit = 0
        this._badget = 0
        this.positions = {}
        this._nampingCount = 0
        this._nampingCountStatic = {}
        this._losscutCount = 0
    }

    set marketPrice(price: number) {
        this._marketPrice = price
    }

    get marketPrice(): number {
        return this._marketPrice
    }

    setPosition(price: number, size: number, id: string) {
        if (this.positions[id]) {
            this.positions[id].id = id
            this.positions[id].price = price
            this.positions[id].size = size
        } else {
            this.positions[id] = {
                id: id,
                price: price,
                size: size
            }
        }
        this._nampingCount++
    }

    clearPosition(clearPrice: number, losscut?: boolean) {
        for (const id of Object.keys(this.positions)) {
            const profit = (clearPrice - this.positions[id].price) * this.positions[id].size
            this._totalProfit += profit
        }
        if (!this._nampingCountStatic[this._nampingCount]) {
            this._nampingCountStatic[this._nampingCount] = {
                count: 1,
                volume: this.averagePrice * this.totalSize
            }
        } else {
            this._nampingCountStatic[this._nampingCount].count++
        }
        this._nampingCount = 0
        this.positions = {}
        this._losscutCount++
    }

    updateBadget(badget: number) {
        this._badget = badget
    }

    get totalProfit(): number {
        return this._totalProfit
    }

    get profitRate(): number {
        return (this.marketCap - this.realCap)/this.realCap
    }

    get nampingPrice(): number {
        return this.totalSize > 0 ? this.averagePrice * this._settings.nampingLowerRate: this.marketPrice
    }

    get nampingSize(): number {
        let size = 0
        if (this.realCap === 0) size = (this._badget/this._settings.initialSizeRate)/this.marketPrice
        else size = (this.nampingCap - this._settings.nampingUpperRate * this.realCap)/((this._settings.nampingUpperRate - 1)*this.nampingPrice)
        return floor(size, this._settings.sizePrecision)
    }

    get nampingCap(): number {
        return this.totalSize * this.nampingPrice
    }

    get totalSize(): number {
        let size = 0
        for (const id of Object.keys(this.positions)) size += this.positions[id].size 
        return size
    }

    get lossRate(): number {
        return (this.marketCap - this.realCap)/this.realCap
    }

    get marketCap(): number {
        return this.totalSize * this._marketPrice
    }

    get realCapIncludeNextNampingSize(): number {
        return this.realCap + this._marketPrice * this.nampingSize
    }

    get realCap(): number {
        let cap = 0
        for (const id of Object.keys(this.positions)) cap += this.positions[id].size * this.positions[id].price 
        return cap
    }

    get averagePrice(): number {
        return this.realCap/this.totalSize
    }

    get limitPrice(): number {
        return floor(this.averagePrice * this._settings.profitRate, this._settings.pricePrecision)
    }

    get nampingCounts(): {[nampingCount: number]: NampingCount} {
        return this._nampingCountStatic 
    }

    get nampingCount(): number {
        return this._nampingCount
    }

    get losscutCount(): number {
        return this._losscutCount
    }
}