import * as z from "zod";
import { PayloadObject } from "../types/SepayApiPayload";
import { sendToDiscord } from "../postActions/sendToDiscord";

export const handlePayment = async({ body }) => {
    const { data, error } = PayloadObject.safeParse(body);
        if (!error) {
            await sendToDiscord(data).then((result) => {
                if (!result || !result.ok) {
                    console.log(`Error sending discord webhook`);
                    return ({
                        status: "failed",
                        message: "Sending Discord webhook failed"
                    })
                }
            });
            return({
                status: "success",
            })
        } else return error;
}