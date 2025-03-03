import { useEffect, useState } from "react";
import PostCard from "../components/PostCard"
import { SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { Post } from "../types/post.types";

const HomePage = () => {
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
      const resp = await fetch(`http://localhost:8000/api/posts`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      if (!resp.ok) {
        throw Error;
      }
      const data = await resp.json();
      const sortedPosts = data.sort((a: Post, b: Post) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA; // Nyast först
      });
      setPosts(sortedPosts.slice(0, 4));
      setError(null);
    } catch (error) {
      console.log("Något gick fel vid inläsning av inlägg.");
      setError("Något gick fel vid inläsningen av inlägg")
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="p-4 pt-8 md:p-16 bg-wave bg-cover">
        <h1 className="text-center">Välkommen till Garnbloggare!</h1>
        <p className="text-blue-deep text-center my-4 md:text-lg">En bloggplattform för dig som älskar garn och handarbete</p>
      </div>

      <section className="bg-pink-light py-2 px-4  md:px-16 md:py-4">
        <h2 className="mb-2 md:mb-4">Senaste inläggen</h2>
        {/* Laddar... */}
        {loading && <div className="flex items-center col-span-full bg-white p-4 rounded mt-4 drop-shadow-sm text-blue-deep">
          Läser in inlägg... <SpinnerGap className="animate-spin ms-4" />
        </div>}
        {/* Felmeddelande */}
        {error && <div className="flex items-center bg-red-100 border col-span-full border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
          <WarningCircle size={24} className="text-red-500 me-2" /> {error}      </div>}

        {/* Skriv ut inlägg */}
        {posts.length > 0 ? (
          <div className="grid gap-2 gap-x-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {

              posts.map((post, index) => (
                <PostCard post={post} key={index}
                  className={`${index === 3 ? 'md:hidden xl:block' : ''}`} />
              ))
            }

          </div>

        ) : (
          <div className="flex items-center bg-white p-4 rounded mt-4 drop-shadow-sm text-blue-deep">
            Inga inlägg att läsa ut.
          </div>
        )
        }
      </section>

    </>
  )
}

export default HomePage