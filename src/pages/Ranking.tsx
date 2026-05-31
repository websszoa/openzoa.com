import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";
import { CATEGORIES } from "@/components/Category";
import { toSlug } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const topCategories = CATEGORIES.filter((c) => c.label !== "전체");

function CategoryColumn({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  const ranked = posts
    .filter((p) => p.tags?.includes(label))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="flex-shrink-0 w-72">
      {/* 카테고리 헤더 */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-center w-7 h-7 rounded border text-gray-700">
          <Icon size={14} />
        </div>
        <h2 className="text-gray-900 text-sm font-google-sans-flex">{label}</h2>
        <span className="text-xs text-gray-800 ml-auto">{ranked.length}개</span>
      </div>

      {/* 랭킹 리스트 */}
      <ol className="flex flex-col gap-2">
        {ranked.map((post) => (
          <Link
            key={post.id}
            to={`/tool/${toSlug(post.name)}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-background border border-gray-200 hover:bg-white/50 transition-shadow cursor-pointer"
          >
            {/* 아이콘 */}
            <div className="w-9 h-9 rounded overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
              <img
                src={`/images/${post.image}`}
                alt={post.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* 이름 + URL */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {post.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{post.url}</p>
            </div>

            {/* 점수 */}
            <span className="text-sm text-gray-700 flex-shrink-0 font-google-sans-flex">
              {post.score.toFixed(1)}
            </span>
          </Link>
        ))}
      </ol>
    </div>
  );
}

export default function Ranking() {
  return (
    <>
      <Header />

      <main className="py-8">
        {/* 페이지 타이틀 */}
        <div className="max-w-6xl mx-auto px-6 mb-16 mt-12">
          <p className="text-sm text-gray-500 tracking-widest uppercase mb-2">
            Top
          </p>
          <h1 className="text-4xl text-gray-900 font-google-sans-flex">
            Rankings by Category
          </h1>
        </div>

        {/* 가로 스크롤 섹션 */}
        <div
          className="overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          }}
        >
          <div className="flex gap-6 pr-6" style={{ width: "max-content" }}>
            {topCategories.map(({ label, icon }) => (
              <CategoryColumn key={label} label={label} icon={icon} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
