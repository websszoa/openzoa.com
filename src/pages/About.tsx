import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function About() {
  return (
    <>
      <Header />

      <AuroraBackground className="min-h-[60vh] px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeInOut" }}
          className="relative max-w-3xl w-full mx-auto"
        >
          <p className="text-sm text-gray-400 tracking-widest uppercase mb-4">
            About
          </p>
          <h1 className="text-4xl text-gray-900 leading-tight mb-6 font-google-sans-flex">
            A curated tool archive
            <br />
            for designers and engineers
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed font-nanum">
            openzoa is a curated platform for people exploring the space between
            design and development. We sort through countless tools, highlight
            the ones that are actually worth trying, and review them with clear
            scores.
          </p>
        </motion.div>
      </AuroraBackground>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-10">
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-lg font-google-sans-flex text-gray-900 mb-3">
              Why we built this
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed font-nanum">
              As AI tools keep appearing at a rapid pace, it is getting harder
              to know which ones are worth your time. Many tools look similar at
              first glance, and the real differences are often hard to spot.
              openzoa reduces that noise by testing tools directly and recording
              what each one does well.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-lg font-google-sans-flex text-gray-900 mb-3">
              How we score tools
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed font-nanum">
              Scores are based on polish, speed, output quality, and practical
              usefulness. The numeric score reflects overall quality, while the
              percentage shows how strongly we recommend it. Even if a tool has
              a lower score, we still feature it when it is genuinely useful for
              a specific workflow.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-lg font-google-sans-flex text-gray-900 mb-3">
              Contributions and tips
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed font-nanum">
              If you know a tool we have not covered yet, or if any information
              looks outdated or incorrect, please let us know. You can recommend
              new tools through the Submit page. Every submission is reviewed
              before it is added.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
