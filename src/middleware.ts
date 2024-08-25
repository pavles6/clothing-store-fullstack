import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const protectedRoutes: {
  [key: string]: { method: { [key: string]: string[] } };
} = {
  "/order/api": {
    method: {
      POST: ["USER", "ADMIN"],
      GET: ["ADMIN"],
    },
  },
  "/order/status/api": {
    method: {
      PATCH: ["ADMIN"],
      GET: ["ADMIN"],
    },
  },
};

const protectedRoutesList = Object.keys(protectedRoutes);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    protectedRoutesList.includes(pathname) &&
    Object.keys(protectedRoutes[pathname].method).includes(request.method)
  ) {
    const role = protectedRoutes[pathname].method[request.method];

    if (request.headers.get("Authorization")) {
      const token = request.headers.get("Authorization")!.split(" ")[1];

      const decoded = jwt.decode(token) as JwtPayload;

      if (!role.includes(decoded.role)) {
        return Response.json({ message: "Forbidden" }, { status: 403 });
      }
    } else {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
}
