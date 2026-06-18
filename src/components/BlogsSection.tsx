import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from '../types';
import { PenTool, Calendar, BookOpen, Eye, ArrowLeft, Send, CheckCircle, Quote, Sparkles } from 'lucide-react';

interface BlogsSectionProps {
  initialBlogs: BlogPost[];
  accentClass: string;
  cardBgClass: string;
}

export default function BlogsSection({ initialBlogs, accentClass, cardBgClass }: BlogsSectionProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('portfolio_blogs_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialBlogs;
      }
    }
    return initialBlogs;
  });

  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);

  // Form Fields
  const [draftTitle, setDraftTitle] = useState('');
  const [draftCategory, setDraftCategory] = useState('General');
  const [draftExcerpt, setDraftExcerpt] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio_blogs_v2', JSON.stringify(blogs));
  }, [blogs]);

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draftTitle || !draftContent) return;

    const newBlog: BlogPost = {
      id: `custom-blog-${Date.now()}`,
      title: draftTitle,
      excerpt: draftExcerpt || draftContent.substring(0, 110) + '...',
      content: draftContent,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.max(1, Math.ceil(draftContent.split(' ').length / 180))} min read`,
      category: draftCategory,
      views: 1,
    };

    setBlogs([newBlog, ...blogs]);
    setSuccessMsg(true);

    // Fade notification out
    setTimeout(() => {
      setSuccessMsg(false);
      setIsDrafting(false);
      // Clean up fields
      setDraftTitle('');
      setDraftExcerpt('');
      setDraftContent('');
      setDraftCategory('General');
    }, 1800);
  };

  const selectedBlog = blogs.find((b) => b.id === selectedBlogId);

  return (
    <div id="blogs-section-wrapper" className="space-y-6">
      <AnimatePresence mode="wait">
        {selectedBlog ? (
          /* Full immersive reading article overlay view */
          <motion.div
            key="article-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={`p-6 sm:p-8 rounded-2xl ${cardBgClass} space-y-6 border border-stone-200/55 max-w-3xl mx-auto`}
          >
            {/* Back to blogs main list */}
            <button
              onClick={() => setSelectedBlogId(null)}
              className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 hover:text-stone-900 transition-colors uppercase bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Articles Feed
            </button>

            {/* Read Time / Category Header */}
            <div className="flex flex-wrap gap-2 items-center text-xs font-mono text-stone-500 pt-2 border-b border-stone-100 pb-4">
              <span className="font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 uppercase text-[10px]">
                {selectedBlog.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {selectedBlog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> {selectedBlog.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {selectedBlog.views} Reads
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              {selectedBlog.title}
            </h3>

            {/* Content body split down with structural paragraph renderer */}
            <div className="text-stone-700 leading-relaxed text-sm sm:text-base space-y-4 font-sans whitespace-pre-line pt-2">
              {selectedBlog.content}
            </div>

            {/* Postscript Signature card */}
            <div className="bg-stone-50 rounded-xl p-4.5 border border-stone-100 mt-8 flex gap-4 items-start">
              <div className="p-2.5 rounded-full bg-stone-200 text-stone-500">
                <Quote className="h-4 w-4 stroke-[2]" />
              </div>
              <div>
                <p className="text-xs text-stone-400 font-mono">AUTHORIZED WRITING</p>
                <p className="text-xs text-stone-600 italic mt-1 leading-normal">
                  "Thanks for reading. Part of my ongoing journey as a software engineering fresher cataloging algorithms, user behaviors, and physical canvas animations."
                </p>
                <p className="text-[11px] font-bold text-stone-800 mt-1.5">— Vishwas Shiroor Mat</p>
              </div>
            </div>
          </motion.div>
        ) : isDrafting ? (
          /* Composer panel for drafting a custom blog posts */
          <motion.div
            key="drafting-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`p-6 rounded-2xl ${cardBgClass} border border-stone-200/50 max-w-2xl mx-auto space-y-5`}
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-amber-600" />
                <h4 className="font-extrabold text-stone-900 text-lg">Author Cabin Workspace</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsDrafting(false)}
                className="text-xs text-stone-500 hover:text-stone-900 font-mono bg-stone-100 px-2.5 py-1 rounded-lg"
              >
                Cancel
              </button>
            </div>

            {successMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-8 text-center space-y-2">
                <CheckCircle className="h-10 w-10 mx-auto text-emerald-600 animate-bounce" />
                <h5 className="font-bold text-base">Article Published!</h5>
                <p className="text-xs text-emerald-600 font-mono">Updating local storage buffer loops...</p>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-stone-500 uppercase">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="e.g. My First Experience Writing CSS-in-JS vs Tailwind"
                    className="w-full text-sm p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-stone-500 uppercase">Category Tag</label>
                    <select
                      value={draftCategory}
                      onChange={(e) => setDraftCategory(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-white cursor-pointer"
                    >
                      <option value="General">General Technology</option>
                      <option value="TypeScript">TypeScript / Javascript</option>
                      <option value="Productivity">Personal Productivity</option>
                      <option value="Interactions">UX & Particle Interactions</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-bold text-stone-500 uppercase">Brief Excerpt</label>
                    <input
                      type="text"
                      value={draftExcerpt}
                      onChange={(e) => setDraftExcerpt(e.target.value)}
                      placeholder="e.g. A review of standard visual elements..."
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-bold text-stone-500 uppercase">Article Body (Plain Text) *</label>
                  <textarea
                    required
                    rows={8}
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    placeholder="Type your markdown-style article text here. Separate paragraphs with double Enters as standard."
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-white font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 text-white bg-amber-600 hover:bg-amber-700 transition duration-200 ${accentClass}`}
                >
                  <Send className="h-3.5 w-3.5" /> Publish to My Portfolio
                </button>
              </form>
            )}
          </motion.div>
        ) : (
          /* Primary Articles feed container list */
          <motion.div
            key="feed-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header banner area */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-100/50 border border-stone-200/50 p-4 rounded-xl">
              <div>
                <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500 animate-spin-slow" /> Personal Developer Logs
                </h4>
                <p className="text-xs text-stone-500">Thoughts on responsive coding, systems engineering, and state trackers.</p>
              </div>

              <button
                onClick={() => setIsDrafting(true)}
                className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all text-white ${accentClass}`}
              >
                <PenTool className="h-3.5 w-3.5" /> Write Custom Article
              </button>
            </div>

            {/* Articles feed list mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    // Pre-increment read metric and select
                    setBlogs((prev) =>
                      prev.map((it) => (it.id === b.id ? { ...it, views: it.views + 1 } : it))
                    );
                    setSelectedBlogId(b.id);
                  }}
                  className={`p-5 rounded-xl border border-stone-200/40 hover:border-amber-400/50 hover:shadow-md cursor-pointer transition-all duration-300 ${cardBgClass} flex flex-col justify-between group`}
                >
                  <div className="space-y-2">
                    {/* Excerpt Meta tags */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                      <span className="font-semibold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded leading-none uppercase">
                        {b.category}
                      </span>
                      <span>{b.date}</span>
                    </div>

                    <h5 className="font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors leading-snug">
                      {b.title}
                    </h5>

                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 font-sans">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-1 mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {b.readTime}
                    </span>
                    <span className="text-amber-600 group-hover:translate-x-1 transition duration-155 font-bold">
                      Read Article →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
