import React from 'react';

interface PasswordReqProps {
    charDone: boolean;
    caseDone: boolean;
    symbolDone: boolean;
    numDone: boolean;
}

const PasswordReq = ({ charDone, caseDone, symbolDone, numDone }: PasswordReqProps) => {
    // Reusable CheckIcon component
    const CheckIcon = ({ isDone }: { isDone: boolean }) => (
        <svg 
            className={`w-3.5 h-3.5 me-2 shrink-0 ${
                isDone ? 'text-green-500 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
            }`}
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 20 20"
        >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
    );

    const requirements = [
        { done: charDone, text: "At least 12 characters" },
        { done: caseDone, text: "At least one lowercase and uppercase character" },
        { done: numDone, text: "At least one number" },
        { done: symbolDone, text: "At least one special character, e.g., ! @ # ?" }
    ];

    return (
        <div className='my-5' aria-live="polite">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Password requirements:
            </h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                {requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                        <CheckIcon isDone={req.done} />
                        <span className={req.done ? 'text-green-600 dark:text-green-400' : ''}>
                            {req.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordReq;