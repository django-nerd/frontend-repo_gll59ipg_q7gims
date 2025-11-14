import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Build a standout portfolio with AI
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-lg md:text-xl text-gray-700">
            Turn your skills, projects, and resume into a polished, recruiter-ready site in minutes.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
            <button onClick={onCTAClick} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg">
              Create Your Portfolio
              <ArrowRight size={18} />
            </button>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-sm text-gray-600 space-y-2">
            <li>• AI-written summary, bullet points, and project descriptions</li>
            <li>• Multiple templates: minimal, modern, creative, dark</li>
            <li>• Shareable URL and PDF export</li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
