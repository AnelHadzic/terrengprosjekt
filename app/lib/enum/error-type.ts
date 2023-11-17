export enum ErrorEnum {
  // General
  Unknown = 0,
  Duplicate = 1,
  NotFound = 2,

  // Input
  TooLong = 3,
  InvalidInput = 4,
  MissingRequiredField = 5,

  // Auth
  AuthenticationFailed = 6,
  UnauthorizedAccess = 7,
}
