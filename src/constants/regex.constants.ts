export const regexConstants = {
    EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
    PHONE: /^\+?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{6}$/,
}