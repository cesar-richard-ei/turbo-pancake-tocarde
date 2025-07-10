import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/events", "routes/events.tsx"),
  route("/about", "routes/about.tsx"),
  route("/login", "routes/login.tsx"),
  route("/signup", "routes/signup.tsx"),
  route("/auth/callback", "routes/auth/callback.tsx"),
  route("/profile", "routes/profile.tsx"),
  route("/verify-email/:key", "routes/verify-email.tsx"),
  route("/reset-password/:key/:uid", "routes/reset-password.tsx"),
  route("/login-error", "routes/login-error.tsx"),
  route("/.well-known/*", "routes/well-known.tsx"),
  route("/version", "routes/version.tsx"),
] satisfies RouteConfig;
