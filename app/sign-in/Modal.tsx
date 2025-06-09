'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import validator from 'validator';
import ErrorMsg from '../components/ui/ErrorMsg';
import PasswordReq from '../components/ui/PasswordReq';
import { AUTH_ERROR_MESSAGES } from './sharedErrors';
import { useRouter } from 'next/navigation';
import Spinner from '../components/ui/Spinner';
import { GoogleLogin } from '@react-oauth/google';

const Modal = ({ onClose }: { onClose: () => void }) => {
    const [currentMode, setCurrentMode] = useState<"login" | "register" | "reset" | "activateAccount" | "passwordConfirmation">("login");
    const modalRef = useRef<HTMLDivElement>(null);

    const [trackEmail, setTrackEmail] = useState<string>();
    const [trackPassword, setTrackPassword] = useState<string>();
    const [trackName, setTrackName] = useState<string>();

    const [charLenReg, setCharLenReg] = useState<boolean>(false);
    const [caseReq, setCaseReq] = useState<boolean>(false);
    const [numReq, setNumReq] = useState<boolean>(false);
    const [symbolReq, setSymbolReq] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const router = useRouter();


    type ErrorState = {
        emailError: string;
        passwordError: string;
        nameError: string;
        symbolError: string;
        backendError: string
    };

    const [isErrors, setIsErrors] = useState<ErrorState>({
        emailError: "",
        passwordError: "",
        nameError: "",
        symbolError: "",
        backendError: ""
    });

    const validatePassword = (password: string) => {
        setTrackPassword(password);
        setCharLenReg(password.length >= 12);
        setCaseReq(/[A-Z]/.test(password) && /[a-z]/.test(password));
        setNumReq(/[0-9]/.test(password));
        setSymbolReq(/[^A-Za-z0-9]/.test(password));

        setIsErrors(prev => ({
            ...prev,
            passwordError: validator.isStrongPassword(password, {
                minLength: 12,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }) ? "" : "Password doesn't meet requirements"
        }));
    };

    const validateForm = (field: string, value: string) => {
        if (hasSubmitted && isErrors.backendError) {
            setIsErrors(prev => ({ ...prev, backendError: "" }));
            setHasSubmitted(false); // Allow retry
        }
        switch (field) {
            case "password":
                validatePassword(value);
                break;
            case "email":
                setTrackEmail(value);
                setIsErrors(prev => ({
                    ...prev,
                    emailError: validator.isEmail(value) ? "" : "Invalid email"
                }));
                break;
            case "name":
                setTrackName(value);
                if (value.trim().length < 3) {
                    setIsErrors({
                        ...isErrors,
                        nameError: "Name is too short"
                    })
                }
                else if (value.trim().length > 16) {
                    setIsErrors({
                        ...isErrors,
                        nameError: "Name is too long"
                    })
                } else {
                    setIsErrors({
                        ...isErrors,
                        nameError: ""
                    })
                }
                break;
        }
    };

    const currentModeSwitch = () => {
        setCurrentMode(prev => prev === "login" ? "register" : "login");
    }

    const handleSubmitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isLoading || (hasSubmitted && isErrors.backendError)) return;

        setIsLoading(true);
        setHasSubmitted(true); // Mark as submitted

        try {
            const nameError = isErrors.nameError.toString();
            const passwordError = isErrors.passwordError.toString();
            const symbolError = isErrors.symbolError.toString();
            const emailError = isErrors.emailError.toString();
            const backendError = isErrors.backendError.toString();

            if (nameError === "" && passwordError === "" && symbolError === "" && emailError === "") {
                if (currentMode === 'login') {
                    const data = { email: trackEmail?.toString(), password: trackPassword?.toString() }
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    let status = response.status;
                    switch (status) {
                        case 400:
                            setIsErrors({
                                ...isErrors,
                                backendError: "Incorrect email or password."
                            })
                            break;
                        case 201:
                            setIsErrors({
                                ...isErrors,
                                backendError: ""
                            });

                            // Redirect after 1 second
                            setTimeout(() => {
                                router.push('/'); // Redirect to home
                                onClose(); // Close the modal (optional)
                            }, 5000);
                            break;
                        case 500:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[500]
                            })
                            break;
                        case 503:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[503]
                            })
                            break;
                        case 409:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[409]
                            })
                            break;
                    }
                }

                if (currentMode === 'register') {
                    const data = { email: trackEmail?.toString(), password: trackPassword?.toString(), firstName: trackName?.toString() }
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    let status = response.status;
                    switch (status) {
                        case 503:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[503]
                            })
                            break;
                        case 409:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[409]
                            })
                            break;
                        case 400:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[400]
                            })
                            break;
                        case 201:
                            setIsErrors({
                                ...isErrors,
                                backendError: ""
                            });
                            setCurrentMode('activateAccount');

                            // Redirect after 1 second
                            setTimeout(() => {
                                router.push('/'); // Redirect to home
                                onClose(); // Close the modal (optional)
                            }, 5000);
                            break;
                        case 500:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[500]
                            })
                            break;
                    }
                }

                if (currentMode === 'reset') {
                    const data = { email: trackEmail?.toString() }
                    const response = await fetch('/api/reset', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    let status = response.status;
                    switch (status) {
                        case 400:
                            setIsErrors({
                                ...isErrors,
                                backendError: "The email does not have an account with us."
                            })
                            break;
                        case 201:
                            setIsErrors({
                                ...isErrors,
                                backendError: ""
                            });
                            setCurrentMode('passwordConfirmation');

                            // Redirect after 1 second
                            setTimeout(() => {
                                router.push('/'); // Redirect to home
                                onClose(); // Close the modal (optional)
                            }, 5000);
                            break;
                        case 500:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[500]
                            })
                            break;
                        case 503:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[503]
                            })
                            break;
                        case 409:
                            setIsErrors({
                                ...isErrors,
                                backendError: AUTH_ERROR_MESSAGES[409]
                            })
                            break;
                    }
                }
            }
        } finally {
            if (isErrors.backendError) await new Promise(resolve => setTimeout(resolve, 1500));
            return setIsLoading(false);
        }
    }

    const handleGoogleAuth = async (credentialResponse: any) => {
        try {
            // Send the Google token to your backend
            const response = await fetch('/api/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });
            console.log("response")
            console.log(response)

            if (!response.ok) throw new Error('Backend auth failed');
            const { user } = await response.json();

            // Close modal or redirect
            onClose();
        } catch (error) {
            console.log("error");
            console.log(error);
            setIsErrors({ ...isErrors, backendError: 'Google login failed' });
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <section>
            <div
                id="login-popup"
                tabIndex={-1}
                className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] h-full items-center justify-center popup flex"
            >
                <div className="relative p-4 w-full max-w-md h-auto" ref={modalRef}>
                    <div className="relative bg-white rounded-lg shadow popup-body dark:bg-stone-900">
                        <div className="p-5">
                            <div className="mb-7 text-center">
                                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900 dark:text-white">
                                    {currentMode === 'login' && "Login to your account"}
                                    {currentMode === 'register' && "Make an account to continue"}
                                    {currentMode === 'reset' && "Enter your account's email"}
                                    {currentMode === 'activateAccount' && "Verify Your Email"}
                                    {currentMode === 'passwordConfirmation' && "Check Your Email"}
                                </p>
                                <p className="mt-2 text-sm leading-4 text-slate-600 dark:text-zinc-200">
                                    {currentMode === 'login' && "You must be logged in to perform this action."}
                                    {currentMode === 'register' && "You must be registered to perform this action"}
                                    {currentMode === 'reset' && "Let's get you back in here"}
                                    {currentMode === 'activateAccount' && (
                                        "We've sent a verification link to your email. Please verify your account before proceeding."
                                    )}
                                    {currentMode === 'passwordConfirmation' && (
                                        "If an account exists with this email, you'll receive a password reset link shortly."
                                    )}
                                </p>
                            </div>

                            {['login', 'register', 'reset'].includes(currentMode) ? (
                                <div>
                                    {currentMode !== 'reset' &&
                                        currentMode !== "activateAccount" &&
                                        currentMode !== "passwordConfirmation" && (
                                            <div className="flex w-full flex-col gap-2">
                                                {/* Replace your custom button with GoogleLogin */}
                                                <GoogleLogin
                                                    onSuccess={handleGoogleAuth}
                                                    onError={() => setIsErrors({ ...isErrors, backendError: 'Google login failed' })}
                                                    useOneTap={false}
                                                />
                                            </div>
                                        )
                                    }
                                    {currentMode !== 'reset'
                                        && currentMode !== "activateAccount"
                                        && currentMode !== "passwordConfirmation" && (
                                            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600 dark:text-white">
                                                <div className="h-px w-full bg-slate-200"></div>
                                                OR
                                                <div className="h-px w-full bg-slate-200"></div>
                                            </div>
                                        )}
                                    <form className='w-full'>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Email address
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            className={`block w-full rounded-lg border ${isErrors.emailError ? 'border-red-500' : 'border-gray-300'
                                                } px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1`}
                                            onChange={(e) => validateForm("email", e.target.value)}
                                        />
                                        <ErrorMsg message={isErrors.emailError} className="mt-1" />

                                        {currentMode === 'register' && (
                                            <>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                                                    First Name
                                                </label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className={`mt-2 block w-full rounded-lg border ${isErrors.nameError ? 'border-red-500' : 'border-gray-300'
                                                        } px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1`}
                                                    onChange={(e) => validateForm("name", e.target.value)}
                                                />
                                                <ErrorMsg message={isErrors.nameError} className="mt-1" />
                                            </>
                                        )}

                                        {currentMode !== 'reset'
                                            && currentMode !== "activateAccount"
                                            && currentMode !== "passwordConfirmation" && (
                                                <>
                                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Password</label>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        className={`mt-2 block w-full rounded-lg border ${isErrors.passwordError ? 'border-red-500' : 'border-gray-300'
                                                            } px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1`}
                                                        onChange={(e) => validateForm("password", e.target.value)}
                                                    />
                                                    <ErrorMsg message={isErrors.passwordError} className="mt-1" />
                                                </>
                                            )}

                                        <p className="mb-3 mt-2 text-sm text-gray-500">
                                            {currentMode === "login" && (
                                                <a
                                                    className="text-purple-600 hover:text-purple-800 cursor-pointer"
                                                    onClick={() => { setCurrentMode('reset') }}
                                                >
                                                    Reset your password?
                                                </a>
                                            )}
                                        </p>

                                        {currentMode === 'register' && (
                                            <PasswordReq
                                                symbolDone={symbolReq}
                                                numDone={numReq}
                                                charDone={charLenReg}
                                                caseDone={caseReq}
                                            />
                                        )}

                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                                            disabled={isLoading || (hasSubmitted && Boolean(isErrors.backendError))}
                                            onClick={handleSubmitForm}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Spinner />
                                                    <span className="ml-2">Processing...</span>
                                                </>
                                            ) : (
                                                currentMode === 'login' ? 'Sign In' :
                                                    currentMode === 'register' ? 'Create Account' : 'Reset Password'
                                            )}
                                        </button>

                                        <div className='text-center mx-auto'>
                                            <ErrorMsg message={isErrors.backendError} className='mt-1 mx-auto items-end' />
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                        {currentMode === 'activateAccount' ? (
                                            "Please check your email for the verification link we just sent."
                                        ) : (
                                            "Please check your email for the password reset instructions."
                                        )}
                                    </p>
                                    <button
                                        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                                        onClick={onClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            )}

                            {['login', 'register'].includes(currentMode) && (
                                <div className="mt-6 text-center text-sm text-slate-600 dark:text-white">
                                    {currentMode === "login" ? "Don't have an account?" : "Have an account?"}
                                    <a
                                        className="font-medium text-purple-600 cursor-pointer"
                                        onClick={currentModeSwitch}
                                    >
                                        {currentMode === "login" ? " Sign Up" : " Login"}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal;