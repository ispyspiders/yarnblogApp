export interface Post {
    id: number,
    title: string,
    content: string,
    category: string,
    user_id: number,
    user_name: string,
    image_file: string,
    image_url: string,
    created_at: string,
    updated_at: string,
}

export interface PostCardProps {
    post: Post,
    className?: string
}