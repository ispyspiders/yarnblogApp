import React, { useState } from 'react'
import { Post } from '../types/post.types';
import { Link } from "react-router-dom";

interface PostTableProps {
    posts: Post[],
    onDelete: (id: number) => void;
}

const PostTable = ({ posts, onDelete }: PostTableProps) => {
    const [deleteing, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (postId: number) => {
        if (window.confirm("Är du säker på att du vill radera detta inlägg?")) {
            try {
                setDeleting(true);
                const response = await fetch(`http://localhost:8000/api/posts/${postId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("yarnToken")
                    },
                });
                if (!response.ok) {
                    setError("Fel vid radering av inlägg")
                    throw Error;
                }
                onDelete(postId);
                setError(null);

            } catch (error) {
                console.log("Fel vid radering: ", error)
                setError("Ett fel inträffade vid radering av inlägg. Försök igen senare.")
            } finally {
                setDeleting(false);
            }
        }
    }

    return (
        <>

            {error && (
                <div className="bg-red-100 border border-red-500 rounded p-2 my-4 flex text-blue-deep text-sm">
                    {error}
                </div>
            )}
            {posts.length > 0 ? (
                <div className="rounded-lg overflow-x-hidden border border-pink-mid bg-white mt-2 max-w-screen-lg drop-shadow-sm">
                    <div className="overflow-x-scroll">
                        <table className="table-fixed w-full text-left" >
                            <thead className="border-b border-pink-mid text-blue-deep">
                                <tr>
                                    <th className="p-2 w-1/3">Titel</th>
                                    <th className="p-2">Postat</th>
                                    <th className="p-2 w-1/5">Kategori</th>
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr className="border-y border-pink-light hover:bg-pink-light" key={post.id}>
                                        <td className="p-2 font-semibold">{post.title}</td>
                                        <td className="p-2">{new Date(post.created_at).toLocaleDateString('sv-SE')}</td>
                                        <td className="p-2">{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</td>
                                        <td className="p-2 mx-auto text-center"><Link to={`/edit/${post.id}`} className='font-semibold me-2 text-dust-deep hover:underline'>Uppdatera</Link> |
                                            <button onClick={() => handleDelete(post.id)} className='font-semibold ms-2 text-red-800 hover:underline'>Radera</button></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

            ) : (
                <div className="rounded-lg overflow-x-hidden border border-pink-mid bg-white mt-2 max-w-screen-lg drop-shadow-sm p-2">
                    <p>Inga inlägg att läsa ut.</p>
                </div>
            )}
        </>
    )
}

export default PostTable