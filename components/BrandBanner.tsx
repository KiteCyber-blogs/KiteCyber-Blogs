export function BrandBanner({
  images,
  slot,
}: {
  images: string[];
  slot: "header" | "footer";
}) {
  if (images.length === 0) return null;

  return (
    <div className={`brand-banner brand-banner-${slot}`}>
      {images.map((src) => (
        <img
          key={src}
          src={src}
          alt={slot === "header" ? "KiteCyber header" : "KiteCyber footer"}
        />
      ))}
    </div>
  );
}
