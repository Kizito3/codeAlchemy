export default function CaseStudyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <section className="bg-white pb-14 lg:pb-20">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {images.map((src, i) => {
            const wide = i % 3 === 0;
            return (
              <li key={src} className={wide ? "md:col-span-2" : ""}>
                <img
                  src={src}
                  alt={`${title} design detail ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover ${wide ? "aspect-video" : "aspect-4/3"}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}