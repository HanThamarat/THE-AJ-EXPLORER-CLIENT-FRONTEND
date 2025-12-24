import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import cardValidator from 'card-validator';
import Image from 'next/image';
import Visa from "@/app/assets/images/svg/Visa.svg";
import MS from "@/app/assets/images/svg/Mastercard.svg";
import JCB from "@/app/assets/images/svg/JCB.svg";
import UC from "@/app/assets/images/svg/UnionPay.svg";
import Amex from "@/app/assets/images/svg/Amex.svg";

interface CardData {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

interface Errors {
  name?: string;
  number?: string;
  expiry?: string;
  cvc?: string;
}

interface CardPaymentFormProps {
  onValidate?: (isValid: boolean, cardData?: CardData) => void;
}

const CardPaymentForm = ({ onValidate }: CardPaymentFormProps) => {
const [cardData, setCardData] = useState<CardData>({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const [cardType, setCardType] = useState<string>("");

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    const numberValidation = cardValidator.number(cleaned);

    if (numberValidation.card) {
      const gaps = numberValidation.card.gaps || [4, 8, 12];
      let formatted = "";

      for (let i = 0; i < cleaned.length; i++) {
        if (gaps.includes(i) && i > 0) formatted += " ";
        formatted += cleaned[i];
      }
      return formatted;
    }

    return cleaned.replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  /* -------------------- VALIDATORS (PURE) -------------------- */

  const validateName = (name: string): string => {
    if (!name.trim()) return "Cardholder name is required";
    return cardValidator.cardholderName(name).isValid
      ? ""
      : "Invalid cardholder name";
  };

  const validateCardNumber = (number: string): string => {
    const cleaned = number.replace(/\s/g, "");
    if (!cleaned) return "Card number is required";

    const v = cardValidator.number(cleaned);
    if (!v.isValid) {
      return v.isPotentiallyValid
        ? "Card number is incomplete"
        : "Invalid card number";
    }
    return "";
  };

  const validateExpiry = (expiry: string): string => {
    if (!expiry) return "Expiry date is required";

    const [month, year] = expiry.split("/");
    const v = cardValidator.expirationDate({ month, year });

    if (!v.isValid) {
      return v.isPotentiallyValid
        ? "Expiry date is incomplete"
        : "Invalid or expired card";
    }
    return "";
  };

  const validateCVC = (cvc: string, cardNumber: string): string => {
    if (!cvc) return "CVC is required";

    const cleaned = cardNumber.replace(/\s/g, "");
    const card = cardValidator.number(cleaned).card;
    const maxLength = card?.code.size || 3;

    const v = cardValidator.cvv(cvc, maxLength);
    if (!v.isValid) {
      return v.isPotentiallyValid ? "CVC is incomplete" : "Invalid CVC";
    }
    return "";
  };

  const errors: Errors = useMemo(() => {
    return {
      name: validateName(cardData.name),
      number: validateCardNumber(cardData.number),
      expiry: validateExpiry(cardData.expiry),
      cvc: validateCVC(cardData.cvc, cardData.number),
    };
  }, [cardData]);

  useEffect(() => {
    if (!onValidate) return;

    const hasAllFields = Object.values(cardData).every(Boolean);
    const hasNoErrors = !Object.values(errors).some(Boolean);
    const isValid = hasAllFields && hasNoErrors;

    onValidate(isValid, isValid ? cardData : undefined);
  }, [cardData, errors, onValidate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "number") {
      const cleaned = value.replace(/\s/g, "");
      if (!/^\d*$/.test(cleaned) || cleaned.length > 19) return;

      const v = cardValidator.number(cleaned);
      formattedValue = formatCardNumber(cleaned);
      setCardType(v.card?.type || "");
    } else if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length > 4) return;
      formattedValue = formatExpiry(cleaned);
    } else if (name === "cvc") {
      if (!/^\d*$/.test(value) || value.length > 4) return;
    } else if (name === "name") {
      formattedValue = value.toUpperCase();
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const getCardLogo = () => {
    const logos: Record<string, any> = {
      visa: <Image src={Visa} alt="visa" />,
      mastercard: <Image src={MS} alt="Ms" />,
      "american-express": <Image src={Amex} alt="Amex" />,
      jcb: <Image src={JCB} alt="JCB" />,
      unionpay: <Image src={UC} alt="UC" />,
    };
    return logos[cardType] || "💳";
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-6">
        <Image src={Visa} alt='visa' />
        <Image src={MS} alt='Ms' />
        <Image src={JCB} alt='JCB' />
        <Image src={UC} alt='UC' />
        <Image src={Amex} alt='Amex' />
      </div>

      <div className="space-y-5">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cardholder's Name *
          </label>
          <input
            type="text"
            name="name"
            value={cardData.name}
            onChange={handleChange}
            placeholder="Please enter cardholder's Name"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
            } outline-none`}
          />
          {errors.name && (
            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
              <AlertCircle size={14} />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="number"
              value={cardData.number}
              onChange={handleChange}
              placeholder="Please enter card Number"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.number ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
              } outline-none pr-16`}
            />
            {cardType && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-600">
                {getCardLogo()}
              </div>
            )}
          </div>
          {errors.number && (
            <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
              <AlertCircle size={14} />
              <span>{errors.number}</span>
            </div>
          )}
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expiry Date *
            </label>
            <input
              type="text"
              name="expiry"
              value={cardData.expiry}
              onChange={handleChange}
              placeholder="mm/yy"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.expiry ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
              } outline-none`}
            />
            {errors.expiry && (
              <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                <AlertCircle size={14} />
                <span>{errors.expiry}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CVC *
            </label>
            <input
              type="text"
              name="cvc"
              value={cardData.cvc}
              onChange={handleChange}
              placeholder="Please enter CVC"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.cvc ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500'
              } outline-none`}
            />
            {errors.cvc && (
              <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                <AlertCircle size={14} />
                <span>{errors.cvc}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 font-semibold mb-2">Powered by card-validator library:</p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>✓ Industry-standard Luhn algorithm</li>
          <li>✓ 12+ card types supported (Visa, MC, Amex, Discover, etc.)</li>
          <li>✓ Expiry date validation with future date check</li>
          <li>✓ Dynamic CVC length validation</li>
          <li>✓ Smart formatting with proper gaps</li>
        </ul>
      </div>
    </div>
  );
};

export default CardPaymentForm;