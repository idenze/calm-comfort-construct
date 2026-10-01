import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ozikoro.com — design deliverable" },
      {
        name: "description",
        content:
          "Static HTML and CSS design for ozikoro.com: ten screens, design tokens and notes, for Ozi Ikoro Limited.",
      },
      { property: "og:title", content: "ozikoro.com — design deliverable" },
      {
        property: "og:description",
        content:
          "Ten screens in plain HTML and CSS for the Ozikoro history archive and researchers network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const screens = [
  ["Walkthrough — every screen", "/design/index.html"],
  ["Home", "/design/screens/home.html"],
  ["An article (long-form)", "/design/screens/article.html"],
  ["Archive index with filters", "/design/screens/archive-index.html"],
  ["Researcher profile", "/design/screens/researcher-profile.html"],
  ["Publication page", "/design/screens/publication.html"],
  ["Upload & publish flow", "/design/screens/upload.html"],
  ["Documents & photographs", "/design/screens/documents.html"],
  ["The Academy landing", "/design/screens/academy.html"],
  ["About / the institution", "/design/screens/about.html"],
  ["404", "/design/screens/404.html"],
  ["Igbo typeface proof", "/design/screens/type-test.html"],
];

function Index() {
  return (
    <div className="min-h-screen bg-[#faf6ef] text-[#1d1a16]">
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.09em] text-[#6b6358]">
          Design deliverable
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight text-[#0f0d0b]">
          ozikoro.com
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3a332b]">
          Static HTML and CSS — no build step, no framework. Open the walkthrough to
          step through every screen, or jump straight to one.
        </p>

        <ul className="mt-10 divide-y divide-[#e4dac8] border-y border-[#e4dac8]">
          {screens.map(([label, href]) => (
            <li key={href}>
              <a
                className="block py-4 text-[#7a2e1d] underline underline-offset-4 hover:text-[#5a1f12]"
                href={href}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-[#6b6358]">
          The written rationale, inventory and every departure are in{" "}
          <a className="text-[#7a2e1d] underline" href="/design/NOTES.md">
            NOTES.md
          </a>
          .
        </p>
      </main>
    </div>
  );
}
