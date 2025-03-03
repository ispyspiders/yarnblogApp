import { useEffect, useState } from "react";
import PostCardSmall from "../components/PostCardSmall"
import { SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { Post } from '../types/post.types'
import { url } from "../types/auth.types";


const BlogPage = () => {
  // states
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hämta inlägg vid initiell rendering
  useEffect(() => {
    getPosts();
  }, [])

  // Hämta inlägg
  const getPosts = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${url}/posts`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
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


  return (
    <div className="p-4 pt-8 md:p-16">
      <h1>Blogg</h1>
      {/* Laddar... */}
      {loading && <div className="flex items-center col-span-full bg-white p-4 rounded mt-4 drop-shadow-sm text-blue-deep">
        Läser in inlägg... <SpinnerGap className="animate-spin ms-4" />
      </div>}
      {/* Felmeddelande */}
      {error && <div className="flex items-center bg-red-100 border col-span-full border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
        <WarningCircle size={24} className="text-red-500 me-2" /> {error}
      </div>
      }

      {/* Skriv ut inlägg */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCardSmall post={post} />
        ))
      ) : (
        <div className="flex items-center bg-white p-4 rounded mt-4 drop-shadow-sm text-blue-deep">
          Inga inlägg att läsa ut.
        </div>
      )
      }
    </div>
  )
}

export default BlogPage