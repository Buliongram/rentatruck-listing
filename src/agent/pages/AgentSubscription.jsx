import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane, FaDollarSign, FaCrown } from "react-icons/fa";
import { useFlutterwave } from "flutterwave-react-v3";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import axios from "axios";

export default function AgentSubscription() {
  const [transacionData, setTransactionData] = useState({
    transactionId: "",
    amount: "",
    currency: "",
    email: "",
    plan: "",
    reference: "",
    status: "",
  });
  const API_URL =
    window.location.hostname === "localhost"
      ? `http://localhost:5000/api`
      : `https://rentahome-server.onrender.com/api`;
  function PayButton({ plan, user }) {
    const config = useMemo(
      () => ({
        public_key: "FLWPUBK_TEST-b4e9c477c6363f9b7ca4c64c39b8a7ec-X",
        tx_ref: `HTNX-${nanoid(20)}`,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        amount: plan.price,
        customer: {
          email: user?.email,
          name: `${user?.firstname || ""} ${user?.middlename || ""} ${
            user?.lastname || ""
          }`.trim(),
        },
        customizations: {
          title: "Rent-a-Home Subscription",
          description: `Payment for the ${plan.name} Plan`,
        },
        meta: { plan: plan.name },
      }),
      [plan, user]
    );

    const handleFlutterPayment = useFlutterwave(config);

    const onClick = () => {
      if (!user?.email) {
        toast.error("User not logged in. Please log in to subscribe.", {
          id: "123",
        });
        return;
      }
      handleFlutterPayment({
        callback: async (response) => {
          try {
            const res = await axios.post(
              `${API_URL}/subscribe/process-payment`,
              {
                transactionId: response.transaction_id,
                amount: response.amount,
                currency: response.currency,
                email: user.email,
                plan: plan.name,
                reference: response.tx_ref,
                status: response.status,
              },
              { withCredentials: true }
            );

            if (res.data.error) {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
            }
          } catch (error) {
            console.error("Backend processing error:", error);
            const message =
              error.response?.data?.message || "An unknown error occurred.";
            toast.error(message);
          }
        },
        onClose: () => {
          console.log("Payment modal closed by user.");
        },
      });
    };

    return (
      <button
        onClick={onClick}
        className="w-full py-3 bg-zinc-950 text-white rounded-xl font-semibold text-sm hover:bg-zinc-800 transition-colors duration-200"
      >
        Get Started
      </button>
    );
  }
  const user = useSelector((state) => state.user);

  const plans = [
    {
      name: "Basic",
      price: 2500, // NGN
      listings: 10,
      icon: <FaPaperPlane />,
      features: [
        "Up to 10 active listings",
        "Standard support",
        "Monthly reporting",
      ],
    },
    {
      name: "Premium",
      price: 15000, // NGN
      listings: 50,
      icon: <FaCrown />,
      features: [
        "Up to 50 active listings",
        "Featured listings",
        "Priority support",
        "Detailed analytics",
      ],
    },
    {
      name: "Professional",
      price: 45000, // NGN
      listings: Infinity,
      icon: <FaDollarSign />,
      features: [
        "Unlimited active listings",
        "Top-of-search placement",
        "Dedicated account manager",
        "API access",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-zinc-950 mb-4">
        Choose Your Plan
      </h1>
      <p className="text-lg text-center text-zinc-600 mb-12 max-w-2xl">
        Select a plan that fits your needs and start listing properties with
        confidence.
      </p>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-3xl p-8 flex flex-col items-center border border-zinc-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-300"
          >
            <div className="text-4xl text-zinc-900 mb-4">{plan.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-sm text-zinc-500 mb-6">
              Perfect for{" "}
              {plan.listings === Infinity ? "large agencies" : "individuals"}.
            </p>
            <div className="text-5xl font-extrabold text-zinc-950 mb-2">
              ₦{plan.price.toLocaleString()}
            </div>
            <p className="text-zinc-500 mb-8">per month</p>
            <ul className="text-center space-y-2 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-sm text-zinc-700">
                  {feature}
                </li>
              ))}
            </ul>

            <PayButton plan={plan} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
