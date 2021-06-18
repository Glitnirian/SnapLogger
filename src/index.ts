import { Snap, IOptions as ISnapOptions } from './Snap';

export interface IOptions extends ISnapOptions {
    intervalTime?: number
}

export enum ERunningState {
    Running = 1,
    CompletelyStopped = 2,
    LoggingOnlyStopped = 3
}

export interface IStartData {
    logImmediately?: boolean,
    logImmediatelyOptions?: ILogData
}

export interface ILogData {
    dateTime?: number
}

export class SnapLogger {
    public snap: Snap;
    private _timeIntervalHandler: any;
    private _intervalTime: number;
    private _runningState: ERunningState = ERunningState.LoggingOnlyStopped;
    private _isAnythingSet = false;

    constructor(options: IOptions) {
        this._intervalTime = options.intervalTime || 30e3;
        this.snap = new Snap(options as ISnapOptions);
    }

    public set(key: string, val: any): this {
        if (this._runningState !== ERunningState.CompletelyStopped) {
            this._isAnythingSet = true;
            this.snap.set(key, val);
        }

        return this;
    }

    public getSnapMap(): Map<string, any> {
        return this.snap.snapMap;
    }

    public log(data?: ILogData): this {
        this._isAnythingSet = false;
        this.snap.log({
            dateTime: data && data.dateTime
        });

        return this;
    }

    /**
     * Start the SnapLogger! Both setting to the snapshot is open and Logging
     *
     * @returns {this}
     * @memberof SnapLogger
     */
    public start(data?: IStartData): this {
        this._runningState = ERunningState.Running;

        // _____________ starting logging interval listener
        this._timeIntervalHandler = setInterval(() => {
            if (this._isAnythingSet) {
                this.log({
                    dateTime: Date.now()
                });
            }
        }, this._intervalTime);

        // _____________ Logging immediately
        if (data && data.logImmediately) {
            this.log(data.logImmediatelyOptions);
        }

        return this;
    }

    /**
     * Stop the SnapLogger! Defaulting to stopping only logging (not locking the set to snap)!
     *
     * If it makes sense to you! To not write to the snap! You can set stopState to ERunningState.
     * CompletelySopped! That will allow better performance (writes to map skipped!)
     * (The value of this depends of your app!)
     *
     * @param {ERunningState} [stopState=ERunningState.LoggingOnlyStopped]
     * @returns {this}
     * @memberof SnapLogger
     */
     public stop(
        stopState: ERunningState.CompletelyStopped | ERunningState.LoggingOnlyStopped = ERunningState.LoggingOnlyStopped
    ): this {
        this._runningState = stopState;
        clearInterval(this._timeIntervalHandler);
        return this;
    }
}
