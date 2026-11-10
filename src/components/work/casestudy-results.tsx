export default function CaseStudyResults({
  results,
}: {
  results: { value: string; label: string }[];
}) {
  if (results.length === 0) return null;

  return (
    <section className="bg-[#0A2B20] py-12 lg:py-16">
      <div className="mx-auto max-w-360 px-6 lg:px-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {results.map((result) => (
            <div
              key={result.label}
              className="flex flex-col-reverse justify-end gap-3 border-t border-[#25453A] pt-5"
            >
              <dt className="font-montserrat text-sm leading-5 text-[#B8C4BB]">{result.label}</dt>
              <dd className="font-serif text-[44px] leading-none text-[#D5E6B8] lg:text-[56px]">
                {result.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}