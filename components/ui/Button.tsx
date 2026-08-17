import { Link } from "@/i18n/navigation";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type SharedButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  showIcon?: boolean;
  className?: string;
};

type LinkButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variants = {
  primary:
    "bg-[#0865d8] text-white shadow-[0_18px_38px_rgba(8,101,216,0.24)] hover:bg-[#0b73ef] hover:shadow-[0_22px_48px_rgba(8,101,216,0.28)] focus-visible:outline-shamash-blue",
  secondary:
    "border border-slate-200/80 bg-white text-shamash-navy shadow-[0_10px_24px_rgba(36,40,80,0.07)] hover:bg-slate-50 hover:shadow-[0_14px_30px_rgba(36,40,80,0.1)] focus-visible:outline-shamash-blue"
};

export function Button({
  children,
  variant = "primary",
  className,
  showIcon,
  ...props
}: ButtonProps) {
  const shouldShowIcon = showIcon ?? variant === "primary";
  const buttonClassName = cn(
    "group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-base font-black transition duration-snappy ease-premium hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className
  );
  const content = (
    <>
      <span>{children}</span>
      {shouldShowIcon ? (
        <span className="button-icon grid size-8 shrink-0 place-items-center rounded-full bg-white/18 text-white transition duration-snappy ease-premium group-hover:translate-x-1 group-hover:bg-white/24 rtl:group-hover:-translate-x-1">
          <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:rotate-180" />
        </span>
      ) : null}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={buttonClassName} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;
  return (
    <button className={buttonClassName} {...buttonProps}>
      {content}
    </button>
  );
}
