export interface SystemMetadata {
  cpuUsage: number;
  memoryUsed: number;
  memoryMax: number;
  serverUptime: number;
  jvmMemoryUsed: number;
  jvmMemoryMax: number;
}

export class SystemMetadataUtils {

  public static memoryStringFormat(numberToFormat: number) {
    const BYTES_IN_KIBIBYTE: number = 1024;
    const BYTES_IN_MEBIBYTE: number = BYTES_IN_KIBIBYTE * 1024;
    const BYTES_IN_GIBIBYTE: number = BYTES_IN_MEBIBYTE * 1024;
    const BYTES_IN_TEBIBYTE: number = BYTES_IN_GIBIBYTE * 1024;
    let result: string;
    if (numberToFormat >= BYTES_IN_TEBIBYTE) {
      result = (numberToFormat / BYTES_IN_TEBIBYTE).toPrecision(4).toString()  + "TiB";
    } else if (numberToFormat >= BYTES_IN_GIBIBYTE) {
      result = (numberToFormat / BYTES_IN_GIBIBYTE).toPrecision(4).toString() + "GiB";
    } else if (numberToFormat >= BYTES_IN_MEBIBYTE) {
      result = (numberToFormat / BYTES_IN_MEBIBYTE).toPrecision(4).toString() + "MiB";
    } else if (numberToFormat >= BYTES_IN_KIBIBYTE) {
      result = (numberToFormat / BYTES_IN_KIBIBYTE).toPrecision(4).toString() + "KiB";
    } else {
      result = numberToFormat.toPrecision(4).toString();
    }
    return result;
  }

  public static serverUptimeFormat(numberToFormat: number) {
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
