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
        const BYTES_IN_KILOBYTE: number = 1000;
        const BYTES_IN_MEGABYTE: number = BYTES_IN_KILOBYTE * 1000;
        const BYTES_IN_GIGABYTE: number = BYTES_IN_MEGABYTE * 1000;
        const BYTES_IN_TERABYTE: number = BYTES_IN_GIGABYTE * 1000;
        let result: string;
        if (numberToFormat >= BYTES_IN_TERABYTE) {
            result = (numberToFormat / BYTES_IN_TERABYTE).toPrecision(4).toString()  + "TB";
        } else if (numberToFormat >= BYTES_IN_GIGABYTE) {
            result = (numberToFormat / BYTES_IN_GIGABYTE).toPrecision(4).toString() + "GB";
        } else if (numberToFormat >= BYTES_IN_MEGABYTE) {
            result = (numberToFormat / BYTES_IN_MEGABYTE).toPrecision(4).toString() + "MB";
        } else if (numberToFormat >= BYTES_IN_KILOBYTE) {
            result = (numberToFormat / BYTES_IN_KILOBYTE).toPrecision(4).toString() + "KB";
        } else {
            result = numberToFormat.toPrecision(4).toString();
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
        return days + " days, " + hours + " hours, " + minutes + " minutes, " + numberToFormat + " seconds.";
    }

}
