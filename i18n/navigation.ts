import { createNavigation } from "next-intl/navigation";
import { locales } from "../i18n";

export const { Link, useRouter, usePathname } = createNavigation({
  locales
});