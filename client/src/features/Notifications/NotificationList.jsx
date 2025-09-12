import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead } from './notificationsSlice';

const NotificationList = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  const handleMarkRead = () => {
    dispatch(markAsRead());
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div className="py-2 px-4 flex justify-between items-center border-b">
        <h4 className="text-lg font-semibold text-gray-800">Notifications</h4>
        {unreadCount > 0 && (
          <button onClick={handleMarkRead} className="text-sm text-emerald-600 hover:underline">
            Mark all as read
          </button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <div key={index} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
              <p className="text-gray-700">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationList;