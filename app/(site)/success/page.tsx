"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { runConfetti } from "@/libs/confetti";
import { useAuth } from "@clerk/nextjs";
import removeAllItems from "../../server/removeAllItems";
import { useStateContext } from "../../context/StateContext";

const Success = () => {
  const { userId } = useAuth();
  const { setQty } = useStateContext();

  useEffect(() => {
    runConfetti();
    if (userId) {
      removeAllItems(userId);
    } else {
      setQty(0);
    }
  }, [userId, setQty]);

  return (
    <div className="success-wrapper -mt-12">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:xsova113@gmail.com">
            xsova113@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="w-[300px] btn">
            Contine shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
