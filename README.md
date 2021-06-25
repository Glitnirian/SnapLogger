# SnapLogger

A snap per time logger! And notifier! Or snap hooker! Make snap to be taken at interval! And take action on! Can be used for snap logging! Or notifying! Or Snap action!

That you want to log to console at interval! Or to a telegram group! Or any other system! Taking a snapshot of a state of elements each time and have it processed and logged! SnapLogger is all about this!
You set the snap values! As the program is running! Then automatically when the snap change and the interval period is reached a logging (processing) takes place! A snapLogger (or snap Processor)!

For snap output and string representation! Default snap string message helpers are provided too! For a verbose snap representation! To be used within the snapToString mapper!

The helpers methods can be used separately to choose and customize the outcome!

**To note the snap will log (process)**! Only when the snap is changed! And only when the timeout is reached! So if we change (set()) the snap! Nothing will happen till the timeout is reached! And the logging will happen (process)! If the timeout (interval)! Is reached but no change happen to the snap! No logging will happen!

## Signature

### Construction

```ts
export interface IOptions {
    intervalTime?: number;
    snapToStringMapper?: SnapToStringMapper;
    logger?: SnapLoggerHandler;
}

export declare type SnapToStringMapper = (data: SnapToStringMapperData) => string;


export declare type SnapToStringMapperData = {
    snap: Map<string, any>;
    dateTime?: number;
}

export declare type SnapLoggerHandler = (snapStr: string) => void;
```

### Properties

```ts
public snap: Snap;
```

### Methods

```ts
public set(key: string, val: any): this
```

Set a snap value! With this we can set the element and there values to have in the snap! it follow the key value pattern!

```ts
public getSnapMap(): Map<string, any>
```

Get the Snap mapping (Map object)!

```ts
public log(data?: ILogData): this

export interface ILogData {
    dateTime?: number
}
```

Manual force Log of the snapshot!

```ts
public start(data?: IStartData): this

export interface IStartData {
    logImmediately?: boolean,
    logImmediatelyOptions?: ILogData
}
```

Start the SnapLogger! To run and log at the interval set in the settings! And With option to log log Immediately at this start!

```ts
public stop(
  stopState: ERunningState.CompletelyStopped | ERunningState.LoggingOnlyStopped = ERunningState.LoggingOnlyStopped
): this

export enum ERunningState {
    Running = 1,
    CompletelyStopped = 2,
    LoggingOnlyStopped = 3
}
```

Stop the snap logger from running!

There is two modes! Stopping only logging where the set of snap will keep running! And that's the default state and mode if nothing is provided!

Second mode no logging and no writing to snap! (`ERunningState.
CompletelySopped`).

You may choose the second mode! When you don't need to keep the value of the snap while not logging! And that save the writing operation from happening! Which can be better for the process! (Writing to map + interval (setInterval() running))

### Example

Construction

```ts
const snapLogger = new SnapLogger({
    intervalTime: 5 * 60e3,
    // logging or processing
    logger: async function snapLoggerLogger(message: string) {
        // message here is the result of the snap to string mapping

        // Processing go 

        await stringBatchNotifier(message);
        // here: Sending notification to a telegram group or some logging system (You may like to check the StringBatcher package too)
    },
    // snap to string mapper (return string from a snap)
    snapToStringMapper: function notifSnapLoggerToStringMapper(data) {
        const {
            snap,
            dateTime
        } = data;

        const candle: ICandle = snap.get('candle');
        const candleOpenTime: any = candle?.openTime;

        // return String constructed from the snap!
        return `${`\n\n Bot snap [Time: ${candleOpenTime ? new Date(candleOpenTime).toUTCString() : '\\'}] [Now: ${new Date(dateTime).toUTCString()}]:\n`
            + '=============================================================================\n'}${
            // one of the snapToString helpers
            snapToStringDefaultMapBody(data)}`;
    }
});
```

Usage:

```ts
// __________ setting the snap

bot.on('beforeCandleProcess', ({
    candle
}) => {
    // settings a snap value
    telegramSnapBeatNotifier.snapLogger.set('candle', getHumanReadableCandle({ candle }));
});

bot.on('buySessionFinished', (finishData) => {
    // settings a snap value
    telegramSnapBeatNotifier.snapLogger.set('buySessionFinished', finishData);
});

// __________________ Starting the snap logger
/*
The snap logger will start counting check timeout! (interval)! And processing
*/
telegramSnapBeatNotifier.snapLogger.start();
```

Snap to string mapping and helpers

```ts
`${`\n\n Bot snap [Time: ${candleOpenTime ? new Date(candleOpenTime).toUTCString() : '\\'}] [Now: ${new Date(dateTime).toUTCString()}]:\n`
+ '=============================================================================\n'}${
// one of the snapToString helpers
snapToStringDefaultMapBody(data)}`
```

Will output:

```
Bot snap [Time: Mon, 19 Jan 1970 19:11:15 GMT] [Now: Mon, 21 Jun 2021 11:31:13 GMT]:
=============================================================================
candle:
=====
{
    "pair": "EURUSD",
    "interval": 300,
    "openTime": "Mon, 19 Jan 1970 19:11:15 GMT",
    "closeTime": "Mon, 19 Jan 1970 19:11:15 GMT",
    "open": 1.18939,
    "close": 1.18959,
    "high": 1.18959,
    "low": 1.18931,
    "volume": 118
}

buySessionFinished:
=====
{
    "order": {
        "id": 1247438523,
        "pair": "EURUSD",
        "type": "sell",
        "amount": 104.03858217990258
    },
    sessionInfo: {
        profit: 10
    }
}
```

You can see how `snapToStringDefaultMapBody(data)` helper help output the snap!

## Snap class

### Signature

#### Constructor

```ts
export interface IOptions {
    snapToStringMapper?: SnapToStringMapper,
    logger?: SnapLoggerHandler
}

export type SnapToStringMapper = (data: SnapToStringMapperData) => string;

export type SnapToStringMapperData = {
    snap: Map<string, any>
} & ISnapToStringData;

export type SnapLoggerHandler = (snapStr: string) => void;
```

#### Properties

```ts
public snapMap: Map<string, any>;
```

#### Methods

```ts
public set(key: string, val: any): this
```

```ts
public toString({
    dateTime
}: ISnapToStringData): string
```

```ts
public log({
  dateTime
}: LogData): this

interface LogData {
  dateTime?: number
}
```

## String message helpers
