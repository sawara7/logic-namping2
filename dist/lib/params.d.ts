export interface LogicNamping2Settings {
    pair: string;
    asset: string;
    initialSizeRate: number;
    profitRate: number;
    pricePrecision: number;
    sizePrecision: number;
    minSize: number;
    nampingUpperRate: number;
    nampingLowerRate: number;
}
export interface NampingPosition {
    id: string;
    price: number;
    size: number;
}
