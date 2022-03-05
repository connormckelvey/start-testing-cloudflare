import * as testing from 'start-testing';
export declare class CloudflareLogger extends testing.Logger {
    new: () => CloudflareLogger;
    toJSON(): {
        logs: testing.LogEntry[];
    };
}
