import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <header className="h-20 flex items-center justify-between px-6 bg-text-dark/30">
            <div>
                <h2 className="text-xl font-semibold text-text-ivory">Welcome back, {user?.name || 'User'}!</h2>
            </div>
            <div>
                {/* Add notification icon or user profile dropdown here */}
            </div>
        </header>
    );
};

export default Navbar;