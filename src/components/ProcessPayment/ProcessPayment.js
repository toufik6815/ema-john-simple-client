import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitCardForm from "./SplitCardForm";

const stripePromise = loadStripe(
  "pk_test_51H7QFPIaYvFtTktIvUSycTyG317g7BcJAaD6fBkL5YOgqQPZGaEwheyZ75w8vOK6j3SRdWpbN8J1cKIQ7daYSeXK00IYuC9y1M"
);

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      {/* <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      /> */}

        <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        

        {/* <SplitCardForm></SplitCardForm> */}

    </Elements>
  );
};

export default ProcessPayment;
