export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/setup", "/learn", "/api/generate", "/api/upload", "/api/feedback"]
};
