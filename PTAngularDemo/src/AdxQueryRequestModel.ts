

export interface AdxQueryRequestModel {
    holeLookupKey: HoleLookupKey;
    queryParams: AdxQueryParams;
}

export interface HoleLookupKey {
  holeId: number;
  fileConfigLookupKey: FileConfigLookupKey;
}

export interface FileConfigLookupKey {
  loggingFileType: LoggingFileType;
  secondaryType: FileLookupType;
  secondaryValue: number;
}

export interface AdxQueryParams {
  interval: number;
  isDepthAxis: boolean;
  numOfPoints: number;
}

export enum FileLookupType {
  DrillId = 0,
  HoleId = 1,
}

export enum LoggingFileType {
  Instrumentation = 0,
  Geological = 1,
  Geomechanics = 2
}

export interface AdxQueryResponse {
  tableName?: string;
  data: { [key: string]: any }[];
}
