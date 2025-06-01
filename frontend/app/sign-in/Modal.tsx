'use client'
import React, { useState, useRef, useEffect } from 'react'
import validator from 'validator';
import ErrorMsg from '../components/ui/ErrorMsg';
import PasswordReq from '../components/ui/PasswordReq';


const Modal = ({ onClose }: { onClose: () => void }) => {
    const [currentMode, setCurrentMode] = useState<"login" | "register" | "reset">("login");
    const modalRef = useRef<HTMLDivElement>(null);

    const [trackEmail, setTrackEmail] = useState<string>();
    const [trackPassword, setTrackPassword] = useState<string>();
    const [trackName, setTrackName] = useState<string>();

    const [charLenReg, setCharLenReg] = useState<boolean>(false);
    const [caseReq, setCaseReq] = useState<boolean>(false);
    const [numReq, setNumReq] = useState<boolean>(false);
    const [symbolReq, setSymbolReq] = useState<boolean>(false);


    type ErrorState = {
        emailError: string;
        passwordError: string;
        nameError: string;
        symbolError: string;
    };

    const [isErrors, setIsErrors] = useState<ErrorState>({
        emailError: "",
        passwordError: "",
        nameError: "",
        symbolError: ""
    });

    const validatePassword = (password: string) => {
        setTrackPassword(password); // Update state immediately

        // Check all requirements in one pass
        setCharLenReg(password.length >= 12);
        setCaseReq(/[A-Z]/.test(password) && /[a-z]/.test(password));
        setNumReq(/[0-9]/.test(password));
        setSymbolReq(/[^A-Za-z0-9]/.test(password));

        // Error message handling
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

    const validateEmail = (email: string) => {
        let check = validator.isEmail(email);
        if (!check) {
            return setIsErrors({
                ...isErrors,
                emailError: "Email isn't valid."
            });
        }
    }

    const validateForm = (field: string, value: string) => {
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
                setIsErrors(prev => ({
                    ...prev,
                    nameError: value.trim().length > 2 ? "" : "Name too short"
                }));
                break;
        }
    };



    const currentModeSwitch = () => {
        setCurrentMode(prev => prev === "login" ? "register" : "login");
    }

    const handleSubmitForm = async (event: MouseEvent) => {
        event.preventDefault();
        if (currentMode === 'login') {
            const data = { email: trackEmail?.toString(), password: trackPassword?.toString() }
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
        }

        if (currentMode === 'register') {

        }

    }

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
                                    {currentMode === 'reset' && "Enter your accounts email"}
                                </p>
                                <p className="mt-2 text-sm leading-4 text-slate-600 dark:text-zinc-200">
                                    {currentMode === 'login' && "You must be logged in to perform this action."}
                                    {currentMode === 'register' && "You must be registered to perform this action"}
                                    {currentMode === 'reset' && "Let's get you back in here"}
                                </p>
                            </div>
                            <div>
                                {currentMode !== 'reset' &&
                                    <div className="flex w-full flex-col gap-2">
                                        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 92" fill="none" className="h-[18px] w-[18px]">
                                                <path
                                                    d="M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z"
                                                    fill="#4280ef"></path>
                                                <path
                                                    d="M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z"
                                                    fill="#34a353"></path>
                                                <path
                                                    d="M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z"
                                                    fill="#f6b704"></path>
                                                <path
                                                    d="M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z"
                                                    fill="#e54335"></path>
                                            </svg>
                                            Continue with Google
                                        </button>
                                    </div>
                                }
                                {currentMode !== 'reset' && (
                                    <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600 dark:text-white">
                                        <div className="h-px w-full bg-slate-200"></div>
                                        OR
                                        <div className="h-px w-full bg-slate-200"></div>
                                    </div>
                                )}
                                <form className='w-full'>
                                    {/* Email Field */}
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

                                    {/* Name Field (Register Only) */}
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

                                    {/* Password Field */}
                                    {currentMode !== "reset" && (
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
                                    {currentMode === 'login' && (
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
                                    >
                                        Continue
                                    </button>
                                </form>
                            </div>
                            <div className="mt-6 text-center text-sm text-slate-600 dark:text-white">
                                {currentMode === "login" ? "Don't have an account?" : "Have an account?"}
                                <a
                                    className="font-medium text-purple-600 cursor-pointer"
                                    onClick={currentModeSwitch}
                                >
                                    {currentMode === "login" ? " Sign Up" : " Login"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Modal;