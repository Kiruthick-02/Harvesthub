import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark-card/50 border-t border-primary-green/20 py-6 text-center">
            <p className="text-secondary-text">&copy; {new Date().getFullYear()} HarvestHub. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;