import { useRequireAuth } from "../utils/useRequireAuth";

export default function ProtectedPage() {
  useRequireAuth();

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Only visible when logged in.</p>
    </div>
  );
}
