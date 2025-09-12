import React from 'react';
import Card from '../components/common/Card';

const Dashboard = () => { // Renamed component
    return (
        <div>
            <h1 className="text-3xl font-bold text-text-ivory mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <h2 className="text-xl font-semibold text-text-ivory">Active Contracts</h2>
                    <p className="text-4xl font-bold mt-2 text-text-ivory">5</p>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold text-text-ivory">Marketplace Listings</h2>
                    <p className="text-4xl font-bold mt-2 text-text-ivory">12</p>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold text-text-ivory">Pending Messages</h2>
                    <p className="text-4xl font-bold mt-2 text-text-ivory">3</p>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;