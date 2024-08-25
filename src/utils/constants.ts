export const refreshTokenName = "refreshToken";

// Pending: Order is created but not yet shipped
// Completed: Order is shipped
// Cancelled: Order is cancelled
export const orderStatuses = ["PENDING", "COMPLETED", "CANCELED"] as const;

export const userRoles = ["ADMIN", "USER"] as const;

export const ACCESS_TOKEN_EXPIRATION = "10m";

export const REFRESH_TOKEN_EXPIRATION = "7d";

export const REFRESH_TOKEN_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 7;

export type UserRole = (typeof userRoles)[number];

export type OrderStatus = (typeof orderStatuses)[number];
