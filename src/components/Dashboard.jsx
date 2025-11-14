import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../utils/api'
import { Sparkles, Save, Eye, Moon, Sun } from 'lucide-react'
import TemplatePreview from './TemplatePreview'

export default function Dashboard({ generated }) {
  const [theme, setTheme] = useState('modern')
  const [dark, setDark] = useState(false)
  const [username, setUsername] = useState('your-handle')
  const [name, setName] = useState(generated?.contact?.name || '')
  const [ownerEmail, setOwnerEmail] = useState(generated?.contact?.email || '')
  const [data, setData] = useState(generated)
  const [status, setStatus] = useState('')

  useEffect(() => { setData(generated) }, [generated])

  const handleSuggest = async (text) => {
    const res = await apiPost('/api/suggest', { text, tone: 'professional' })
    return res.improved
  }

  const handleSave = async () => {
    setStatus('Saving...')
    try {
      const payload = {
        owner_email: ownerEmail || 'student@example.com',
        username,
        name: name || data?.contact?.name || 'Student',
        theme,
        dark_mode: dark,
        sections: [
          { key: 'summary', title: 'Summary', content: data.summary },
          { key: 'skills', title: 'Skills', content: data.skills },
          { key: 'projects', title: 'Projects', content: data.projects },
          { key: 'experience', title: 'Experience', content: data.experience },
          { key: 'education', title: 'Education', content: data.education },
          { key: 'achievements', title: 'Achievements', content: data.achievements },
          { key: 'contact', title: 'Contact', content: data.contact },
        ],
        assets: {},
        seo_title: `${name || data?.contact?.name} – Portfolio`,
        seo_description: data.summary?.slice(0, 150),
      }
      const res = await apiPost('/api/portfolio/save', payload)
      setStatus(`Saved! Public URL: ${window.location.origin}/u/${res.username}`)
    } catch (e) {
      setStatus(`Save failed: ${e.message}`)
    }
  }

  return (
    <div className={`mt-10 grid lg:grid-cols-2 gap-6 ${dark ? 'dark' : ''}`}>
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Customize</h3>
            <button onClick={() => setDark(!dark)} className="inline-flex items-center gap-2 text-sm text-gray-700">
              {dark ? <Sun size={16}/> : <Moon size={16}/>} {dark ? 'Light' : 'Dark'} mode
            </button>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <label className="text-sm">Public URL handle
              <input value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
            </label>
            <label className="text-sm">Display name
              <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
            </label>
            <label className="text-sm">Theme
              <select value={theme} onChange={e=>setTheme(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
                <option value="minimal">Minimal</option>
                <option value="modern">Modern</option>
                <option value="creative">Creative</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"><Save size={16}/> Save & Publish</button>
            <a href={`/u/${username}`} target="_blank" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"><Eye size={16}/> Preview</a>
          </div>
          {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold">Real-time AI Suggestions</h3>
          <p className="text-sm text-gray-600">Click to improve your summary instantly.</p>
          <button
            onClick={async () => {
              const improved = await handleSuggest(data.summary)
              setData({ ...data, summary: improved })
            }}
            className="mt-3 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            <Sparkles size={16}/> Improve Summary
          </button>
        </div>
      </div>

      <div>
        <TemplatePreview data={data} theme={theme} />
      </div>
    </div>
  )
}
