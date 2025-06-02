export const AUTH_ERROR_MESSAGES = {
    400: 'Invalid request', // Generic enough for both login/reset
    401: 'Invalid credentials', // Login-specific
    404: 'Account not found', // Could apply to both
    409: 'Account already exists', // Registration-specific
    429: 'Too many attempts', // Rate limiting
    500: 'Internal server error',
    503: 'Service unavailable. Try again later.',
    DEFAULT: 'Something went wrong'
} as const; 