export interface Post {
    id: number,
    title: string,
    content: string,
    category: string,
    user_id: number,
    user_name: string,
    created_at: string,
}

export interface PostCardProps {
    post: Post,
    className?: string
}