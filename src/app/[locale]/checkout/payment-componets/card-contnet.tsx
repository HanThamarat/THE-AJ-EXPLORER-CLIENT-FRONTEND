import React, { useState, ChangeEvent, useEffect } from 'react';
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
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [cardType, setCardType] = useState<string>('');

  // Format card number with spaces using card-validator
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const numberValidation = cardValidator.number(cleaned);
    
    if (numberValidation.card) {
      const gaps = numberValidation.card.gaps || [4, 8, 12];
      let formatted = '';
      
      for (let i = 0; i < cleaned.length; i++) {
        if (gaps.includes(i) && i > 0) {
          formatted += ' ';
        }
        formatted += cleaned[i];
      }
      return formatted;
    }
    
    return cleaned.replace(/(\d{4})/g, '$1 ').trim();
  };

  // Format expiry date
  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Validate card number using card-validator
  const validateCardNumber = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    
    if (!cleaned) return 'Card number is required';
    
    const numberValidation = cardValidator.number(cleaned);
    
    if (!numberValidation.isValid) {
      if (numberValidation.isPotentiallyValid) {
        return 'Card number is incomplete';
      }
      return 'Invalid card number';
    }
    
    return '';
  };

  // Validate cardholder name
  const validateName = (name: string): string => {
    const nameValidation = cardValidator.cardholderName(name);
    
    if (!name.trim()) return 'Cardholder name is required';
    if (!nameValidation.isValid) return 'Invalid cardholder name';
    
    return '';
  };

  // Validate expiry date using card-validator
  const validateExpiry = (expiry: string): string => {
    if (!expiry) return 'Expiry date is required';
    
    const [month, year] = expiry.split('/');
    const expiryValidation = cardValidator.expirationDate({
      month,
      year
    });
    
    if (!expiryValidation.isValid) {
      if (expiryValidation.isPotentiallyValid) {
        return 'Expiry date is incomplete';
      }
      return 'Invalid or expired card';
    }
    
    return '';
  };

  // Validate CVC using card-validator
  const validateCVC = (cvc: string, cardNumber: string): string => {
    if (!cvc) return 'CVC is required';
    
    const cleaned = cardNumber.replace(/\s/g, '');
    const numberValidation = cardValidator.number(cleaned);
    const maxLength = numberValidation.card?.code.size || 3;
    
    const cvcValidation = cardValidator.cvv(cvc, maxLength);
    
    if (!cvcValidation.isValid) {
      if (cvcValidation.isPotentiallyValid) {
        return 'CVC is incomplete';
      }
      return 'Invalid CVC';
    }
    
    return '';
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      const cleaned = value.replace(/\s/g, '');
      const numberValidation = cardValidator.number(cleaned);
      
      if (cleaned.length <= 19 && /^\d*$/.test(cleaned)) {
        formattedValue = formatCardNumber(cleaned);
        setCardType(numberValidation.card?.type || '');
      } else {
        return;
      }
    } else if (name === 'expiry') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        formattedValue = formatExpiry(cleaned);
      } else {
        return;
      }
    } else if (name === 'cvc') {
      if (value.length <= 4 && /^\d*$/.test(value)) {
        formattedValue = value;
      } else {
        return;
      }
    } else if (name === 'name') {
      formattedValue = value.toUpperCase();
    }

    setCardData({ ...cardData, [name]: formattedValue });
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate all fields
  const validateAll = (): boolean => {
    const newErrors: Errors = {
      name: validateName(cardData.name),
      number: validateCardNumber(cardData.number),
      expiry: validateExpiry(cardData.expiry),
      cvc: validateCVC(cardData.cvc, cardData.number)
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Notify parent of validation status
  useEffect(() => {
    if (onValidate) {
      const hasAllFields = Object.values(cardData).every(value => value !== '');
      const hasNoErrors = !Object.values(errors).some(error => error);
      const isValid = hasAllFields && hasNoErrors && validateAll();
      
      onValidate(isValid, isValid ? cardData : undefined);
    }
  }, [cardData, errors]);

  // Get card logo
  const getCardLogo = (): string => {
    const logos: Record<string, any> = {
      visa: <Image src={Visa} alt='visa' />,
      mastercard: <Image src={MS} alt='Ms' />,
      'american-express': <Image src={Amex} alt='Amex' />,
      'diners-club': '💳 Diners',
      discover: '💳 Discover',
      jcb: <Image src={JCB} alt='JCB' />,
      unionpay: <Image src={UC} alt='UC' />,
      maestro: '💳 Maestro',
      elo: '💳 Elo',
      mir: '💳 Mir',
      hiper: '💳 Hiper',
      hipercard: '💳 Hipercard'
    };
    return logos[cardType] || '💳';
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