// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "../../../env/server.mjs";
import { appRouter } from "../../../server/router";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  onError: undefined,
});
