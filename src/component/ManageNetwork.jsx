import React from "react";

const ManageNetwork = () => {
  return (
    <div className="p-4 bg-gray-100  w-full">
      {/* Manage My Network Card */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-6 w-full">
        <h2 className="text-md font-semibold text-gray-700 mb-4 whitespace-nowrap">
          Manage my network
        </h2>

        <div className="flex flex-col space-y-4">
          <div className="bg-gray-50 rounded-lg  text-center shadow justify-between p-1 whitespace-nowrap flex gap-4 items-center">
            <h3 className="font-medium text-gray-800">Connections</h3>
            <p className="text-xl font-bold text-blue-600">628</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-1 whitespace- flex gap-4 justify-between items-center text-center shadow">
            <h3 className="font-medium text-gray-800">Contacts</h3>
            <p className="text-xl font-bold text-blue-600">50</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-1 whitespace- flex gap-4 justify-between items-center text-center shadow">
            <h3 className="font-medium text-gray-800">Following & Followers</h3>
            <p className="text-xl font-bold text-blue-600">200</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-1 whitespace- flex gap-4 justify-between items-center text-center shadow">
            <h3 className="font-medium text-gray-800">Groups</h3>
            <p className="text-xl font-bold text-blue-600">1</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-1 whitespace- flex gap-4 justify-between items-center text-center shadow">
            <h3 className="font-medium text-gray-800">Events</h3>
            <p className="text-xl font-bold text-blue-600">5</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-1 whitespace- flex gap-4 justify-between items-center text-center shadow">
            <h3 className="font-medium text-gray-800">Pages</h3>
            <p className="text-xl font-bold text-blue-600">49</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-1 whitespace- flex justify-between gap-4 items-center text-center shadow">
            <h3 className="font-medium text-gray-800">Newsletters</h3>
            <p className="text-xl font-bold text-blue-600">3</p>
          </div>
        </div>
      </div>

      {/* Add your existing sections here (Invitations, People You May Know, etc.) */}
    </div>
  );
};

export default ManageNetwork;
