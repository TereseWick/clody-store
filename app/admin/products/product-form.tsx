'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductForm({ product }: { product?: any }) {
  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    priceNok: product?.priceNok?.toString() ?? '0',
    stock: product?.stock?.toString() ?? '0',
    description: product?.description ?? '',
    active: product?.active ?? true
  });
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: product ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, priceNok: parseInt(form.priceNok), stock: parseInt(form.stock), id: product?.id }),
    });
    if (res.ok) router.push('/admin/products');
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-3">
      {['name','slug','priceNok','stock'].map((k) => (
        <div key={k}>
          <label className="block text-sm mb-1">{k}</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            value={(form as any)[k]}
            onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
          />
        </div>
      ))}
      <div>
        <label className="block text-sm mb-1">description</label>
        <textarea className="w-full border rounded-md px-3 py-2" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({...f, active: e.target.checked}))} />
        <span>Aktiv</span>
      </div>
      <button className="rounded-full border px-5 py-2">{product ? 'Oppdater' : 'Opprett'}</button>
    </form>
  );
}
