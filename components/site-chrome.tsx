import { site } from "@/lib/site";

const links = [
	{ href: "#top", label: "Home" },
	{ href: "#videos", label: "Videos" },
	{ href: "#shorts", label: "Shorts" },
	{ href: "#instagram", label: "Instagram" },
	{ href: "#collaborate", label: "Collaborate" },
	{ href: "#about", label: "About" },
];

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-line bg-background/95">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
				<a href="#top" className="font-serif text-xl tracking-tight">
					{site.name}
				</a>
				<nav className="hidden items-center gap-6 text-sm text-muted md:flex">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="hover:text-foreground"
						>
							{link.label}
						</a>
					))}
				</nav>
				<a
					href="#collaborate"
					className="rounded-full bg-foreground px-4 py-2 text-xs tracking-[0.18em] text-background uppercase"
				>
					Collaborate
				</a>
			</div>
			<nav
				className="no-scrollbar flex gap-5 overflow-x-auto border-t border-line px-6 py-2.5 text-xs text-muted md:hidden"
				aria-label="Mobile navigation"
			>
				{links.map((link) => (
					<a key={link.href} href={link.href} className="shrink-0 hover:text-foreground">
						{link.label}
					</a>
				))}
			</nav>
		</header>
	);
}

export function SiteFooter() {
	return (
		<footer className="border-t border-line">
			<div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="font-serif text-2xl">{site.name}</p>
					<p className="mt-2 text-sm text-muted">{site.role}</p>
				</div>
				<div className="flex gap-6 text-sm text-muted">
					<a
						href={site.youtube.url}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-foreground"
					>
						YouTube
					</a>
					<a
						href={site.instagram.url}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-foreground"
					>
						Instagram
					</a>
					<a
						href={`mailto:${site.email}`}
						className="hover:text-foreground"
					>
						Email
					</a>
				</div>
			</div>
		</footer>
	);
}
