import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FaThumbsUp, FaComment, FaRetweet, FaShare } from "react-icons/fa";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({}); // Track comment input per post
  const [isEditing, setIsEditing] = useState({}); // Track which comments are being edited
  const [userLikes, setUserLikes] = useState({}); // Track user likes per post

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        likes: doc.data().likes || 0,
        comments: doc.data().comments || [],
      }));
      setPosts(postList);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (postId) => {
    if (userLikes[postId]) return; // Prevent multiple likes

    const postRef = doc(db, "posts", postId);
    const post = posts.find((post) => post.id === postId);
    await updateDoc(postRef, {
      likes: post.likes + 1,
    });

    // Update userLikes state
    setUserLikes((prev) => ({ ...prev, [postId]: true }));
  };

  const handleCommentSubmit = async (postId) => {
    const postRef = doc(db, "posts", postId);
    const newComment = commentText[postId] || "";

    if (newComment.trim()) {
      const updatedComments = [
        ...posts.find((post) => post.id === postId).comments,
        newComment,
      ];
      await updateDoc(postRef, {
        comments: updatedComments,
      });
      setCommentText((prev) => ({ ...prev, [postId]: "" })); // Clear input after submitting
    }
  };

  const handleCommentEdit = async (postId, index) => {
    const postRef = doc(db, "posts", postId);
    const editedComment = commentText[postId];

    if (editedComment.trim()) {
      const updatedComments = [
        ...posts.find((post) => post.id === postId).comments,
      ];
      updatedComments[index] = editedComment; // Update the specific comment

      await updateDoc(postRef, {
        comments: updatedComments,
      });
      setCommentText((prev) => ({ ...prev, [postId]: "" })); // Clear input after editing
      setIsEditing((prev) => ({ ...prev, [postId]: false })); // Hide input after editing
    }
  };

  const handleCommentDelete = async (postId, index) => {
    const postRef = doc(db, "posts", postId);
    const updatedComments = [
      ...posts.find((post) => post.id === postId).comments,
    ];
    updatedComments.splice(index, 1); // Remove the comment at the specified index

    await updateDoc(postRef, {
      comments: updatedComments,
    });
  };

  const handleEditToggle = (postId, index) => {
    const comment = posts.find((post) => post.id === postId).comments[index];
    setCommentText((prev) => ({ ...prev, [postId]: comment })); // Populate the input with the comment text
    setIsEditing((prev) => ({ ...prev, [postId]: index })); // Enable editing for the selected comment
  };

  const handleRepost = (postId) => {
    console.log(`Reposted post ID: ${postId}`);
  };

  const handleShare = (postId) => {
    console.log(`Shared post ID: ${postId}`);
  };

  return (
    <div className="p-4 w-full">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 mb-4 rounded shadow">
          <div className="flex items-center mb-2">
            {post.profilePic && (
              <img
                src={post.profilePic}
                alt={`${post.username}'s profile`}
                className="w-10 h-10 rounded-full mr-2"
              />
            )}
            <h3 className="font-bold">{post.username}</h3>
          </div>
          <p>{post.content}</p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              className="mt-2 w-full rounded"
            />
          )}

          {/* Action Buttons: Like, Comment, Repost, Send */}
          <div className="flex justify-around mt-4">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-1"
            >
              <FaThumbsUp />
              <span>{post.likes} Likes</span>
            </button>
            <button
              onClick={() =>
                setIsEditing((prev) => ({ ...prev, [post.id]: -1 }))
              }
              className="flex items-center space-x-1"
            >
              <FaComment />
              <span>Comment</span>
            </button>
            <button
              onClick={() => handleRepost(post.id)}
              className="flex items-center space-x-1"
            >
              <FaRetweet />
              <span>Repost</span>
            </button>
            <button
              onClick={() => handleShare(post.id)}
              className="flex items-center space-x-1"
            >
              <FaShare />
              <span>Send</span>
            </button>
          </div>

          {/* Comments Input */}
          {isEditing[post.id] === -1 && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={commentText[post.id] || ""}
                onChange={(e) =>
                  setCommentText((prev) => ({
                    ...prev,
                    [post.id]: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Comment
              </button>
            </div>
          )}

          {/* Comments Display */}
          <div className="mt-2">
            {post.comments.map((comment, index) => (
              <div key={index} className="p-2 border-b">
                <span className="font-bold">{post.username}:</span> {comment}
                <button
                  onClick={() => handleEditToggle(post.id, index)}
                  className="ml-2 text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCommentDelete(post.id, index)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
                {isEditing[post.id] === index && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <button
                      onClick={() => handleCommentEdit(post.id, index)}
                      className="bg-green-500 text-white p-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
