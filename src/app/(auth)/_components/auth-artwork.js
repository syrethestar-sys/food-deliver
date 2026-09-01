import Image from "next/image";

export function AuthArtwork() {
  return (
    <div className="relative hidden h-226 w-214 shrink-0 overflow-hidden rounded-md bg-muted lg:block">
      <Image
        src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1400&q=80"
        alt="Courier delivering a food order by bike"
        fill
        priority
        sizes="50vw"
        className="object-cover"
      />
    </div>
  );
}
