// src/server/router/index.ts
import { t } from "../trpc";
import { productRouter } from "./product";
import { userRouter } from "./user";

export const appRouter = t.router({
  product:productRouter,
  user:userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
