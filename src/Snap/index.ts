import { snapToStringDefaultMapperWithSpacing } from './snapToString';
import {
 SnapToStringMapper, SnapLoggerHandler, ISnapToStringData, LogData
} from './types';

export * from './types';

export interface IOptions {
    snapToStringMapper?: SnapToStringMapper,
    logger?: SnapLoggerHandler
}

export class Snap {
    public snapMap: Map<string, any>;
    private _snapToStringMapper: SnapToStringMapper;
    private _logger: SnapLoggerHandler;

    constructor(options: IOptions) {
        this._snapToStringMapper = options.snapToStringMapper ||
            snapToStringDefaultMapperWithSpacing;
        this._logger = options.logger || console.log.bind(console);
        this.snapMap = new Map();
    }

    public set(key: string, val: any): this {
        this.snapMap.set(key, val);
        return this;
    }

    public toString({
        dateTime
    }: ISnapToStringData): string {
        return this._snapToStringMapper({
            snap: this.snapMap,
            dateTime
        });
    }

    public log({
        dateTime
    }: LogData): this {
        this._logger(
            this._snapToStringMapper({
                snap: this.snapMap,
                dateTime
            })
        );

        return this;
    }
}
