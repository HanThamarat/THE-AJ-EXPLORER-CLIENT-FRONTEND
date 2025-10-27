"use client"

import { signIn, useSession } from 'next-auth/react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function GoogleOneTap() {

    const { status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [error, setError] = useState<string | null>(null);

    return  useGoogleOneTapLogin({
        use_fedcm_for_prompt: true,
        disabled: status === 'authenticated',
        onSuccess: (credentialResponse) => {
            signIn('google-one-tap', {
            idToken: credentialResponse.credential,
            redirect: true,
            callbackUrl,
            });
        },
        onError: () => {
            console.error('Google One-tap login failed.');
            setError('Google login failed. Please try the form below.');
        },
    });
}