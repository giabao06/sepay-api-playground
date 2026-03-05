import { Elysia } from "elysia";
import { handlePayment } from "./handlers/paymentHandler";
import { PayloadObject } from "./types/SepayApiPayload";

const app =
    new Elysia()
        .onError(({ error }) => {
            console.log(error.toString());
            return {
                status: "failed",
                error: error
            }
        })
        .get("/", () => "welcome to maimai?")
        .post('/new-payment', handlePayment, {
            body: PayloadObject
        })
        .listen(7272);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
