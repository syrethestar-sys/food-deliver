import { AuthArtwork } from "./_components/auth-artwork";

export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <AuthArtwork />
    </div>
  );
}
