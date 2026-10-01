import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ozikoro.com — design deliverable" },
      {
        name: "description",
        content:
          "Static HTML and CSS design for ozikoro.com: the complete public and role-based interface system, design tokens and notes, for Ozi Ikoro Limited.",
      },
      { property: "og:title", content: "ozikoro.com — design deliverable" },
      {
        property: "og:description",
        content:
          "A complete responsive interface system in plain HTML and CSS for the Ozikoro history archive and researchers network.",
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
  ["Igbo Market Days", "/design/screens/market-days.html"],
  ["Folklore reader", "/design/screens/folklore-reader.html"],
  ["Listen library", "/design/screens/listen.html"],
  ["Folklores storybook", "/design/screens/folklore.html"],
  ["Modern article reader", "/design/screens/article.html"],
  ["About & verified published authors", "/design/screens/about.html"],
  ["Donation flow", "/design/screens/donate.html"],
  ["Sponsor flow", "/design/screens/sponsors.html"],
  ["Investor flow", "/design/screens/investors.html"],
  ["Reader dashboard", "/design/screens/dashboard-reader.html"],
  ["Student dashboard", "/design/screens/dashboard-student.html"],
  ["Teacher dashboard", "/design/screens/dashboard-teacher.html"],
  ["Researcher dashboard", "/design/screens/dashboard-researcher.html"],
  ["Independent researcher dashboard", "/design/screens/dashboard-independent-researcher.html"],
  ["Community knowledge holder dashboard", "/design/screens/dashboard-knowledge-holder.html"],
  ["Editor dashboard", "/design/screens/dashboard-editor.html"],
  ["Expert reviewer dashboard", "/design/screens/dashboard-reviewer.html"],
  ["Admin dashboard", "/design/screens/dashboard-admin.html"],
  ["Publishing workflow", "/design/screens/dashboard-workflow.html"],
  ["Evidence review", "/design/screens/dashboard-review.html"],
  ["Moderation queue", "/design/screens/dashboard-moderation.html"],
  ["Account settings", "/design/screens/dashboard-account.html"],
  ["System states", "/design/screens/dashboard-states.html"],
  ["Archive index", "/design/screens/archive-index.html"],
  ["Researcher profile", "/design/screens/researcher-profile.html"],
  ["Publication", "/design/screens/publication.html"],
  ["Upload & publish", "/design/screens/upload.html"],
  ["Documents & photographs", "/design/screens/documents.html"],
  ["Academy", "/design/screens/academy.html"],
  ["404", "/design/screens/404.html"],
  ["Igbo typeface proof", "/design/screens/type-test.html"],
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
          Design deliverable
        </p>
        <h1 className="mt-3 font-serif text-5xl font-semibold tracking-tight text-foreground">
          ozikoro.com
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground">
          Static HTML and CSS — no build step, no framework. Open the walkthrough to
          step through every screen, or jump straight to one.
        </p>

        <ul className="mt-10 divide-y divide-border border-y border-border">
          {screens.map(([label, href]) => (
            <li key={href}>
              <a
                className="block py-4 text-primary underline underline-offset-4 hover:text-primary/80"
                href={href}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted-foreground">
          The written rationale, inventory and every departure are in{" "}
          <a className="text-primary underline" href="/design/NOTES.md">
            NOTES.md
          </a>
          .
        </p>
      </main>
    </div>
  );
}
