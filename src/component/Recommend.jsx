import React from "react";

const RecommendationCard = ({ profilePic, name, title, isCompany }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-2  items-start">
      <img
        src={profilePic}
        alt={name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <h3 className="font-medium text-gray-800">{name}</h3>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{title}</p>
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition duration-300">
          Follow
        </button>
      </div>
    </div>
  );
};

const Recommend = () => {
  const people = [
    {
      id: 1,
      name: "NNPC Limited",
      title: "Company • Oil and Gas",
      profilePic: "https://picsum.photos/seed/nnpc/200",
      isCompany: true,
    },
    {
      id: 2,
      name: "Ngozi Uloka",
      title:
        "Passionate Frontend Developer | Customer Service Specialist | Lifelong Learner | NSPPDIAN",
      profilePic: "https://picsum.photos/seed/ngozi/200",
    },
    {
      id: 3,
      name: "Edidiong Asikpo",
      title:
        "Developer Advocate | Technical Writer | LinkedIn Learning Instructor",
      profilePic: "https://picsum.photos/seed/edidiong/200",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-6">
      <div className="space-y-4">
        {people.map((person) => (
          <RecommendationCard
            key={person.id}
            profilePic={person.profilePic}
            name={person.name}
            title={person.title}
            isCompany={person.isCompany}
          />
        ))}
      </div>

      <button className="mt-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
        View all recommendations
      </button>
    </div>
  );
};

export default Recommend;
