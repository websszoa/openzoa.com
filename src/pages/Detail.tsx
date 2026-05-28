import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/data/posts";
import { toolContent } from "@/content";
import { toSlug } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Image, Layers3, PenTool } from "lucide-react";
import { CATEGORIES } from "@/components/Category";

const affinityDetail = {
  eyebrow: "Professional design suite",
  headline: "A full creative workspace for design, photo, and layout work.",
  summary:
    "Affinity brings vector design, image editing, and publication layout into one unified app. It feels closer to a professional desktop tool than a lightweight web editor, making it a strong option for designers who want precise control without committing to an Adobe-style subscription.",
  features: [
    {
      title: "Vector design",
      description:
        "Create icons, interface assets, illustrations, brand graphics, and production-ready vector artwork with detailed control.",
      icon: PenTool,
    },
    {
      title: "Photo editing",
      description:
        "Handle retouching, compositing, masks, color adjustments, and export work for social, product, and campaign visuals.",
      icon: Image,
    },
    {
      title: "Page layout",
      description:
        "Design editorial pages, reports, brochures, and multi-page documents without leaving the same creative environment.",
      icon: Layers3,
    },
  ],
  bestFor: [
    "Designers who want one desktop app for visual production",
    "Small teams that need professional tools with lower software costs",
    "Creators moving between illustration, image editing, and document layout",
  ],
  watchouts: [
    "Collaboration is not as web-native as Figma or Canva",
    "Advanced AI features are tied to Canva Premium",
    "Teams already deep in Adobe workflows may need time to migrate assets",
  ],
  workflow: ["Design", "Retouch", "Layout", "Export"],
};


export default function Detail() {
  const { slug } = useParams();
  const post = posts.find((p) => toSlug(p.name) === slug);

  if (!post) {
    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-gray-400">도구를 찾을 수 없습니다.</p>
          <Link
            to="/"
            className="text-sm text-gray-600 underline mt-4 inline-block"
          >
            홈으로 돌아가기
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const scoreColor =
    post.score >= 8
      ? "text-green-500"
      : post.score >= 6
        ? "text-blue-500"
        : post.score >= 4
          ? "text-yellow-500"
          : "text-gray-400";

  const alternatives = posts
    .filter(
      (p) => p.id !== post.id && p.tags?.some((t) => post.tags?.includes(t)),
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const isAffinity = post.id === 2;

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* 뒤로가기 */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* 왼쪽: 상세 내용 */}
          <div>
            {/* 툴 헤더 */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
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
                <h1 className="text-2xl font-semibold text-gray-900">
                  {post.name}
                </h1>
                <a
                  href={
                    post.url.startsWith("http")
                      ? post.url
                      : `https://${post.url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
                >
                  {post.url}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* 태그 */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* 설명 */}
            {toolContent[toSlug(post.name)] ? (
              <div
                className="prose prose-sm max-w-none font-nanum text-gray-600
                [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-gray-900 [&_h1]:mt-10 [&_h1]:mb-4
                [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3
                [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-2
                [&_p]:leading-relaxed [&_p]:mb-4
                [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-1
                [&_li]:list-disc [&_li]:text-gray-600
                [&_hr]:border-gray-100 [&_hr]:my-8"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {toolContent[toSlug(post.name)]}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-600 leading-relaxed text-base font-nanum">
                {post.description}
              </p>
            )}

            {isAffinity && (
              <div className="mt-12 space-y-10">
                <section className="border border-gray-200 bg-white rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="p-8 md:p-10">
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                        {affinityDetail.eyebrow}
                      </p>
                      <h2 className="text-3xl text-gray-900 leading-tight font-google-sans-flex mb-5">
                        {affinityDetail.headline}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed font-nanum">
                        {affinityDetail.summary}
                      </p>
                    </div>

                    <div className="bg-[#101511] p-8 md:p-10 text-white flex flex-col justify-between gap-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#8ff361] flex items-center justify-center">
                        <img
                          src="/svg/affinity.svg"
                          alt=""
                          className="w-10 h-10"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-2">
                          Current model
                        </p>
                        <p className="text-2xl font-semibold leading-tight">
                          Free core app with optional Canva AI features.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* 오른쪽: 사이드바 */}
          <div className="space-y-6 self-start sticky top-8">
            {/* 카테고리별 갯수 */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-white">
              {CATEGORIES.filter((c) => c.label !== '전체').map(({ label }) => {
                const count = posts.filter((p) => p.tags?.includes(label)).length
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-700">{label}</span>
                    <span className={`text-sm font-semibold ${count > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
                      {count > 0 ? count : 'n/a'}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* 점수 */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-white">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                Score
              </p>
              <div className="flex items-end gap-2">
                <span className={`text-5xl font-bold ${scoreColor}`}>
                  {post.score.toFixed(1)}
                </span>
                <span className="text-gray-300 text-xl mb-1">/ 10</span>
              </div>

              {/* 점수 바 */}
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full transition-all"
                  style={{ width: `${(post.score / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* Coverage */}
            <div className="border border-gray-100 rounded-2xl p-6 bg-white">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                Coverage
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {post.percent}%
              </p>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-300 rounded-full transition-all"
                  style={{ width: `${post.percent}%` }}
                />
              </div>
            </div>

            {/* 링크 */}
            <a
              href={
                post.url.startsWith("http") ? post.url : `https://${post.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Visit Site
              <ExternalLink size={14} />
            </a>

            {/* 대안 도구 */}
            {alternatives.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                  Alternatives to {post.name}
                </p>
                <div className="flex flex-col gap-2">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.id}
                      to={`/tool/${toSlug(alt.name)}`}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                        <img
                          src={`/images/${alt.image}`}
                          alt={alt.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {alt.name}
                      </span>
                      <span className="ml-auto text-sm text-gray-400">
                        {alt.score.toFixed(1)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
