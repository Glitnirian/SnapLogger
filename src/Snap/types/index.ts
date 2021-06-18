export type SnapToStringMapper = (data: SnapToStringMapperData) => string;

export type SnapToStringMapperData = {
    snap: Map<string, any>
} & ISnapToStringData;

export interface ISnapToStringData {
    dateTime?: number
}

export type LogData = {
    //
} & ISnapToStringData;

export type SnapLoggerHandler = (snapStr: string) => void;

export interface ISnapEntryData {
    key: string,
    value: any
}
