import YarnImg from '../assets/yarn-8502110_640.jpg'
import { Link } from 'react-router-dom'
import { PostCardProps } from '../types/post.types'

const PostCard = ({ post, className }: PostCardProps) => {
    return (
        <Link to={`post/${post.id}`} className='transition ease-in-out delay-150 hover:-translate-y-4  duration-300'>
            <article className={`bg-white border-2 border-pink-deep rounded-lg p-0
        flex flex-col  ${className}`}>
                {/* Bild */}
                <div className='overflow-hidden h-32 sm:h-48'>
                    {
                        post.image_url ?
                            <img src={post.image_url} alt="" className='rounded  ' />
                            :
                            <img src={YarnImg} alt="Garn i olika färger" className='rounded  ' />
                    }
                </div>
                <div className='p-4 mb-6'>
                    <h3 className='text-xl font-semibold pt-4 pb-1 line-clamp-1'>{post.title}</h3>
                    <p className='text-sm font-medium uppercase text-dust-deep pb-4'>{post.user_name}, {new Date(post.created_at).toLocaleDateString('sv-SE')}</p>
                    <p className='col-span-2 text-ellipsis line-clamp-3 text-dust-deep '>{post.content}</p>
                </div>
            </article>
        </Link>
    )
}

export default PostCard