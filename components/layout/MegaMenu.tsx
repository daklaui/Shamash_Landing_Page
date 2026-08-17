import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight, Headphones, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import type { NavigationItem, ServiceId } from "@/data/localized";
import { SolutionMark } from "@/components/ui/SolutionMark";
import { cn } from "@/lib/cn";

const serviceIcons: Record<ServiceId, LucideIcon> = {
  "enterprise-software": Workflow,
  "ai-automation": Workflow,
  "cloud-security": ShieldCheck,
  "managed-it": Headphones
};

export function NavigationItemIcon({ icon }: { icon: NavigationItem["items"][number]["icon"] }) {
  if (!icon) return null;

  if (icon.kind === "solution") {
    return <SolutionMark id={icon.id} size="sm" />;
  }

  const Icon = serviceIcons[icon.id];
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-shamash-blue to-shamash-indigo text-white shadow-sm">
      <Icon aria-hidden="true" className="h-5 w-5" />
    </span>
  );
}

export function MegaMenu({
  item,
  menuId,
  open,
  onNavigate
}: {
  item: NavigationItem;
  menuId: string;
  open: boolean;
  onNavigate?: () => void;
}) {
  const t = useTranslations("common");
  if (item.items.length === 0) {
    return null;
  }

  return (
    <div
      id={menuId}
      aria-hidden={!open}
      className={cn(
        "absolute start-1/2 top-full z-50 -translate-x-1/2 pt-3 transition duration-200 ease-premium rtl:translate-x-1/2",
        item.items.length > 2
          ? "w-[min(860px,calc(100vw-2rem))]"
          : "w-[min(620px,calc(100vw-2rem))]",
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none -translate-y-1 opacity-0"
      )}
    >
      <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-premium">
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
          <p className="text-xs font-black uppercase tracking-[0.15em] text-shamash-indigo">{item.label}</p>
        </div>
        <div className={cn("grid gap-2 p-3", item.items.length > 2 && "grid-cols-2")}>
          {item.items.map((subItem) => (
            <Link
              key={`${item.id}-${subItem.id}`}
              href={subItem.href}
              onClick={onNavigate}
              data-mega-menu-link
              className="group/menu-link rounded-lg border border-transparent p-4 transition duration-snappy ease-premium hover:border-shamash-blue/20 hover:bg-sky-50/60 focus-visible:border-shamash-blue/30 focus-visible:bg-sky-50/60"
            >
              <div className="flex items-start gap-3">
                <NavigationItemIcon icon={subItem.icon} />
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold leading-5 text-shamash-navy">{subItem.label}</p>
                    <ChevronRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-shamash-blue transition-transform duration-snappy group-hover/menu-link:translate-x-0.5 rtl:rotate-180 rtl:group-hover/menu-link:-translate-x-0.5" />
                  </div>
                  <p className="mt-1 line-clamp-1 text-[0.68rem] font-bold uppercase leading-5 tracking-[0.1em] text-shamash-indigo">{subItem.eyebrow}</p>
                </div>
              </div>
              <p className={cn("mt-2 line-clamp-2 text-sm leading-6 text-neutral-text", subItem.icon && "ps-[3.25rem]")}>
                {subItem.description}
              </p>
            </Link>
          ))}
        </div>
        {item.overviewHref ? (
          <div className="border-t border-slate-100 p-3 pt-2">
            <Link
              href={item.overviewHref}
              onClick={onNavigate}
              data-mega-menu-link
              className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm font-bold text-shamash-navy transition duration-snappy ease-premium hover:bg-shamash-blue/10 focus-visible:bg-shamash-blue/10"
            >
              {t("navigation.viewAll", { section: item.label })}
              <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
