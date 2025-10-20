import Link from 'next/link';

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li><Link className="underline" href="/admin/products">Produkter</Link></li>
        <li><Link className="underline" href="/admin/orders">Ordrer</Link></li>
      </ul>
    </div>
  );
}
