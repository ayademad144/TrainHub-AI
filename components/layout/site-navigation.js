export const siteNavigation = [
  { href: "/", label: "Home" },
  { href: "/#featured-platforms", label: "Platforms" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function isActiveNavigationItem(pathname, href) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}
