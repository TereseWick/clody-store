'use client';

import { useRouter } from 'next/navigation';
import {useEffect, useState } from 'react';

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export default function ProductForm({ product }: { product?: any }) {
  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    priceNok: product?.priceNok?.toString() ?? '0',
    stock: product?.stock?.toString() ?? '0',
    description: product?.description ?? '',
    active: product?.active ?? true,
    imagesCsv: '',
  });

  useEffect(() => {
    if (!product && form.name && !form.slug) {
      setForm(f => ({ ...f, slug: slugify(form.name) }));
    }
  }, [form.name, form.slug, product]);

  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const images = form.imagesCsv
      .split(/[\n,]/)
      .map(s => s.trim())
      .filter(Boolean);

    const payload: any = {
      name: form.name,
      slug: form.slug,
      priceNok: parseInt(form.priceNok),
      stock: parseInt(form.stock),
      description: form.description,
      active: form.active,
      images,
    };

    if (product?.id) payload.id = product.id;

    const res = await fetch('/api/products', {
      method: product ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      const t = await res.text();
      alert('Kunne ikke lagre produktet: ' + t);
    } 
    };

  
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
        <textarea className="w-full border rounded-md px-3 py-2" 
        value={form.description} 
        onChange={e => setForm(f => ({...f, description: e.target.value}))} />
      </div>


      <div>
        <label className="block text-sm mb-1">Bilde-URLer (komma eller linjeskift)</label>
        <textarea 
        className="w-full border rounded-md px-3 py-2" 
        placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
        value={form.imagesCsv} 
        onChange={e => setForm(f => ({...f, imagesCsv: e.target.value}))} />
        <p className="text-sm text-gray-500 mt-1">Lim inn en eller flere offentlige bilde-lenker</p>
      </div>

      <div className="flex items-center gap-2">
        <input 
        type="checkbox" 
        checked={form.active} 
        onChange={e => setForm(f => ({...f, active: e.target.checked}))} />
        <span>Aktiv</span>
      </div>

      <button className="rounded-full border px-5 py-2">
        {product ? 'Oppdater' : 'Opprett'}
        </button>
    </form>
  );
}
