export interface JwtPayload {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
  // TODO: Add role here and perform validations
}
