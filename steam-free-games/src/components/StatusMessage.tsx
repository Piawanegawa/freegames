type StatusMessageProps = { kind: "loading" | "empty" | "error" };

const messages: Record<StatusMessageProps["kind"], string> = {
  loading: "Loading Steam offers…",
  empty: "No qualifying offers are currently live.",
  error: "Could not retrieve Steam offers. Please check your connection and try again.",
};

export default function StatusMessage({ kind }: StatusMessageProps) {
  return <p className="status-message" role={kind === "error" ? "alert" : "status"}>{messages[kind]}</p>;
}
