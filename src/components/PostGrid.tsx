import type { Post } from '@/data/posts'
import PostCard from '@/components/PostCard'

type Props = {
  posts: Post[]
}

export default function PostGrid({ posts }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
