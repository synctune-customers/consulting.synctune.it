# Content and assets

## Edit the page

The complete branch site lives in `index.html`. Edit its project entries,
descriptions, availability labels and links directly. There is no content API
or generator. Optional carousel controls use native JavaScript.

Keep this page focused on this branch's work. Do not name or promote sibling
branches here; `synctune.it` is the only site with the branch-family overview.
A simple link back to the company can remain.

`assets/styles.css` contains the shared layout. `assets/brand.css` contains
this branch's approved accent and visual motif. Each branch repository ships
its own files; no website depends on another website's CSS or assets.

The public name is **Synctune Consulting**, and the site and repository are
`consulting.synctune.it`. Only the GitHub organization retains the
`synctune-customers` slug.

## Project links and confidentiality

The catalog is based on the branch's public GitHub profile and Matteo's public
project directory. Public source links use verified current repositories,
including projects still under `mbianchidev`. Some organization-profile links
describe planned transfers and must not be copied without checking them.
Update the company directory on `synctune.it` when changing branch entries.

Keep private projects unlinked and label their availability. Do not invent
release dates, store listings, testimonials or product screenshots.
Keep archived work and partner projects distinct from current releases and
company-owned projects.

The user authorized reusing the existing public customer and organization logo
lists from mbianchi.dev. Do not add private customer repositories, case studies
or delivery details. New logo references still need authorization.

Matteo's personal site is linked at `mbianchi.dev`. Denote, Open Playlist and
Moguri have independent websites. This repository does not build or deploy them.
FIRE Tools is a partner project from Fire Tools Inc, not a Synctune branch.

## Brand source and rights

Artwork and unmodified font files come from
[synctune-io/branding](https://github.com/synctune-io/branding),
approved snapshot `55764ef`. Use the branch's outlined SVGs without changing
their colors, proportions, padding or orientation.

Ink is `#111214` and paper is `#F5F2E9`. The branch accent in `brand.css` matches
its approved palette. Use accent on ink, paper on ink or ink on paper for text;
ink on an accent has the same contrast ratio as the approved reverse pair.
Do not use the bright accent as body text on paper.

The display face is Bricolage Grotesque, body text uses Work Sans, and metadata
uses DM Mono. Unmodified fonts are bundled in `assets/fonts/`; their original
SIL Open Font License notices are in `assets/fonts/licenses/`. Keep those
notices. No new license or trademark clearance is implied for brand artwork.

The approved Common ground silhouette and amber palette are unchanged.
Bundled SVG titles and the social card use the corrected Consulting name.
`assets/social.svg` is the outlined source for `assets/social.png`.

No third-party scripts, CDN resources, analytics, cookies, embedded media, forms
or booking widgets load on this site. Carousel controls run locally without
storage or network requests. Linked services have their own policies. Update
the page's privacy note if this behavior changes.

## Customer and partner logos

The logo lists and original assets come from
[mbianchidev/mbianchi.dev](https://github.com/mbianchidev/mbianchi.dev), revision
`f6831809021e723bf8c21dceb2aa98c0019fe90d`.

The Customers carousel has 29 curated entries from the public set. The old
Synctune image, KubeLab and the Various/ITIS entry are omitted, including their
unused assets. Eco-Mind is represented by the current Sourcesense wordmark.
Familiar brands appear first; the last seven entries are Omnistrate, Abila,
Zefi.ai, Tenutabene, GreenChic, Sourcesense and Coopolis, in that order.
The public list covers work, advising, teaching and employment; do not turn it
into claims about specific contracts.

The Partners carousel uses the 15 organizations from the homepage's
`src/components/TrustedBy.tsx`, in source order, with the OpenAI image replaced
by the mark used on OpenAI's official website. The user chose the Partners
heading. Keep the source's non-endorsement context; these logos are not
corporate endorsements or evidence of a formal company partnership.

Original files are bundled in `assets/customer-logos/` and
`assets/organization-logos/`. The source repository's license notice is retained
in `assets/logo-notices/SOURCE-LICENSE.txt`; organization marks remain their
owners' marks, not Synctune artwork.

The Sourcesense wordmark is taken from the official company's website. The
OpenAI mark is the original `openai.com/favicon.svg`, with its built-in color
scheme behavior retained; logo tiles explicitly use a light color scheme.
`assets/logo-notices/provenance.json` records both official source URLs and the
local checksums. Follow OpenAI's [brand guidelines](https://openai.com/brand/)
and keep the mark unchanged and subordinate to Synctune's branding.

`assets/carousels.js` scrolls both rows at 36 pixels per second. Each logo has
one list item: once the leading item has fully scrolled out, it moves to the
end and the scroll offset is compensated. Do not append cloned or duplicated
customer/partner sets. Pause/Play controls provide a persistent choice;
hover, keyboard focus, offscreen rows and hidden tabs suspend movement.
Previous/next buttons, keyboard navigation and direct pointer/wheel interaction
stop automatic scrolling until Play is selected again.

Manual button/keyboard navigation, printing and reduced-motion preferences
restore the original list order. Reduced motion disables automatic movement.
Native scrollable lists remain usable without JavaScript. Keep logo alt text,
source provenance and the original file contents when updating the sets.

## Before publishing a change

Preview narrow and wide screens. Check local assets, anchors, outbound
destinations and keyboard focus. Exercise both carousels with buttons, keyboard
and scrolling, including unique item counts through a full cycle, the loop
seam, Pause/Play, hover/focus interruption, reduced motion, hidden/offscreen
behavior, resizing and JavaScript disabled.
Check that both hero caption labels retain their clearance from the lower
decorative line. Open the privacy disclosure with the keyboard.
Keep `CNAME`, canonical URLs, `robots.txt` and `sitemap.xml` consistent if the
hostname changes. No install or build step is required.
