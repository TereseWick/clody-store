export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Kloudy Studios • Org.nr. 123 456 789</p>
        <p className="mt-2">Angrerett 14 dager • Kontakt: hei@vesker.no</p>
      </div>
    </footer>
  );
}
