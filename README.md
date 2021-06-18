# SnapLogger

A snap per time logger! And notifier! Or snap hooker! Make snap to be taken at interval! And take action on! Can be used for snap logging! Or notifying! Or Snap action!

Default snap string message is provided too! For a verbose snap representation!

The helpers methods can be used separately to choose and customize the outcome!

## Signature

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
const stringBatchNotifier = getStringBatchNotifier({
    notifSysOptions,
    stringBatcherOptions
});

const snapLogger = new SnapLogger({
    ...snapLoggerOptions,
    logger: function snapLoggerLogger(message: string) {
        stringBatchNotifier(message);
    }
});
```

Usage:

```ts

```

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
