import { SnapToStringMapperData, ISnapEntryData } from '../types';

export function snapToStringDefaultMapperWithSpacing(data: any): string {
    return `\n${snapToStringDefaultMapper(data)}\n`;
}

export function snapToStringDefaultMapper(data: any): string {
    return `${snapToStringDefaultHeader(data)}\n${
        snapToStringDefaultMapBody(data)}`;
}

export function snapToStringDefaultHeader({
    dateTime
}: SnapToStringMapperData): string {
    let str = 'Snap ';
    if (dateTime) {
        str += `[at ${new Date(dateTime).toUTCString()}] `;
    }
    str += ':';
    return str;
}

export function snapToStringDefaultMapBody({
    snap
}: SnapToStringMapperData): string {
    let str = '';
    for (const [key, value] of snap.entries()) {
        str += `${snapToStringDefaultOneEntry({ key, value })}\n\n`;
    }
    return str;
}

export function snapToStringDefaultOneEntry({
    key,
    value
}: ISnapEntryData): string {
    let str = `${key}:`;

    if (value instanceof Object) {
        str += '\n=====\n';
        str += JSON.stringify(value, null, 4);
    } else {
        str += ` ${String(value)}`;
    }

    return str;
}

export function valueToStringDefault(val: any): string {
    if (val instanceof Object) {
        return JSON.stringify(val, null, 4);
    }

    return String(val);
}
