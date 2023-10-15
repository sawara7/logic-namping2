export interface LogicNamping2Settings {
    profitRate: number
    pricePrecision: number
    sizePrecision: number
    minSize: number
    nampingRate: number
}

export interface NampingPosition {
    id: string
    price: number
    size: number
}