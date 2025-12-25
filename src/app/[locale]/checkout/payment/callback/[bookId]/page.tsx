"use client"

import { useParams } from "next/navigation";

export default function PaymentCallbackPage() {

    const { bookId } = useParams();

    console.log(bookId);

    return(
        <>

        </>
    );
}