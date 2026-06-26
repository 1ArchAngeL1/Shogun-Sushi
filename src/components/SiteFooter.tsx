import Image from "next/image";
import Link from "next/link";
import logoSrc from "../../public/logo.png";
import treeSrc from "../../public/shogun-tree.png";
import type {Locale} from "@/lib/i18n.client";
import type {Dictionary} from "@/lib/dictionaries/en";

export function SiteFooter({
                               lang,
                               dict,
                           }: {
    lang: Locale;
    dict: Dictionary;
}) {
    return (
        <footer className="relative bg-shogun-cream text-shogun-charcoal border-t border-shogun-black/10">
            <div className="relative mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-4">
                <Image
                    src={treeSrc}
                    alt=""
                    aria-hidden
                    placeholder="blur"
                    sizes="(max-width: 768px) 120px, 220px"
                    className="absolute right-2 sm:right-4 top-6 bottom-6 w-auto h-[calc(100%-3rem)] object-contain object-right opacity-60 md:opacity-90 pointer-events-none select-none"
                />
                <div className="md:col-span-1">
                    <Image
                        src={logoSrc}
                        alt="Shogun Sushi"
                        placeholder="blur"
                        sizes="(max-width: 640px) 200px, 280px"
                        className="h-20 sm:h-24 w-auto select-none"
                    />
                </div>
                <div>
                    <div className="font-display tracking-[0.2em] text-shogun-black text-sm mb-3">
                        {dict.footer.hours}
                    </div>
                    <ul className="text-sm space-y-1 text-shogun-black/75">
                        <li>{dict.hours.daily}</li>
                    </ul>
                </div>
                <div>
                    <div className="font-display tracking-[0.2em] text-shogun-black text-sm mb-3">
                        {dict.footer.visit}
                    </div>
                    <address className="not-italic text-sm space-y-1 text-shogun-black/75">
                        <div>ილო მოსაშვილის 3</div>
                        <div>Tbilisi, Georgia</div>
                        <a href="tel:+995599130920" className="block hover:text-shogun-red">
                            +995 599 13 09 20
                        </a>
                        <a
                            href="mailto:info@shogunsushi.ge"
                            className="block hover:text-shogun-red"
                        >
                            info@shogunsushi.ge
                        </a>
                    </address>
                </div>
                <div>
                    <div className="font-display tracking-[0.2em] text-shogun-black text-sm mb-3">
                        {dict.footer.follow}
                    </div>
                    <ul className="flex gap-3 text-shogun-black/75">
                        <li>
                            <a
                                href="https://www.instagram.com/shogunsushi___/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-shogun-black/15 hover:text-shogun-red hover:border-shogun-red transition-colors"
                            >
                                <InstagramIcon/>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/shogunsushi.ge?mibextid=wwXIfr&rdid=1gjhjaIVflPB7YkC&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BbWHFAiaA%2F%3Fmibextid%3DwwXIfr#"
                                aria-label="Facebook"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-shogun-black/15 hover:text-shogun-red hover:border-shogun-red transition-colors"
                            >
                                <FacebookIcon/>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-label="TikTok"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-shogun-black/15 hover:text-shogun-red hover:border-shogun-red transition-colors"
                            >
                                <TikTokIcon/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-shogun-cream border-t border-shogun-black/10">
                <div
                    className="mx-auto max-w-6xl px-6 py-5 text-xs text-shogun-black/55 flex flex-wrap gap-3 justify-between">
          <span>
            © {new Date().getFullYear()} Shogun Sushi · {dict.footer.rights}
          </span>
                </div>
            </div>
        </footer>
    );
}

function InstagramIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none"/>
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
        >
            <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z"/>
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
        >
            <path d="M16.6 3h-2.7v12.3c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .5 0 .8.1V9.9c-.3 0-.5-.1-.8-.1-3 0-5.4 2.4-5.4 5.4S7.9 20.7 11 20.7s5.4-2.4 5.4-5.4V9.3a6.3 6.3 0 0 0 3.8 1.2V7.6c-1.9 0-3.5-1.5-3.6-3.4V3z"/>
        </svg>
    );
}
