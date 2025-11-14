import { useMemo } from 'react'

const templates = {
  minimal: ({ data }) => (
    <div className="font-sans">
      <h1 className="text-3xl font-bold">{data.contact?.name}</h1>
      <p className="mt-2 text-gray-700">{data.summary}</p>
      <h2 className="mt-6 font-semibold">Skills</h2>
      <ul className="list-disc ml-6 text-sm text-gray-700">
        {data.skills?.map((s,i)=> <li key={i}>{s}</li>)}
      </ul>
      <h2 className="mt-6 font-semibold">Projects</h2>
      <ul className="space-y-2">
        {data.projects?.map((p,i)=> (
          <li key={i} className="border p-3 rounded">
            <p className="font-medium">{p.title}</p>
            <p className="text-sm text-gray-600">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  ),
  modern: ({ data }) => (
    <div className="font-inter">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">{data.contact?.name}</h1>
          <p className="text-gray-600">{data.contact?.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm uppercase tracking-wider text-indigo-600">Professional Summary</p>
          <p className="max-w-md mt-1 text-gray-700">{data.summary}</p>
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills?.map((s,i)=> <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{s}</span>)}
          </div>
          <h2 className="text-lg font-semibold mt-6">Experience</h2>
          <ul className="mt-2 space-y-2">
            {data.experience?.map((e,i)=> <li key={i} className="text-sm text-gray-700">{e.details}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Projects</h2>
          <ul className="mt-2 space-y-2">
            {data.projects?.map((p,i)=> (
              <li key={i} className="border rounded p-3">
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-gray-600">{p.description}</p>
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-6">Education</h2>
          <ul className="mt-2 text-sm text-gray-700 list-disc ml-5">
            {data.education?.map((ed,i)=> <li key={i}>{ed.program || ed}</li>)}
          </ul>
        </div>
      </div>
    </div>
  ),
  creative: ({ data }) => (
    <div className="font-mono">
      <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">{data.contact?.name}</h1>
      <p className="mt-3 text-gray-700">{data.summary}</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.skills?.map((s,i)=> <span key={i} className="text-xs border px-2 py-1 rounded">{s}</span>)}
          </div>
        </div>
        <div>
          <h2 className="font-semibold">Projects</h2>
          <ul className="mt-2 space-y-2">
            {data.projects?.map((p,i)=> <li key={i} className="p-3 rounded bg-gradient-to-r from-indigo-50 to-pink-50">{p.title}: <span className="text-gray-700">{p.description}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  ),
  dark: ({ data }) => (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
      <h1 className="text-3xl font-bold">{data.contact?.name}</h1>
      <p className="mt-2 text-gray-300">{data.summary}</p>
      <h2 className="mt-6 font-semibold">Skills</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {data.skills?.map((s,i)=> <span key={i} className="text-xs bg-gray-800 px-2 py-1 rounded">{s}</span>)}
      </div>
      <h2 className="mt-6 font-semibold">Projects</h2>
      <ul className="mt-2 space-y-2">
        {data.projects?.map((p,i)=> <li key={i} className="p-3 rounded bg-gray-800">{p.title}: <span className="text-gray-300">{p.description}</span></li>)}
      </ul>
    </div>
  ),
}

export default function TemplatePreview({ data, theme }) {
  const Comp = useMemo(() => templates[theme] || templates.minimal, [theme])
  return (
    <div className="border rounded-xl p-6 bg-white">
      <Comp data={data} />
    </div>
  )
}
