import { useState } from 'react'
import { apiPost, apiUpload } from '../utils/api'
import { Upload, Sparkles, Download } from 'lucide-react'

export default function GeneratorForm({ onGenerated }) {
  const [form, setForm] = useState({
    name: '',
    skills: '',
    education: '',
    projects: '',
    experience: '',
    achievements: '',
    contact_email: ''
  })
  const [uploadInfo, setUploadInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const res = await apiUpload(file)
      setUploadInfo(res)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        name: form.name,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        education: form.education.split('\n').map(s => s.trim()).filter(Boolean),
        projects: form.projects.split('\n').map(s => s.trim()).filter(Boolean),
        experience: form.experience.split('\n').map(s => s.trim()).filter(Boolean),
        achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean),
        contact_email: form.contact_email,
        tone: 'professional'
      }
      const data = await apiPost('/api/generate', payload)
      onGenerated(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold">AI Resume/Portfolio Generator</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="border rounded px-3 py-2" />
        <input name="contact_email" value={form.contact_email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2" />
        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" className="md:col-span-2 border rounded px-3 py-2" />
        <textarea name="education" value={form.education} onChange={handleChange} placeholder="Education (one per line)" rows={3} className="md:col-span-2 border rounded px-3 py-2" />
        <textarea name="projects" value={form.projects} onChange={handleChange} placeholder="Projects (one per line)" rows={4} className="md:col-span-2 border rounded px-3 py-2" />
        <textarea name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (one per line)" rows={4} className="md:col-span-2 border rounded px-3 py-2" />
        <textarea name="achievements" value={form.achievements} onChange={handleChange} placeholder="Achievements (one per line)" rows={3} className="md:col-span-2 border rounded px-3 py-2" />
      </div>

      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer text-indigo-700">
          <Upload size={16} /> Upload resume/project file
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
        {uploadInfo && (
          <span className="text-xs text-gray-600">Uploaded: {uploadInfo.meta.filename}</span>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button onClick={handleGenerate} disabled={loading} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          <Sparkles size={16} /> {loading ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>
    </div>
  )
}
