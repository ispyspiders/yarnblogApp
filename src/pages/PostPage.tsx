import { useEffect, useState } from "react";
import { SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { Post } from '../types/post.types'
import { useParams } from "react-router-dom";
import YarnImg from '../assets/yarn-8502110_640.jpg'


const PostPage = () => {
  // states
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams<{ id: string }>(); // id från adressrad

  // Hämta inlägg vid initiell rendering
  useEffect(() => {
    getPost();
  }, [])

  // Hämta inlägg
  const getPost = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`http://localhost:8000/api/posts/${id}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      if (!resp.ok) {
        throw Error;
      }
      const data = await resp.json() as Post;
      setPost(data);
      setError(null);
    } catch (error) {
      console.log("Något gick fel vid inläsning av inlägg.");
      setError("Något gick fel vid inläsningen av inlägg")
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='p-4 pt-8 md:p-16'>
      {
        post ? (
          <div className="bg-white rounded-lg p-4 sm:grid sm:grid-cols-2 gap-4">
            {post.image_file ?
              <img src={post.image_url} alt="" />
              :
              <img src={YarnImg} alt="Garn" />
            }
            <div>
              <div className="border-b pb-2">
                <h1 className="text-4xl mt-4">{post.title}</h1>
                <p className="text-sm">Av <span className="font-bold text-dust-deep">{post.user_name}</span> i <span className="font-semibold text-dust-deep">{post.category}</span>, {new Date(post.created_at).toLocaleDateString('sv-SE')}</p>
              </div>
              <p className="p-4">{post.content}</p>
            </div>


          </div>
        ) : (
          <h1>Inlägg</h1>
        )
      }
      {loading &&
        <div className="flex items-center bg-white p-4 rounded mt-4 drop-shadow-sm text-blue-deep">
          Läser in inlägg... <SpinnerGap className="animate-spin ms-4" />
        </div>
      }
      {error &&
        <div className="flex items-center bg-red-100 border border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
          <WarningCircle size={24} className="text-red-500 me-2" /> {error}
        </div>
      }
    </div>
  )
}

export default PostPage