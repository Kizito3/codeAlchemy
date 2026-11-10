import type { ReactNode } from "react";

export default function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#CFDAC8] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[36px] leading-10 text-[#123D2B] lg:text-[44px] lg:leading-12">
          {title}
        </h1>
        {description && (
          <p className="mt-2 font-montserrat text-sm text-[#647466]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}