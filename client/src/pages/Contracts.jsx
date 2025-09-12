import React from 'react';
import Card from '../components/common/Card';

const Contracts = () => {
    return (
         <div>
            <h1 className="text-3xl font-bold text-text-ivory mb-6">Contract Management</h1>
            <Card>
                <p className="text-text-ivory">Your active and pending contracts will be displayed here.</p>
            </Card>
        </div>
    );
};

export default Contracts;