import React from 'react'
import YarnImg from '../assets/yarn-8502110_640.jpg'
import { Post } from '../types/post.types'
import { Link } from 'react-router-dom'

interface PostCardProps {
    post: Post,
    className?: string
}

const PostCard = ({ post, className }: PostCardProps) => {
    return (
        <Link to={`post/${post.id}`} className='transition ease-in-out delay-150 hover:-translate-y-4  duration-300'>
            <article className={`bg-white border-2 border-pink-deep rounded-lg p-0
        flex flex-col  ${className}`}>
                {/* Bild */}
                <div className='overflow-hidden h-32 sm:h-48'>
                    <img src={YarnImg} alt="Garn i olika färger" className='rounded  ' />
                </div>
                <div className='p-4 mb-6'>
                    <h3 className='text-xl font-semibold pt-4 pb-1'>{post.title}</h3>
                    <p className='text-sm font-medium uppercase text-dust-deep pb-4'>{post.user_id}, {post.created_at}</p>
                    <p className='col-span-2 text-ellipsis line-clamp-3 '>{post.content}</p>
                </div>
            </article>
        </Link>
    )
}

export default PostCard