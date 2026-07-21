export default function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "success" | "warning" | "danger" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
