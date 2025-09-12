import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// --- FIX STARTS HERE ---
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. Import the plugin
gsap.registerPlugin(ScrollTrigger);                 // 2. Register the plugin with GSAP
// --- FIX ENDS HERE ---
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';

// A simple SVG icon for feature cards
const FeatureIcon = ({ path }) => (
    <div className="bg-primary-green/20 p-3 rounded-lg mb-4 inline-block">
        <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} /></svg>
    </div>
);

const Landing = () => {
    const container = useRef();

    useGSAP(() => {
        // Animate the hero section text and button
        gsap.from(".hero-element", {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });

        // Animate the feature cards (This will now work correctly)
        gsap.from(".feature-card", {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".features-section",
                start: "top 80%", // Animate when the top of the section is 80% from the top of the viewport
            }
        });
    }, { scope: container });

    return (
        <div ref={container} className="bg-dark-bg text-light-text">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h1 className="hero-element text-5xl md:text-7xl font-bold mb-4">
                    Welcome to <span className="text-primary-green">HarvestHub</span>
                </h1>
                <p className="hero-element text-lg md:text-xl text-secondary-text max-w-2xl mb-8">
                    Connecting farmers directly to buyers. Secure contracts, fair pricing, and a transparent marketplace to help you grow.
                </p>
                <div className="hero-element">
                    <Link to="/signup">
                        <Button className="!w-auto px-8 py-3 text-lg">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Why Choose <span className="text-primary-green">HarvestHub</span>?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="feature-card bg-dark-card p-8 rounded-lg text-center">
                            <FeatureIcon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            <h3 className="text-2xl font-bold mb-2">Secure Contracts</h3>
                            <p className="text-secondary-text">Create, negotiate, and manage digital farming contracts with ease and confidence.</p>
                        </div>
                        <div className="feature-card bg-dark-card p-8 rounded-lg text-center">
                            <FeatureIcon path="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
                            <h3 className="text-2xl font-bold mb-2">Direct Marketplace</h3>
                            <p className="text-secondary-text">List surplus produce or find equipment directly from other farmers, cutting out the middleman.</p>
                        </div>
                        <div className="feature-card bg-dark-card p-8 rounded-lg text-center">
                           <FeatureIcon path="M13 10V3L4 14h7v7l9-11h-7z" />
                            <h3 className="text-2xl font-bold mb-2">Real-Time Data</h3>
                            <p className="text-secondary-text">Get instant weather updates and market insights to make informed decisions for your farm.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Landing;