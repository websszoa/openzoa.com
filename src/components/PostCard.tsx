import type { Post } from "@/data/posts";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-background rounded-2xl border border-gray-200 overflow-hidden hover:bg-white/50 transition-bg cursor-pointer">
      {/* 콘텐츠 */}
      <div className="flex flex-col gap-3 p-5">
        {/* 아이콘 + 이름/URL + 점수 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
              <img
                src={`/images/${post.image}`}
                alt={post.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-tight">
                {post.name}
              </p>
              <p className="text-xs text-gray-400">{post.url}</p>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-[13px] font-nanum text-gray-600 leading-relaxed line-clamp-2">
          {post.description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
