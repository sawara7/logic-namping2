import {
    floor
} from "utils-general"

import {
    NampingPosition,
    LogicNamping2Settings
} from "./params"

export class LogicNamping2Class {
    private positions: {[id: string]: NampingPosition}
    private _marketPrice: number
    private _totalProfit: number

    constructor(private _settings: LogicNamping2Settings) {
        this._marketPrice = 0
        this._totalProfit = 0
        this.positions = {}
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
    }

    clearPosition(clearPrice: number) {
        for (const id of Object.keys(this.positions)) this._totalProfit += (clearPrice - this.positions[id].price) * this.positions[id].size 
        this.positions = {}
    }

    get totalProfit(): number {
        return this._totalProfit
    }

    get profitRate(): number {
        return (this.marketCap - this.realCap)/this.realCap
    }

    get nampingSize(): number {
        let size = 0
        size = (this.marketCap - this._settings.nampingRate * this.realCap)/((this._settings.nampingRate - 1)*this._marketPrice)
        if (this.realCap === 0) return floor(this._settings.minSize, this._settings.sizePrecision)
        return floor(size, this._settings.sizePrecision)
    }

    get totalSize(): number {
        let size = 0
        for (const id of Object.keys(this.positions)) size += this.positions[id].size 
        return size
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
}