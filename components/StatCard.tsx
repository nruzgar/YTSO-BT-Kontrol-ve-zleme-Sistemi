export default function StatCard({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
