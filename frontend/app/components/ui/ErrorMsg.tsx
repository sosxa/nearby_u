'use client';

interface ErrorMsgProps {
  message: string;
  className?: string;
}

const ErrorMsg = ({ message, className = '' }: ErrorMsgProps) => (
  message ? (
    <div className={`flex items-start mt-1 text-sm text-red-600 dark:text-red-400 ${className}`}>
      <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11.983 0a12.2 12.2 0 00-8.51 3.653A11.8 11.8 0 000 12.207a11.8 11.8 0 0011.8 11.793h.214a12.1 12.1 0 0012.1-12.208h0A11.8 11.8 0 0011.983 0zM10.5 16.5a1.5 1.5 0 011.5-1.5h.027a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5h-.027a1.5 1.5 0 01-1.5-1.5zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"/>
      </svg>
      <span>{message}</span>
    </div>
  ) : null
);

export default ErrorMsg;