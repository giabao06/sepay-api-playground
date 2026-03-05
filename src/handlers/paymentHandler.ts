import * as z from "zod";
import { PayloadObject } from "../types/SepayApiPayload";

export const handlePayment = async({ body }) => {
    const { data, error } = PayloadObject.safeParse(body);
        if (!error) {
            console.log(data);
            return({
                status: "success",
            })
        } else return error;
}