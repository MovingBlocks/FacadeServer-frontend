export interface SystemMetadata {
    cpuUsage: number;
    memoryUsagePercentage: number;
    memoryUsed: number;
    memoryTotal: number;
    memoryAvailable: number;
    systemUptime: number;
}

export class SystemMetadataUtils {

    public static memoryStringFormat(numberToFormat: number) {
        // number of bytes in a terabyte, gigabyte, and megabyte.
        let result: string;
        if (numberToFormat >= 1099511627776) {
            result = (numberToFormat / 1099511627776).toPrecision(4).toString()  + "TB";
        } else if (numberToFormat >= 1073741824) {
            result = (numberToFormat / 1073741824).toPrecision(4).toString() + "GB";
        } else if (numberToFormat >= 1048576) {
            result = (numberToFormat / 1048576).toPrecision(4).toString() + "MB";
        } else {
            result = numberToFormat.toPrecision(6).toString();
        }
        return result;
    }

    public static systemUptimeFormat(numberToFormat: number) {
        // number of seconds in a day, hour, minute
        const days = Math.floor(numberToFormat / 86400);
        numberToFormat -= days * 86400;
        const hours = Math.floor(numberToFormat / 3600);
        numberToFormat -= hours * 3600;
        const minutes = Math.floor(numberToFormat / 60);
        numberToFormat -= minutes * 60;
        return "days: " + days + " hours: " + hours + " minutes: " + minutes + " seconds: " + numberToFormat;
    }

}
