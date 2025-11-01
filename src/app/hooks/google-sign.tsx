"use client"

import { signIn, useSession } from 'next-auth/react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GoogleOneTap() {

    const { data, status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [error, setError] = useState<string | null>(null);
    const [initOneTap, setInitOnetap] = useState<boolean>(true);
    
    useEffect(() => {
        if (data === null && status !== 'loading') {
            setInitOnetap(false);
        }
    }, [status, data]);

    useGoogleOneTapLogin({
        use_fedcm_for_prompt: true,
        disabled: initOneTap,
        onSuccess: (credentialResponse) => {
            signIn('google-one-tap', {
            idToken: credentialResponse.credential,
            redirect: true,
            callbackUrl: callbackUrl,
            });
        },
        onError: () => {
            console.error('Google One-tap login failed.');
            setError('Google login failed. Please try the form below.');
        },
    });

    return <></>
}