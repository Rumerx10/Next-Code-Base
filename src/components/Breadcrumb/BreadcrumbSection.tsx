"use client";

import { CapFirstLetter } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbSection = () => {
  const pathName = usePathname();
  const segments = pathName
    .split("/")
    .filter(Boolean)
    .map((seg) => decodeURIComponent(seg));

  const breadcrumbItems = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    return {
      href,
      label: CapFirstLetter(segment),
    };
  });
  return (
    <div className="container flex items-center w-full text-2xl font-semibold h-16 py-5">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, idx) => (
            <BreadcrumbItem key={item.href}>
              {idx === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage className="text-[#1561BC] font-medium text-sm">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink className="font-medium" href={item.href}>
                    {item.label}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbSection;
