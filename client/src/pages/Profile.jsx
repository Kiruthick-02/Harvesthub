import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-ivory mb-6">My Profile</h1>
      <Card className="max-w-2xl">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-ivory/80 mb-1">Full Name</label>
            <Input id="name" name="name" defaultValue={user?.name} />
          </div>
          <div>
             <label htmlFor="email" className="block text-sm font-medium text-text-ivory/80 mb-1">Email Address</label>
            <Input id="email" name="email" type="email" defaultValue={user?.email} disabled />
          </div>
           <div>
             <label htmlFor="role" className="block text-sm font-medium text-text-ivory/80 mb-1">Role</label>
            <Input id="role" name="role" defaultValue={user?.role} className="capitalize" disabled />
          </div>
          <div className="pt-4">
             <Button type="submit">Update Profile</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;