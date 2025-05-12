import { useLocation } from "react-router";

export default function CatchAll() {
  const location = useLocation();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>404 - Not Found</h1>
      <p>Page not found at {location.pathname}</p>
    </div>
  );
}
