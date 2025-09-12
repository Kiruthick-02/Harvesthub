// A simple validation helper.
// For production, consider using a library like Joi or express-validator.
const validateRegistration = (data) => {
    const { name, email, password, role } = data;
    if (!name || !email || !password || !role) {
        return 'All fields (name, email, password, role) are required.';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    if (!['farmer', 'buyer', 'admin'].includes(role)) {
        return 'Invalid role specified.';
    }
    return null; // No errors
};

module.exports = {
    validateRegistration,
};