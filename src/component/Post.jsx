import { useState } from "react";
import { db, storage } from "../firebase"; // Import Firebase Firestore and Storage
import { getAuth } from "firebase/auth"; // Import getAuth
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaImage, FaUserTie, FaPencilAlt } from "react-icons/fa";

const Post = () => {
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPostCardVisible, setIsPostCardVisible] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePostSubmit = async () => {
    if (!postContent) return;

    setLoading(true);
    let imageUrl = "";

    try {
      if (imageFile) {
        const imageRef = ref(
          storage,
          `postImages/${user.uid}/${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "posts"), {
        content: postContent,
        imageUrl: imageUrl,
        uid: user.uid,
        username: user.displayName,
        profilePic: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setPostContent(""); // Clear input fields after submission
      setImageFile(null);
      setIsPostCardVisible(false); // Automatically hide the post card after submission
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md mt-10">
      <div className="flex items-center space-x-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        )}

        <input
          type="text"
          placeholder="What do you want to talk about?"
          className="w-full p-2 border border-gray-300 rounded-full h-12"
          onClick={() => setIsPostCardVisible(true)}
        />
      </div>

      <div className="flex justify-between mx-10 mt-4 space-x-8">
        <div className="flex items-center">
          <FaImage className="mr-2 h-6 w-6 text-blue-500 " />
          <h1 className="text-gray-700">Media</h1>
        </div>
        <div className="flex items-center">
          <FaUserTie className="mr-2 h-6 w-6 text-yellow-800" />
          <h1>Contribute Expertise</h1>
        </div>
        <div className="flex items-center">
          <FaPencilAlt className="mr-2 h-6 w-6 text-orange-800" />
          <h1>Write Article</h1>
        </div>
      </div>

      {isPostCardVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <textarea
              placeholder="Write your post here..."
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2"
            />

            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsPostCardVisible(false)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePostSubmit}
                disabled={loading}
                className={`bg-blue-500 text-white p-2 rounded ${
                  loading ? "opacity-50" : ""
                }`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
