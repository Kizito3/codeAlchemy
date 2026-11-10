import { Plus } from "lucide-react";

export default function PostsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-6 w-32 rounded-sm bg-[#E3EADD]" />
          <div className="h-3 w-64 max-w-full rounded-sm bg-[#EFEFEA]" />
        </div>

        <div className="flex h-12 w-32 items-center justify-center gap-2 rounded-[3px] bg-[#E3EADD]">
          <Plus className="size-4 text-[#AAB8A5]" strokeWidth={1.5} />
          <div className="h-3 w-16 rounded bg-[#CCD7C6]" />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex gap-2">
        <div className="h-8 w-16 rounded-sm bg-[#DCE6D2]" />
        <div className="h-8 w-24 rounded-sm bg-[#EFEFEA]" />
        <div className="h-8 w-20 rounded-sm bg-[#EFEFEA]" />
      </div>

      {/* Posts list */}
      <div className="mt-6 border border-[#CFDAC8] bg-white">
        <ul className="divide-y divide-[#E3EADD]">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between"
            >
              {/* Post information */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/5 max-w-72 rounded-sm bg-[#E3EADD]" />
                <div className="h-3 w-48 max-w-full rounded-sm bg-[#EFEFEA]" />
              </div>

              {/* Post actions */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="h-6 w-20 rounded-sm bg-[#DCE6D2]" />
                <div className="h-3 w-8 rounded-sm bg-[#EFEFEA]" />
                <div className="h-3 w-8 rounded-sm bg-[#EFEFEA]" />
                <div className="h-3 w-16 rounded-sm bg-[#EFEFEA]" />
                <div className="h-3 w-12 rounded-sm bg-[#EFEFEA]" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}