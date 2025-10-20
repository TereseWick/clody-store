'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [val, setVal] = useState('');
  const urlErr = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('error') : '';
  return (
    <form action="/api/admin-login" method="POST" className="max-w-sm mx-auto border rounded-2xl p-6">
      <h1 className="text-xl font-semibold mb-4">Admin login</h1>

      {urlErr && ( 
        <div className="mb-3 text-sm rounded-md border p-2">
        Feil nøkkel, prøv igjen.
        </div>
      )}

      <input
        type="password"
        name="key"
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Admin-nøkkel"
        className="w-full border rounded-md px-3 py-2"
      />
      <button className="mt-4 rounded-full border px-5 py-2">Logg inn</button>
    </form>
  );
}
