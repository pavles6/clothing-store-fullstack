export const refreshTokenName = "refreshToken";

// Pending: Order is created but not yet shipped
// Completed: Order is shipped
// Cancelled: Order is cancelled
export const orderStatuses = ["PENDING", "COMPLETED", "CANCELED"] as const;

export const userRoles = ["ADMIN", "USER"] as const;

export type UserRole = (typeof userRoles)[number];

export type OrderStatus = (typeof orderStatuses)[number];
