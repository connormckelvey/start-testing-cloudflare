import * as testing from 'start-testing';
export declare type CloudflareContextJSON = {
    name: string;
    failed: boolean;
    errors: any[];
    exception?: Error;
    subContexts: CloudflareContextJSON[];
    logger: {
        logs: testing.LogEntry[];
    };
};
export declare class CloudflareContext extends testing.Context {
    new: (name: string) => CloudflareContext;
    protected toJSON(): CloudflareContextJSON;
}
