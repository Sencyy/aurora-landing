"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, WhatsAppIcon } from "./icons";
import { shortHours, whatsappUrl } from "@/lib/format";
import type { Site } from "@/lib/types";

const links = [
  { href: "/", label: "Início" },
  { href: "/cardapio/", label: "Cardápio" },
  { href: "/sobre/", label: "Sobre nós" },
  { href: "/contato/", label: "Contato" },
];

const normalize = (path: string) => (path.endsWith("/") ? path : `${path}/`);

export function Nav({ site }: { site: Site }) {
  const pathname = normalize(usePathname() ?? "/");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setOpen(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (dialog.open) dialog.close();
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("drawer-open", open);
    return () => document.documentElement.classList.remove("drawer-open");
  }, [open]);

  function openDrawer() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeDrawer() {
    dialogRef.current?.close();
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.nome} — página inicial`}>
          <BrandMark />
          <span className="brand-text">
            <span className="brand-name">{site.nome}</span>
            <span className="brand-tagline">Cafeteria &amp; torrefação</span>
          </span>
        </Link>

        <nav className="site-nav d-none lg:d-flex ms-auto" aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          className="btn-solid theme-primary header-cta ms-auto lg:ms-0"
          href={whatsappUrl(site)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} />
          <span className="d-none sm:d-inline">Pedir no WhatsApp</span>
          <span className="sm:d-none">Pedir</span>
        </a>

        <button
          type="button"
          className="btn-icon menu-toggle lg:d-none"
          onClick={openDrawer}
          aria-label="Abrir menu de navegação"
          aria-haspopup="dialog"
        >
          <MenuIcon />
        </button>
      </div>

      <dialog ref={dialogRef} className="site-drawer" aria-labelledby="drawer-title">
        <div className="drawer-top">
          <h2 id="drawer-title" className="brand-name">
            Menu
          </h2>
          <button type="button" className="btn-close" onClick={closeDrawer} aria-label="Fechar menu" />
        </div>

        <nav className="drawer-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="drawer-link"
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          className="btn-solid theme-primary w-100 mt-6"
          href={whatsappUrl(site)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeDrawer}
        >
          <WhatsAppIcon size={18} />
          Pedir no WhatsApp
        </a>

        <div className="drawer-hours">
          <p className="eyebrow">Horários</p>
          {shortHours(site).map((line) => (
            <p key={line} className="text-sm fg-2 mb-1">
              {line}
            </p>
          ))}
        </div>
      </dialog>
    </header>
  );
}

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <path d="M6 20A10 10 0 0 1 26 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 20h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="11.5" r="2.2" fill="currentColor" />
    </svg>
  );
}
