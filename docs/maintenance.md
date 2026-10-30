# Content and assets

## Edit the page

The complete branch site lives in `index.html`. Edit its project entries,
descriptions, availability labels and links directly. There is no content API,
JavaScript or generator.

`assets/styles.css` contains the shared layout. `assets/brand.css` contains
this branch's approved accent and visual motif. Each branch repository ships
its own files; no website depends on another website's CSS or assets.

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

Customer identities, logos, private repositories and delivery details must not
be added without authorization. The Customers branch describes services, not
client projects.

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

No scripts, CDN resources, analytics, cookies, embedded media, forms or booking
widgets load on this site. Linked services have their own policies. Update the
page's privacy note if this behavior changes.

## Before publishing a change

Preview narrow and wide screens. Check local assets, anchors, outbound
destinations and keyboard focus. Open the privacy disclosure with the keyboard.
Keep `CNAME`, canonical URLs, `robots.txt` and `sitemap.xml` consistent if the
hostname changes. No install or build step is required.
