export interface SystemMetadata {
  cpuUsage: number;
  memoryUsagePercentage: number;
  memoryUsed: number;
  memoryTotal: number;
  memoryAvailable: number;
  serverUptime: number;
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
    const SECONDS_IN_MINUTE: number = 60;
    const SECONDS_IN_HOUR: number = SECONDS_IN_MINUTE * 60;
    const SECONDS_IN_DAY: number = SECONDS_IN_HOUR * 24;
    // convert from milliseconds to seconds
    numberToFormat = Math.floor(numberToFormat / 1000);
    const days = Math.floor(numberToFormat / SECONDS_IN_DAY);
    numberToFormat -= days * SECONDS_IN_DAY;
    const hours = Math.floor(numberToFormat / SECONDS_IN_HOUR);
    numberToFormat -= hours * SECONDS_IN_HOUR;
    const minutes = Math.floor(numberToFormat / SECONDS_IN_MINUTE);
    numberToFormat -= minutes * SECONDS_IN_MINUTE;
    return days + " days, " + hours + " hours, " + minutes + " minutes, " + numberToFormat + " seconds.";
  }

}
