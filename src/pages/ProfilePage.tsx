import {  Plus, SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import PostTable from "../components/PostTable";
import { useEffect, useState } from "react";
import { Post } from '../types/post.types';
import { url } from "../types/auth.types";

const ProfilePage = () => {
  // states
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  // Hämta inlägg vid initiell rendering
  useEffect(() => {
    getPosts();
  }, [])

  // Hämta inlägg
  const getPosts = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${url}/users/${user?.id}/posts`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }});
      if (!resp.ok) {
        throw Error;
      }
      const data = await resp.json();
      setPosts(data);
      setError(null);
    } catch (error) {
      console.log("Något gick fel vid inläsning av inlägg.");
      setError("Något gick fel vid inläsningen av inlägg")
    } finally {
      setLoading(false);
    }
  }

  const handleDeletePost = (id:number) => {
    setPosts(posts.filter(post=>post.id !== id));
  }

  return (
    <div className="p-4 pt-8 md:p-16">
      <h1>Välkommen {user?.name!}!</h1>
      <hr className="mt-2 mb-4" />

      <div className="flex justify-between items-baseline">
        <h2>Mina inlägg </h2>
        <Link to="/newPost" className="bg-blue-deep text-white ps-6 pe-4 py-2 rounded-lg flex justify-center items-center w-fit drop-shadow-sm hover:bg-blue-mid">Nytt inlägg <Plus className="ms-2" /></Link>
      </div>
      <PostTable posts={posts} onDelete={handleDeletePost} />
      {loading && <div className="flex items-center bg-white p-4 rounded mt-4 drop-shadow-sm text-blue-deep">
        Läser in inlägg... <SpinnerGap className="animate-spin ms-4" />
      </div>}
      {error && <div className="flex items-center bg-red-100 border border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
        <WarningCircle size={24} className="text-red-500 me-2" /> {error}      </div>}
    </div>
  )
}

export default ProfilePage