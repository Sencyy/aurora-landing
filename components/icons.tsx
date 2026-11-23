type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function WhatsAppIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={1.4}>
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.5L3.5 20.5l1.4-4.5A8.4 8.4 0 1 1 20.5 11.6Z" />
      <path d="M8.6 8.2c.3-.7.7-.7 1-.7h.5c.2 0 .4 0 .6.5l.8 1.8c.1.3 0 .5-.1.7l-.5.6c-.2.2-.3.4-.1.7.4.7 1 1.4 1.8 1.9.4.2.7.3.9.1l.6-.6c.2-.2.4-.3.7-.2l1.7.8c.3.2.5.3.5.5v.5c0 .9-.7 1.6-1.5 1.8-.4.1-1 .2-1.7 0-1-.2-2.4-.9-3.6-2s-2-2.6-2.2-3.5c-.1-.7 0-1.3.1-1.9Z" />
    </svg>
  );
}

export function InstagramIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MapPinIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ClockIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ className, size = 22 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function PhoneIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.5 3.8h3l1.4 3.6-2 1.4a12 12 0 0 0 5.3 5.3l1.4-2 3.6 1.4v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function LeafIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 4c0 9-5.5 13-11 13a5 5 0 0 1-5-5C4 6.5 11 4 20 4Z" />
      <path d="M4 20c2-6 6.5-9.5 12-11.5" />
    </svg>
  );
}

export function CoffeeIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.5 8h12v5.5A5.5 5.5 0 0 1 11 19H10a5.5 5.5 0 0 1-5.5-5.5V8Z" />
      <path d="M16.5 9.5h1.8a2.7 2.7 0 0 1 0 5.4h-1.8" />
      <path d="M8 4.5v1.8M11.5 4.5v1.8" />
    </svg>
  );
}
