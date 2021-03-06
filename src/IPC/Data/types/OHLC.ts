export type OHLC = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number; // Tick volume, since this is Forex
}

export enum OHLCEnum {
    TIME, OPEN, HIGH, LOW, CLOSE, VOLUME
}
