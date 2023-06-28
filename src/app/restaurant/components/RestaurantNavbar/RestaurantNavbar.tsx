"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const RestaurantNavbar = ({ slug }: { slug: string }) => {
  const pathname = usePathname();

  const activeLinkStyle = (path: string) => {
    return pathname === path ? "font-bold " : "";
  };

  return (
    <nav className="flex text-reg border-b pb-2">
      <Link
        href={`/restaurant/${slug}`}
        className={`${activeLinkStyle(`/restaurant/${slug}`)}mr-7`}
      >
        Overview
      </Link>
      <Link
        href={`/restaurant/${slug}/menu`}
        className={`${activeLinkStyle(`/restaurant/${slug}/menu`)}mr-7`}
      >
        Menu
      </Link>
    </nav>
  );
};
