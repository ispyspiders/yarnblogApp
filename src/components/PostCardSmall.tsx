import YarnImg from '../assets/yarn-8502110_640.jpg'
import { Link } from 'react-router-dom'
import { PostCardProps } from '../types/post.types'


const PostCardSmall = ({ post, className }: PostCardProps) => {
    return (
        <Link to={`/post/${post.id}`} className='' >
            <article className={`bg-white border-2 border-pink-deep rounded-lg p-4 flex justify-between max-w-screen-md my-2 hover:bg-pink-light ${className}`}>
                <div className='me-8'>
                    <p className='text-sm font-medium uppercase text-dust-deep pb-4'>{post.user_name}, {new Date(post.created_at).toLocaleDateString('sv-SE')}</p>
                    <h3 className='text-xl font-semibold pb-1'>{post.title}</h3>
                    <p className='text-ellipsis line-clamp-2 text-dust-deep '>{post.content}</p>
                </div>

                {
                    post.image_url ?
                        <img src={post.image_url} alt="" className='rounded hidden sm:block sm:max-h-32 sm:max-w-32 ' />
                        :
                        <img src={YarnImg} alt="Garn i olika färger" className='rounded hidden sm:block sm:max-h-32 sm:max-w-32' />
                }

            </article>
        </Link>)
}

export default PostCardSmall