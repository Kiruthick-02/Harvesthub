import { useSelector } from 'react-redux';

export const useAuth = () => {
    // We rely on the Redux state for the current user object
    const { user } = useSelector((state) => state.auth);

    return {
        isAuthenticated: !!user,
        user: user,
        role: user ? user.role : null,
    };
};