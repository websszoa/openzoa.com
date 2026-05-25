import type { Post } from '@/data/posts'

type Props = {
  post: Post
}

const tagIcons: Record<string, string> = {
  'Easter Egg': '✦',
  Motion: '✦',
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
      {/* Preview area */}
      <div className="h-52 bg-gray-50 flex items-center justify-center text-gray-200 text-4xl border-b border-gray-100">
        {post.image ? (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-300 text-6xl select-none">◯</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {post.badge && (
          <span
            className={`text-xs font-semibold tracking-widest uppercase mb-2 block ${
              post.badge === 'UPDATED' ? 'text-orange-500' : 'text-blue-500'
            }`}
          >
            {post.badge}
          </span>
        )}
        <h2 className="text-base font-semibold text-gray-900 leading-snug mb-1">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-sm text-gray-400 mb-3">{post.description}</p>
        )}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1">
            <span>{tagIcons[post.tag] ?? '✦'}</span>
            {post.tag}
          </span>
        </div>
      </div>
    </div>
  )
}
