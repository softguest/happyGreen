import * as nextIntlNav from "next-intl/navigation";
import NextLink from "next/link";
import { useRouter as nextUseRouter, usePathname as nextUsePathname } from "next/navigation";
import { locales } from "./i18n";

const createSharedPathnamesNavigation =
  (nextIntlNav as any).createSharedPathnamesNavigation ??
  (() => ({
    Link: NextLink,
    useRouter: nextUseRouter,
    usePathname: nextUsePathname,
  }));

export const { Link, useRouter, usePathname } =
  createSharedPathnamesNavigation({ locales });