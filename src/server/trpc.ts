import { initTRPC } from "@trpc/server";
import superjson from 'superjson';
import { ZodError } from "zod";

export const t = initTRPC
    .create({
        errorFormatter({ shape, error }) {
            return {
                ...shape,
                data: {
                    ...shape.data,
                    zodError:
                        error.code === "BAD_REQUEST" &&
                        error.cause instanceof ZodError
                            ? error.cause.flatten()
                            : null,
                },
            };
        },
        transformer: superjson,
    })