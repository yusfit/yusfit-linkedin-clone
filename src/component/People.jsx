import React, { useState } from "react";

const People = () => {
  // State to store the invitations
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      name: "John Doe",
      bio: "Software Engineer",
      profilePic: "https://picsum.photos/seed/johndoe/200",
    },
    {
      id: 2,
      name: "Jane Smith",
      bio: "Product Manager",
      profilePic: "https://picsum.photos/seed/janesmith/200",
    },
    {
      id: 3,
      name: "John Jonas",
      bio: "Product Manager",
      profilePic: "https://picsum.photos/seed/johndoe/200",
    },
  ]);

  // State for suggestions, increased to 8
  const [suggestions, setSuggestions] = useState([
    {
      id: 4,
      name: "Alice Johnson",
      bio: "UX Designer",
      profilePic: "https://picsum.photos/seed/alicejohnson/200",
    },
    {
      id: 5,
      name: "Bob Brown",
      bio: "Data Scientist",
      profilePic: "https://picsum.photos/seed/bobbrown/200",
    },
    {
      id: 6,
      name: "Charlie Davis",
      bio: "Marketing Specialist",
      profilePic: "https://picsum.photos/seed/charliedavis/200",
    },
    {
      id: 7,
      name: "Emily Evans",
      bio: "Web Developer",
      profilePic: "https://picsum.photos/seed/emilyevans/200",
    },
    {
      id: 8,
      name: "David Clark",
      bio: "Graphic Designer",
      profilePic: "https://picsum.photos/seed/davidclark/200",
    },
    {
      id: 9,
      name: "Fiona Lewis",
      bio: "Project Manager",
      profilePic: "https://picsum.photos/seed/fionalewis/200",
    },
    {
      id: 10,
      name: "George Hall",
      bio: "Software Engineer",
      profilePic: "https://picsum.photos/seed/georgehall/200",
    },
    {
      id: 11,
      name: "Helen Carter",
      bio: "Content Writer",
      profilePic: "https://picsum.photos/seed/helencarter/200",
    },
  ]);

  const [acceptedId, setAcceptedId] = useState(null);
  const [connectedSuggestions, setConnectedSuggestions] = useState([]); // Track connected users in suggestions

  // Handle invitation accept
  const handleConnectInvite = (id) => {
    setAcceptedId(id);
    setTimeout(() => {
      setInvitations(invitations.filter((invitation) => invitation.id !== id));
      setAcceptedId(null); // Reset after removal
    }, 1000); // Show "Accepted" for 1 second
  };

  // Handle ignore for invitations
  const handleIgnore = (id) => {
    setInvitations(invitations.filter((invitation) => invitation.id !== id));
  };

  // Handle connecting in the suggestions section
  const handleConnectSuggestion = (id) => {
    setConnectedSuggestions([...connectedSuggestions, id]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 whitespace-nowrap">
        My Network
      </h1>

      {/* Invitations Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Invitations ({invitations.length})
        </h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          {invitations.length === 0 ? (
            <p className="text-gray-500">No invitations yet.</p>
          ) : (
            invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="flex items-center">
                  <img
                    src={invitation.profilePic}
                    alt={invitation.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <span className="font-medium text-gray-800">
                    {invitation.name}
                  </span>
                </div>
                <div>
                  {acceptedId === invitation.id ? (
                    <button
                      disabled
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Accepted
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleConnectInvite(invitation.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-300 mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleIgnore(invitation.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                      >
                        Ignore
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Suggestions Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          People you may know based on your recent activity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={suggestion.profilePic}
                alt={suggestion.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <h3 className="font-medium text-gray-800">{suggestion.name}</h3>
              <p className="text-gray-600 text-center mb-3">{suggestion.bio}</p>
              {connectedSuggestions.includes(suggestion.id) ? (
                <button
                  disabled
                  className="bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Connected
                </button>
              ) : (
                <button
                  onClick={() => handleConnectSuggestion(suggestion.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300"
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default People;
