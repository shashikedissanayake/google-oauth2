import React, { useEffect } from 'react';

export function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 100);
    }, []);
    return <div>Login success</div>
}