import { useRef, useState } from 'react'
import Hero from './components/Hero'
import GeneratorForm from './components/GeneratorForm'
import Dashboard from './components/Dashboard'

function App() {
  const formRef = useRef(null)
  const [generated, setGenerated] = useState(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-white text-gray-900">
      <Hero onCTAClick={scrollToForm} />

      <section ref={formRef} className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Let AI build your portfolio</h2>
            <p className="text-gray-600">Provide your details or upload a resume. We’ll generate a professional summary, projects, work history, and more.</p>
            <GeneratorForm onGenerated={setGenerated} />
          </div>

          <div>
            {!generated ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold">Preview</h3>
                <p className="mt-2 text-gray-600">Your AI-generated content will appear here for preview and customization.</p>
              </div>
            ) : (
              <Dashboard generated={generated} />
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AI Portfolio Builder · Built with React, Tailwind, FastAPI
      </footer>
    </div>
  )
}

export default App
