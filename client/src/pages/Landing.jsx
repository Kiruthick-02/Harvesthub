// CORRECTED: All imports are now grouped at the top of the file.
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar'; // Assuming you have a public Navbar
import Footer from '../components/common/Footer';   // Assuming you have a Footer

const Landing = () => {
  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=2787&auto=format&fit=crop"
                  alt="People working on a farm"
                />
                <div className="absolute inset-0 bg-emerald-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Connecting Farmers</span>
                  <span className="block text-emerald-200">and Buyers Directly</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-emerald-100 sm:max-w-3xl">
                  HarvestHub empowers farmers with stable income through secure contract farming and provides buyers with reliable, high-quality produce.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link
                      to="/signup"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-emerald-700 bg-white hover:bg-emerald-50 sm:px-8"
                    >
                      Get started
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-500 bg-opacity-80 hover:bg-opacity-100 sm:px-8"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;