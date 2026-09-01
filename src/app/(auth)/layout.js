import { AuthArtwork } from "./_components/auth-artwork";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <AuthArtwork />
    </div>
  );
}
