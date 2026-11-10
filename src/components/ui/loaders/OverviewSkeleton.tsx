export default function OverviewSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="space-y-2">
        <div className="h-6 w-32 rounded-sm bg-[#E3EADD]" />
        <div className="h-3 w-64 max-w-full rounded-sm bg-[#EFEFEA]" />
      </div>

      {/* Stats cards */}
      <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="border border-[#CFDAC8] bg-white p-5"
          >
            <div className="h-3 w-20 rounded-sm bg-[#EFEFEA]" />
            <div className="mt-3 h-10 w-16 rounded-sm bg-[#E3EADD]" />
          </li>
        ))}
      </ul>

      {/* Recent posts and manage */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Recent posts */}
        <section className="border border-[#CFDAC8] bg-white">
          <div className="flex items-center justify-between border-b border-[#CFDAC8] px-5 py-4">
            <div className="h-6 w-32 rounded-sm bg-[#E3EADD]" />
            <div className="h-3 w-14 rounded-sm bg-[#EFEFEA]" />
          </div>

          <ul className="divide-y divide-[#E3EADD]">
            {Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3.5 w-3/5 max-w-64 rounded-sm bg-[#E3EADD]" />
                  <div className="h-3 w-24 rounded-sm bg-[#EFEFEA]" />
                </div>

                <div className="h-6 w-20 shrink-0 rounded-sm bg-[#DCE6D2]" />
              </li>
            ))}
          </ul>
        </section>

        {/* Manage sidebar */}
        <section className="h-fit border border-[#CFDAC8] bg-white p-5">
          <div className="h-6 w-24 rounded-sm bg-[#E3EADD]" />

          <ul className="mt-5 flex flex-col gap-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <li key={index}>
                <div className="h-3.5 w-20 rounded-sm bg-[#EFEFEA]" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}