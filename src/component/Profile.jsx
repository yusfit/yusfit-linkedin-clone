import { useEffect, useState } from "react";
import { auth, storage, db } from "../firebase"; // Ensure Firestore is imported
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setName(user.displayName || "");
        setProfilePicture(user.photoURL || "");

        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setBio(userDoc.data().bio || "");
          setLocation(userDoc.data().location || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profilePicture,
      });

      // Update Firestore document
      await setDoc(
        doc(db, "users", user.uid),
        {
          bio,
          location,
        },
        { merge: true }
      );

      setEditing(false); // Hide the editing form
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const profilePicRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(profilePicRef, file);
      const profilePicURL = await getDownloadURL(profilePicRef);
      setProfilePicture(profilePicURL);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const coverImageRef = ref(storage, `coverImages/${user.uid}`);
      await uploadBytes(coverImageRef, file);
      const coverImageURL = await getDownloadURL(coverImageRef);
      setCoverImage(coverImageURL);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow border max-w-lg mx-auto mt-10 h-fit relative">
      <div className="absolute top-0 left-0 right-0 h-28 bg-gray-200 rounded-t-lg">
        {coverImage && (
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover rounded-t-lg"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded p-1 opacity-0 cursor-pointer"
          style={{ width: "90%", height: "90%" }}
        />
      </div>

      <div className="relative z-10 mt-10">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full mb-2 border-2 border-gray-300"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded p-1 opacity-0 cursor-pointer"
          style={{ width: "90%", height: "90%" }}
        />
      </div>

      {editing ? (
        <div className="w-full mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="block w-full p-3 mb-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className="block w-full p-3 mb-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your town, city."
            className="block w-full p-3 mb-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="w-full">
          <h3 className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </h3>
          <p className="text-gray-600 text-sm">{bio || "No bio available."}</p>
          <p className="text-gray-500 text-xs">
            {location || "Location not set."}
          </p>
          <button onClick={handleEdit} className="text-blue-500 underline mt-2">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
