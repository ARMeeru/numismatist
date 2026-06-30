# Numismatist.app PRD v3

## Document Status

**Version:** v3.1 consolidated PRD  
**Product:** Numismatist.app  
**Status:** Planning / MVP specification  
**Audience:** Product, design, engineering, and launch stakeholders  
**Last updated:** 2026-06-30

This document consolidates the full planning discussion, product manager review, MVP revisions, v2.1 clarifications, and v2.2 engineering edge cases into one build-ready PRD.

Where this PRD conflicts with earlier notes, this PRD is authoritative.

**Before stack selection, read [§36 Pre-Build Decisions (Tier 1)](#36-pre-build-decisions-tier-1).** It resolves four decisions that block the data model and tech stack: authentication, the year/date model, storage quotas, and account deletion. Where §36 conflicts with earlier sections, §36 is authoritative.

---

# 1. Product Summary

## 1.1 Concept

**Numismatist.app** is a beautiful, secure, web-based coin archive and showcase where collectors can catalog coins, preserve provenance, add historical context, and share museum-style collection pages.

## 1.2 One-Liner

Create museum-style digital exhibits for your coin collection.

## 1.3 Product Promise

Turn your coin collection into a beautiful, portable, and secure digital archive.

## 1.4 Core Thesis

Most coin collection tools are useful but visually utilitarian. Numismatist.app should win by making collectors feel like curators of a personal museum.

The product should make someone think:

> This makes my collection look like it belongs in a museum.

## 1.5 MVP Summary

The MVP should let a collector:

1. Create an account.
2. Create a collector profile.
3. Add coins quickly.
4. Add optional advanced numismatic metadata.
5. Upload obverse, reverse, and additional images.
6. Preserve provenance privately.
7. Export their data.
8. Organize coins into collections.
9. Share public or unlisted museum-style collection pages.
10. Let visitors browse, search, and learn from public collections.

---

# 2. Executive Summary

Numismatist.app targets a real gap in the numismatic tools market: **beautiful digital showcasing**.

Existing platforms are strong in cataloging, grading, price references, registries, or inventory management, but most are visually utilitarian. Numismatist.app should not try to beat these tools as a full reference catalog or marketplace. Instead, it should own the emotional and visual space:

> Your collection, presented like a museum.

The MVP should lean toward casual-to-intermediate collectors while including optional advanced fields that serious collectors expect. This means the app must feel simple at first glance but credible underneath.

The biggest product risks are:

- Too complex for casual users.
- Too shallow for serious collectors.
- Security concerns preventing sharing.
- Public pages not being beautiful enough.
- Cold start from lack of public content.

The core strategy is to mitigate those risks through:

- Progressive coin entry.
- Optional advanced metadata.
- Private, unlisted, and public visibility.
- Strong privacy defaults.
- CSV/JSON export from Phase 1.
- Museum-quality public pages.
- Seeded launch collections.

---

# 3. Market and Competitive Context

## 3.1 Market Context

Coin collecting is a large global hobby with meaningful online growth. Market estimates vary, but research commonly places the global coin collecting market in the multi-billion-dollar range, with continued growth expected through 2030 and beyond.

The hobby is also experiencing a generational refresh. Younger collectors are discovering coins through online marketplaces, social media, short-form video, forums, and digital communities. This supports a web-first, shareable product thesis.

## 3.2 Competitive Landscape

| Platform | Strengths | Weaknesses | Position |
|---|---|---|---|
| Numista | Large collaborative catalog, community, swap system, KM references | Utilitarian UI, encyclopedia-style pages, not a museum-style showcase | Reference catalog plus collection tracker |
| PCGS CoinFacts | Strong US coin data, grading ecosystem, auction data, cert verification | US-focused, grading-centric, not a showcase tool | Grading and US reference ecosystem |
| NGC Registry | Competitive set building, community, registry prestige | Competition-focused, not storytelling-focused | Graded coin registry |
| Collectorz / CoinManage | Comprehensive inventory, export, desktop-style cataloging | Desktop-era UX, limited public sharing | Personal inventory software |
| OpenNumismat | Free, open-source, offline | Desktop only, dated UI, no sharing | Offline personal catalog |
| MyCoinWorX | Cloud inventory, dealer-oriented tools | Smaller footprint, more operational than emotional | Cloud inventory and dealer tools |
| CoinSnap | Mobile AI identification, quick cataloging | Mobile-first, not public exhibit-oriented | Mobile identification and tracking |

## 3.3 Market Gap

No dominant platform combines:

1. Beautiful public collection pages.
2. Historical storytelling as a first-class feature.
3. Simple web-based cataloging.
4. Safe sharing controls.
5. Serious collector credibility through references, provenance, grading, and export.

This gap is Numismatist.app’s opportunity.

## 3.4 Differentiated Positioning

Numismatist.app should be positioned as:

> A digital coin cabinet for collectors who want their collection to look, read, and feel like a curated museum exhibit.

It should not compete primarily on:

- Largest reference database.
- Price accuracy.
- Marketplace liquidity.
- Grading authority.
- Competitive set registry features.

It should compete on:

- Visual quality.
- Safe sharing.
- Historical storytelling.
- Collector identity.
- Data ownership.
- Lightweight but credible cataloging.

---

# 4. Product Strategy

## 4.1 MVP Strategic Decision

The product should target **casual-to-intermediate collectors first**, while including optional advanced fields that signal credibility to serious numismatists.

This avoids the worst middle ground:

- Too shallow for serious collectors.
- Too complex for casual hobbyists.

## 4.2 Product Is

Numismatist.app is:

- A digital coin cabinet.
- A personal collection archive.
- A public showcase platform.
- A storytelling tool.
- A safe sharing tool.
- A portable data home for coin collectors.

## 4.3 Product Is Not

Numismatist.app is not primarily:

- A marketplace.
- A grading service.
- A price guide.
- A cert verification system.
- A comprehensive reference encyclopedia.
- A competitive registry.
- A generic social network.

## 4.4 MVP North Star

The MVP is successful if collectors say:

> This feels like my own digital museum.

Secondary validation statements:

> I can finally show my collection to people without bringing my safe.

> This makes my collection look professional.

> I would send this link to other collectors.

> I want to add the rest of my coins.

## 4.5 Product Principles

1. **Simple on the surface, serious underneath.**
2. **Sharing should feel safe, but never falsely risk-free.**
3. **Public pages are the hero experience.**
4. **Collectors own their data.**
5. **A collection should feel curated, not dumped from a database.**
6. **Avoid scope traps: marketplace, live valuation, AI ID, and social feeds wait.**

---

# 5. Target Users

## 5.1 Primary User: Casual-to-Intermediate Collector

A collector with roughly 10 to 100 coins who wants to:

- Digitally preserve their collection.
- Upload nice photos.
- Add basic facts and history.
- Share selected coins or collections.
- Avoid exposing sensitive ownership information publicly.

Needs:

- Fast first coin entry.
- Beautiful pages.
- Simple privacy controls.
- Easy sharing.
- Friendly guidance.

## 5.2 Secondary User: Serious Numismatist

A collector with 100+ coins who wants:

- Catalog reference numbers.
- Provenance.
- Grading and certification details.
- Variety and subtype fields.
- Exportable data.
- Searchable structured metadata.
- Public or unlisted collection exhibits.

Needs:

- Credible numismatic terminology.
- Advanced optional fields.
- Data portability.
- Strong privacy defaults.
- Trust that the product understands collectors.

## 5.3 Visitor

A non-logged-in user who wants to:

- Browse public collections.
- Learn about coins.
- View a collector’s public exhibit.
- Click a shared collection link from social media, forums, Discord, or coin clubs.

Needs:

- Beautiful public pages.
- Fast loading.
- Clear metadata.
- Good image presentation.
- Search and discovery.

---

# 6. MVP Scope

## 6.1 Must-Have Features

| Feature | Description |
|---|---|
| User accounts | Collectors can sign up, log in, and manage their collection. |
| Email verification gate | Users can save private coins before verification, but must verify before public or unlisted sharing. |
| Collector profile | Each user gets a public profile page, such as `numismatist.app/@alex`. |
| Quick add coin | Users can add a coin quickly with minimal required fields. |
| Advanced coin metadata | Serious collectors can optionally add detailed numismatic fields. |
| Coin image upload | Users can upload obverse, reverse, and additional images. |
| Basic image tools | Users can crop and rotate uploaded coin images. |
| EXIF/GPS stripping | Uploaded images must have metadata stripped for safety. |
| Coin detail page | Each coin has its own page with photos, facts, references, and story. |
| Collections | Users can group coins into themed collections. |
| Collection ordering | Coins in collections can be manually ordered to support curated exhibits. |
| Public/private/unlisted visibility | Users control who can see each coin or collection. |
| Shareable collection pages | Public and unlisted collections can be shared with clean URLs. |
| Open Graph sharing cards | Shared links generate beautiful previews on social platforms. |
| CSV/JSON export | Users can export their collection data. |
| Basic discovery | Visitors can browse public collections and coins. |
| Basic search | Visitors can search public content by title, tag, ruler, issuer, country, and catalog reference. |
| Basic reporting | Public content can be reported for abuse or misuse. |
| SEO and accessibility basics | Public pages must include semantic metadata, alt text, and accessible interactions. |

## 6.2 MVP Non-Goals

| Not Included | Reason |
|---|---|
| Buying/selling marketplace | Adds fraud, payments, disputes, shipping, and authenticity concerns. |
| AI coin identification | Useful later, but not needed to validate the showcase concept. |
| Real-time price tracking | Hard to make accurate and could create trust issues. |
| Automatic certification lookup | Manual grading service and cert fields are enough for MVP. |
| Public comments | Could introduce moderation burden too early. |
| Social feed | Risks turning the product into a generic social network. |
| Native iOS/Android app | A responsive web app is enough for launch. |
| Insurance reports | Premium feature after stronger data completeness. |
| Competitive registry system | Already served by PCGS/NGC; not core to this product’s differentiation. |
| Full image editing suite | Crop and rotate are enough for MVP. |
| Advanced analytics | Useful later, not essential for MVP. |

---

# 7. Core User Stories

## 7.1 Collector: Account and Profile

- As a collector, I want to create an account so I can manage my coin collection.
- As a collector, I want a public profile so others can view the coins and collections I choose to share.
- As a collector, I want to keep sensitive details private.
- As a collector, I want to export my data so I know I am not locked into the platform.
- As a collector, I want security guidance so I do not accidentally reveal risky details.

## 7.2 Collector: Adding Coins

- As a collector, I want to add a coin quickly with only essential information.
- As a collector, I want optional advanced fields so I can document important numismatic details.
- As a collector, I want to upload obverse and reverse photos.
- As a collector, I want to upload additional photos such as edge, slab, and detail images.
- As a collector, I want to crop or rotate images so my coin pages look clean.
- As a collector, I want to add historical notes so each coin has a story.
- As a collector, I want to add catalog references so the coin is properly identified.
- As a collector, I want to add provenance privately so I can preserve ownership history.
- As a collector, I want incomplete coins to be saved privately and improved over time.

## 7.3 Collector: Collections

- As a collector, I want to organize coins into collections so I can create themed exhibits.
- As a collector, I want to control the order of coins in a collection.
- As a collector, I want to publish a collection publicly.
- As a collector, I want to share a collection privately with an unlisted link.
- As a collector, I want to regenerate an unlisted link if it leaks.
- As a collector, I want my shared collection link to look beautiful when posted online.

## 7.4 Visitor

- As a visitor, I want to view a collector’s public profile.
- As a visitor, I want to browse public collections.
- As a visitor, I want to search for coins by title, country, issuer, ruler, tag, or catalog reference.
- As a visitor, I want to open a coin page and learn about its history.
- As a visitor, I want to see clear photos of the obverse and reverse.
- As a visitor, I want to report inappropriate or suspicious public content.

---

# 8. Visibility, Privacy, and Security Model

Privacy is central because coin collections can be valuable.

## 8.1 Visibility Levels

| Level | Behavior |
|---|---|
| Private | Only the owner can view. Not visible on public profile, search, explore, shared URLs, sitemap, or public feeds. |
| Unlisted | Anyone with a valid token link can view. Not visible on public profile, search, explore, sitemap, or public feeds. |
| Public | Visible on public profile, search, explore, sitemap, and shared URLs. |

## 8.2 Default Visibility

New coins and collections should default to `private`.

Users must explicitly choose to make content `unlisted` or `public`.

## 8.3 Important Privacy Rules

1. Public profiles must never show private coin counts.
2. Public profiles must never reveal that a user has private or unlisted collections.
3. Exact storage location should never be collected.
4. Location should be optional and limited to country or broad region.
5. Acquisition price, acquisition source, and provenance should be private by default.
6. Export should only be available to the owner.
7. Original high-resolution images should not be exposed directly on public pages.
8. The product should not promise that public images cannot be copied.
9. Public sharing should include security guidance during onboarding.
10. Uploaded images must have EXIF/GPS metadata stripped.

## 8.4 Private-by-Default Fields

The following fields are private unless the user explicitly chooses otherwise in a future release:

- Acquisition date
- Acquisition source
- Acquisition price
- Previous owner / pedigree
- Internal notes
- Receipts or documents
- Storage notes, if ever added
- Purchase history

For MVP, these should remain private.

## 8.5 Onboarding Security Copy

Show this during onboarding:

> For your safety, avoid sharing exact storage locations, home addresses, purchase prices, or other sensitive ownership details. You can make coins private, unlisted, or public at any time.

Additional public sharing warning:

> Public pages can be viewed and copied by others. Avoid sharing sensitive ownership, location, or value details.

## 8.6 Email Verification Gate

Users may create an account and save private coins before verifying their email.

Email verification is required before a user can:

- Publish a coin publicly.
- Publish a collection publicly.
- Create or access unlisted share links.
- Appear in public discovery.
- Submit content to Explore/search indexing.

If an unverified user tries to set content to `public` or `unlisted`, show:

> Please verify your email before sharing coins or collections.

If a user changes their email address:

1. Require verification of the new email.
2. Existing public content may remain public.
3. The user cannot publish new public or unlisted content until the new email is verified.

## 8.7 Unlisted Link Security

Unlisted content is accessible to anyone with the link. It is not publicly discoverable.

Unlisted content must not appear in:

- Public profile
- Explore
- Search
- Sitemaps
- Public feeds

If someone visits an unlisted URL without a valid token, return `404 Not Found`.

Do not return:

- `401 Unauthorized`
- `403 Forbidden`
- A message confirming that the content requires a token

This avoids confirming that the content exists.

## 8.8 Token Regeneration

Users must be able to regenerate unlisted share links.

When regenerated:

1. The old token immediately stops working.
2. A new token is created.
3. Existing old links return `404 Not Found`.
4. The content remains unlisted unless the user changes visibility.

Suggested helper text:

> If your unlisted link was shared somewhere you did not intend, regenerate it to invalidate the old link.

## 8.9 Token Requirements

| Rule | Requirement |
|---|---|
| Entropy | High-entropy random token. |
| Guessability | Must not be sequential or human-readable. |
| Storage | Store securely. |
| Indexing | Never include tokenized URLs in sitemap. |
| Robots | Send `noindex` for unlisted pages. |

## 8.10 Referrer Protection

Unlisted pages should avoid leaking secret URLs to external sites.

Recommended header for unlisted pages:

| Header | Value |
|---|---|
| `Referrer-Policy` | `no-referrer` |

---

# 9. Public Quality Rules

## 9.1 Description / History Philosophy

The `description / history` field should be optional during coin creation to reduce activation friction.

However, storytelling is central to the product promise. A coin without a description is a catalog entry, not a museum exhibit.

## 9.2 Post-Save Story Prompt

After a coin is saved without a description, show:

> Add a story to make this coin shine on its public page.

## 9.3 Completeness Indicators

The dashboard should visually indicate coins missing recommended fields.

Example indicators:

- Missing image
- Missing country / region
- Missing year / date
- Missing description / history
- Missing collection assignment
- Needs reverse image
- Ready to publish

## 9.4 Public Coin Minimum

Private coins may be incomplete.

To publish a coin publicly, require:

1. Title
2. At least one image
3. Country / region OR year / date

If missing, show:

> Public coin pages need a little more detail before they can appear in Explore. Add at least one image and either a country/region or date.

Recommended but not required for public coins:

- Description / history
- Ruler / issuer
- Denomination
- Tags

## 9.5 Public Collection Minimum

To publish a collection publicly, require:

1. Title
2. At least one public coin
3. At least one cover image, explicit or derived from a coin

Recommended but not required:

- Collection description
- Tags
- Manual ordering

## 9.6 Unlisted Minimum

Unlisted content does not need to meet the full public minimum, but the UI should warn if the page will look sparse.

Example warning:

> This unlisted page can be shared, but it may look incomplete. Add images and a short description to make it more useful.

---

# 10. Progressive Coin Entry

The Add Coin flow should not show every possible field at once.

## 10.1 Quick Add Fields

| Field | Required | Notes |
|---|---:|---|
| Title | Yes | Required to save any coin. |
| Images | No to save, yes to publish publicly | Obverse/reverse encouraged. |
| Country / region | Recommended | Required for public if year/date is missing. |
| Ruler / issuer | Recommended | Important for ancient and medieval coins. |
| Year / date | Recommended | Required for public if country/region is missing. |
| Denomination | Recommended | Example: `Denarius`, `Rupee`, `Cent`. |
| Short story / history | Recommended | Strongly encouraged for public quality. |
| Visibility | Yes | `private`, `unlisted`, or `public`. |

## 10.2 Advanced Details

Advanced sections should be expandable.

### Identification

- Ruler / issuer
- Mint
- Variety / subtype
- Catalog references

### Physical Details

- Material
- Weight
- Diameter
- Grade / condition

### Certification

- Grading service
- Certification number

### Provenance

- Acquisition date
- Acquisition source
- Acquisition price
- Previous owner / pedigree
- Private notes

This keeps the first coin easy while allowing serious collectors to document properly.

## 10.3 Draft / Save Behavior

The MVP should avoid a separate draft/published state machine.

Saving a coin always creates a coin record.

Visibility determines who can see it:

| Visibility | Behavior |
|---|---|
| Private | Owner only. Can be incomplete. |
| Unlisted | Anyone with valid token. Can be incomplete, but app should warn if sparse. |
| Public | Must meet public publishing minimum. Appears on profile, Explore, and search. |

---

# 11. Data Model

The data model should support fast entry, serious metadata, safe sharing, and future extensibility.

## 11.1 User

| Field | Required | Public? | Notes |
|---|---:|---:|---|
| ID | Yes | No | Internal identifier. |
| Email | Yes | No | Login. |
| Email verified at | No | No | Required before public/unlisted sharing. |
| Display name | Yes | Yes | Example: `Alex Morgan`. Unicode allowed. |
| Username | Yes | Yes | Stored without `@`, used in public URLs. |
| Bio | No | Yes | Short collector description. |
| Broad location | No | Yes, if provided | Country or broad region only. |
| Profile image | No | Yes | Avatar. |
| Public profile enabled | Yes | No | Default true. Shows only public content. |
| Created at | Yes | No | Internal. |
| Updated at | Yes | No | Internal. |

## 11.2 Coin

| Field | Required | Public Default | Notes |
|---|---:|---:|---|
| ID | Yes | N/A | Internal identifier. |
| Owner ID | Yes | N/A | Coin owner. |
| Title | Yes | Yes | Required to save. |
| Slug | Yes | Yes | Used in URLs. |
| Primary image ID | No | Yes | Foreign key to selected primary `Coin Image`. |
| Country / region | No | Yes | Required for public if year/date missing. |
| Ruler / issuer | No | Yes | Recommended. Example: `Hadrian`. |
| Year / date | No | Yes | Required for public if country/region missing. Supports flexible values. |
| Denomination | No | Yes | Example: `Denarius`, `Penny`, `Rupee`. |
| Mint | No | Yes | Example: `Rome`, `Philadelphia`, `Antioch`. |
| Material | No | Yes | Example: `Silver`, `Bronze`, `Gold`. |
| Weight | No | Yes | Example: `3.2g`. |
| Diameter | No | Yes | Example: `18mm`. |
| Grade / condition | No | Yes | Example: `VF`, `XF`, `MS64`. |
| Grading service | No | Yes | Example: `PCGS`, `NGC`, `ANACS`, `ICG`. |
| Certification number | No | Yes | Could become a verification link later. |
| Variety / subtype | No | Yes | Example: `1909-S VDB`, `Small Date`, `Overdate`. |
| Description / history | No | Yes | Strongly recommended. |
| Tags | No | Yes | Searchable when public. |
| Visibility | Yes | N/A | `private`, `unlisted`, or `public`. |
| Unlisted token | Conditional | No | Required for unlisted sharing. |
| Deleted at | No | No | If soft deletion is used. |
| Created at | Yes | N/A | Internal. |
| Updated at | Yes | N/A | Internal. |

## 11.3 Coin Image

Do not include `primary` in the image type enum. Primary image is a designation on the coin via `primary_image_id`.

| Field | Required | Notes |
|---|---:|---|
| ID | Yes | Internal identifier. |
| Coin ID | Yes | Parent coin. |
| Image URL | Yes | Optimized display image. |
| Thumbnail URL | Yes | Thumbnail image. |
| Original image URL | No | Private/internal if retained. |
| Type | Yes | `obverse`, `reverse`, `edge`, `detail`, `slab`, or `other`. |
| Alt text | No | User-provided or auto-generated. |
| Sort order | Yes | Determines gallery order. |
| Width | No | Display image width. |
| Height | No | Display image height. |
| File size | No | Stored file size. |
| MIME type | No | Image MIME type. |
| Created at | Yes | Internal. |

## 11.4 Coin Image Type Enum

Allowed values:

- `obverse`
- `reverse`
- `edge`
- `detail`
- `slab`
- `other`

## 11.5 Primary Image Fallback Logic

When displaying a coin thumbnail, use:

1. `coin.primary_image_id`, if set and valid.
2. First image with type `obverse`.
3. First uploaded image by `sort_order`.
4. Placeholder image.

If the primary image is deleted:

1. Clear `coin.primary_image_id`.
2. Recompute fallback primary image using the fallback logic above.
3. Update collection thumbnails, search cards, and Open Graph images on next regeneration.

## 11.6 Catalog Reference

A coin may have multiple catalog references.

| Field | Required | Notes |
|---|---:|---|
| ID | Yes | Internal identifier. |
| Coin ID | Yes | Parent coin. |
| System | Yes | Example: `RIC`, `KM`, `Spink`, `Crawford`, `Schön`. |
| Number | Yes | Example: `RIC II Hadrian 123`. |
| Notes | No | Optional clarification. |

Examples:

| System | Number |
|---|---|
| RIC | `RIC II Hadrian 123` |
| Cohen | `Cohen 456` |
| KM | `KM# 12` |

## 11.7 Provenance

Provenance fields are private by default.

| Field | Required | Notes |
|---|---:|---|
| ID | Yes | Internal identifier. |
| Coin ID | Yes | Parent coin. |
| Acquisition date | No | Exact or approximate. |
| Acquisition source | No | Dealer, auction, inherited, gift, etc. |
| Acquisition price | No | Private. |
| Previous owner / pedigree | No | Example: `Ex. Triton XV, Lot 123`. |
| Provenance notes | No | Private notes. |

## 11.8 Collection

| Field | Required | Public Default | Notes |
|---|---:|---:|---|
| ID | Yes | N/A | Internal identifier. |
| Owner ID | Yes | N/A | Collection owner. |
| Title | Yes | Yes | Example: `Coins of the Roman Empire`. |
| Slug | Yes | Yes | Used in URL. |
| Description | No | Yes | Strongly recommended. |
| Cover image ID | No | Yes | Defaults to first featured coin image. |
| Visibility | Yes | N/A | `private`, `unlisted`, or `public`. |
| Unlisted token | Conditional | No | Required for unlisted sharing. |
| Tags | No | Yes | Search/discovery. |
| Deleted at | No | No | If soft deletion is used. |
| Created at | Yes | N/A | Internal. |
| Updated at | Yes | N/A | Internal. |

## 11.9 Collection Coin Membership

Collections should support intentional ordering.

| Field | Required | Notes |
|---|---:|---|
| Collection ID | Yes | Parent collection. |
| Coin ID | Yes | Coin included in collection. |
| Sort order | Yes | Manual exhibit order. |
| Added at | Yes | Fallback ordering. |

## 11.10 Collection Ordering Rules

Default collection order should be:

1. Manual `sort_order`, if set.
2. Chronological by year/date when parseable.
3. Added date fallback.

Collectors should be able to reorder coins within a collection.

MVP implementation can be:

- Move up/down buttons, or
- Drag-and-drop if easy to implement.

Manual ordering matters because an exhibit should feel curated, not like a database result.

## 11.11 Content Report

| Field | Required | Notes |
|---|---:|---|
| ID | Yes | Internal identifier. |
| Target type | Yes | `profile`, `coin`, or `collection`. |
| Target ID | Yes | Reported content. |
| Reporter user ID | No | Nullable for logged-out reports. |
| Reporter email | No | Optional for follow-up. |
| Reason | Yes | Selected reason. |
| Details | No | Free text. |
| Status | Yes | `new`, `reviewing`, `resolved`, `dismissed`. |
| Created at | Yes | Internal. |
| Resolved at | No | Internal. |

## 11.12 Slug Redirect

If username, coin slug, or collection slug changes are supported, store redirects.

| Field | Required | Notes |
|---|---:|---|
| ID | Yes | Internal identifier. |
| Owner ID | Conditional | Relevant owner. |
| Content type | Yes | `profile`, `coin`, or `collection`. |
| Content ID | Yes | Target content. |
| Old path | Yes | Previous public path. |
| New path | Yes | Current public path. |
| Created at | Yes | Internal. |

---

# 12. URL and Slug Rules

Clean, stable URLs are part of the product experience. Slug behavior should be deterministic.

## 12.1 URL Structure

| Page | URL Pattern |
|---|---|
| Public profile | `/@username` |
| Public collection | `/@username/collection-slug` |
| Public coin | `/@username/coins/coin-slug` |

Collections keep the clean exhibit-style URL.

Coins use `/coins/` to avoid collisions with collection slugs.

## 12.2 Username Rules

The stored username does not include the `@` symbol.

| Rule | Requirement |
|---|---|
| Case | Force lowercase. |
| Length | 3–30 characters. |
| Allowed characters | `a-z`, `0-9`, and hyphen. |
| Start/end characters | Must start and end with a letter or number. |
| Consecutive hyphens | Not allowed. |
| Unicode | Not supported in usernames for MVP. Display names may use Unicode. |
| Uniqueness | Globally unique. |
| Case sensitivity | Case-insensitive. `Alex`, `alex`, and `ALEX` are the same username. |

## 12.3 Reserved Usernames and Slugs

The following usernames should be reserved:

| Reserved |
|---|
| `admin` |
| `api` |
| `auth` |
| `login` |
| `logout` |
| `signup` |
| `settings` |
| `dashboard` |
| `explore` |
| `search` |
| `coins` |
| `collections` |
| `collection` |
| `profile` |
| `profiles` |
| `users` |
| `user` |
| `help` |
| `support` |
| `about` |
| `terms` |
| `privacy` |
| `security` |
| `billing` |
| `www` |
| `mail` |
| `app` |
| `static` |
| `assets` |

Engineering may add more reserved values as needed.

## 12.4 Username Rename Behavior

If username changes are supported in MVP:

1. Store username history.
2. Redirect old profile URLs to the new username using `301 Moved Permanently`.
3. Redirect old public coin and collection URLs to the new username using `301 Moved Permanently`.
4. Do not immediately release old usernames for reuse.
5. Old usernames should remain reserved to prevent impersonation and broken collector links.

If this is too much for MVP, username rename may be disabled initially.

## 12.5 Coin and Collection Slug Rules

| Rule | Requirement |
|---|---|
| Source | Auto-generate from title. |
| Case | Lowercase. |
| Separator | Hyphen. |
| Allowed characters | `a-z`, `0-9`, hyphen. |
| Max length | 80 characters. |
| Uniqueness | Unique per owner and content type. |
| Collision handling | Append `-2`, `-3`, etc. |
| Unicode titles | Transliterate where possible. |
| Empty slug fallback | Use `coin-{shortid}` or `collection-{shortid}`. |

## 12.6 Slug Rename Behavior

If a coin or collection title changes:

1. Existing slug should not change automatically.
2. User may optionally edit the slug.
3. If slug changes, old public URLs should redirect using `301 Moved Permanently`.
4. Old slugs should remain reserved for that owner and content type.

This keeps shared links stable.

---

# 13. Image Requirements

The visual quality of the product depends heavily on coin photos.

## 13.1 MVP Image Features

| Feature | Requirement |
|---|---|
| Upload obverse image | Recommended. Required for best experience but not required to save private coin. |
| Upload reverse image | Recommended. |
| Additional images | Support edge, slab, detail, comparison, and other images. |
| Crop | Basic crop after upload. |
| Rotate | Basic rotate after upload. |
| Image ordering | User can choose gallery order. |
| Primary image | User can choose primary image. |
| Responsive display | Images should look good on mobile and desktop. |
| Lightbox gallery | Additional images can be opened in gallery view. |

## 13.2 Accepted Formats

MVP should accept:

| Format | Requirement |
|---|---|
| JPEG / JPG | Required |
| PNG | Required |
| WebP | Required |
| HEIC / HEIF | Strongly recommended because iPhones commonly produce HEIC images |

If HEIC / HEIF cannot be supported immediately, the upload UI should clearly explain that users should upload JPEG, PNG, or WebP.

## 13.3 Upload Limits

| Limit | MVP Value |
|---|---:|
| Max file size per image | 20 MB |
| Max images per coin | 12 |
| Max display image longest edge | 2400 px |
| Max thumbnail longest edge | 600 px |

These limits can be adjusted based on infrastructure cost, but they should be explicit.

## 13.4 Image Processing Requirements

On upload:

1. Validate file type.
2. Validate file size.
3. Strip EXIF metadata, including GPS/location metadata.
4. Generate optimized display image.
5. Generate thumbnail image.
6. Preserve aspect ratio.
7. Store width, height, file size, and MIME type.
8. Reject corrupted or unreadable files with a user-friendly error.

## 13.5 Original Image Retention

Original high-resolution images should not be exposed publicly.

MVP decision:

- Store optimized display versions for public pages.
- Store thumbnails for cards and galleries.
- Retain originals privately only if storage budget allows.
- Never serve original files directly on public coin or collection pages.

If originals are retained, they should be accessible only to the owner and internal processing jobs.

## 13.6 Upload Error Messages

| Scenario | Message |
|---|---|
| File too large | `This image is too large. Please upload an image under 20 MB.` |
| Unsupported format | `This file type is not supported. Please upload JPEG, PNG, WebP, or HEIC.` |
| Corrupted image | `We could not read this image. Please try another file.` |
| Too many images | `You can upload up to 12 images per coin.` |

## 13.7 Photography Guidance

Show short tips near the upload area:

- Use indirect light.
- Avoid harsh glare.
- Photograph both obverse and reverse.
- Use a neutral background.
- Keep the camera parallel to the coin.
- Crop close to the coin.

## 13.8 Public Image Safety

The app should avoid false promises like:

> Your images cannot be copied.

Instead:

- Display optimized web versions publicly.
- Keep originals private when possible.
- Consider watermarking post-MVP.
- Add user education around image sharing risks.

## 13.9 Image Display Rules

The public coin page should show:

1. Large obverse and reverse image area.
2. Additional image thumbnail strip.
3. Click/tap to open lightbox gallery.

Additional image examples:

- Edge photo
- Slab / holder photo
- Detail / macro image
- Comparison image
- Provenance document image, if public in the future

---

# 14. Core Screens

## 14.1 Public Screens

| Screen | Purpose |
|---|---|
| Landing page | Explain product and encourage sign-up. |
| Explore page | Browse public collections and coins. |
| Search results page | Search public content by coin, collection, tag, issuer, or catalog reference. |
| Public profile page | Show collector bio and public collections only. |
| Public collection page | Display coins in a museum-style gallery. |
| Public coin page | Show coin images, metadata, references, and history. |
| Report content page/modal | Let visitors report public content. |

## 14.2 Authenticated Screens

| Screen | Purpose |
|---|---|
| Onboarding | Guide user through profile creation and first coin. |
| Dashboard | Overview of user’s coins and collections. |
| Add/edit coin | Quick add with optional advanced fields. |
| Add/edit collection | Create themed exhibits. |
| My coins | Manage all coins. |
| My collections | Manage all collections. |
| Export data | Download CSV/JSON export. |
| Settings | Profile, privacy, account settings, and email verification. |

---

# 15. MVP Wireframes

## 15.1 Landing Page

```text
--------------------------------------------------
Numismatist.app

Your coin collection, beautifully preserved.

Create museum-style digital exhibits for your coins.
Upload photos, record details, preserve provenance,
write history, and share safely.

[Start your collection] [Explore collections]

--------------------------------------------------

Featured Collections

[ Roman Silver Coins      ]
[ Coins of British India  ]
[ U.S. Morgan Dollars     ]

--------------------------------------------------

Why collectors use Numismatist

- Beautiful public collection pages
- Private, public, or unlisted sharing
- Catalog references and provenance support
- Export your data anytime

--------------------------------------------------
```

## 15.2 Onboarding Flow

```text
--------------------------------------------------
Welcome to Numismatist.app

Step 1 of 3: Create your collector profile

Display name: ___________________
Username: numismatist.app/@______
Bio: ____________________________

Location:
[Optional: country or broad region only]

[Continue]

--------------------------------------------------

Security note

Avoid sharing exact storage locations, home addresses,
purchase prices, or other sensitive ownership details.
You can make coins private, unlisted, or public at any time.

[Got it]

--------------------------------------------------

Step 2 of 3: Add your first coin

Title: ___________________________
Upload image: [Choose file]

Optional:
Country/Region: _________________
Ruler/Issuer: ___________________
Year/Date: _______________________
Denomination: ____________________

Visibility:
(o) Private
( ) Unlisted
( ) Public

[Save first coin]

--------------------------------------------------

Step 3 of 3: View your coin page

Your coin page is ready.

[View coin page] [Add more details] [Create collection]

--------------------------------------------------
```

## 15.3 Dashboard

```text
--------------------------------------------------
Dashboard

Welcome back, Alex.

[Add coin] [Create collection] [Export data]

Your collection:
- 42 total coins
- 5 collections
- 28 public coins
- 8 unlisted coins
- 6 private coins

Recent coins:
[coin image]
Roman Denarius of Hadrian
Private · Needs story · Needs reverse image

[coin image]
1909-S VDB Lincoln Cent
Public · Ready

[coin image]
Mughal Silver Rupee
Unlisted · Needs collection

Collections:
[ Coins of Rome        ] 18 coins · public
[ U.S. Type Collection ] 12 coins · unlisted
[ Family Collection    ] 12 coins · private

--------------------------------------------------
```

Note: These counts are shown only to the owner, never on the public profile.

## 15.4 Add Coin Page

```text
--------------------------------------------------
Add Coin

Quick Add

Title:
[ Roman Denarius of Hadrian ]

Images:
[Upload obverse] [Upload reverse] [Add more images]

Tips:
- Use indirect light
- Avoid glare
- Crop close to the coin

Basic Details:
Country/Region: [ Roman Empire ]
Ruler/Issuer:   [ Hadrian ]
Year/Date:      [ 117–138 CE ]
Denomination:   [ Denarius ]

Story / History:
[ Write a short description of the coin and its historical context... ]

Visibility:
(o) Private
( ) Unlisted
( ) Public

[Save coin]

--------------------------------------------------

Advanced Details

[+] Catalog References
[+] Physical Details
[+] Certification
[+] Provenance
[+] Private Notes

--------------------------------------------------
```

## 15.5 Public Collection Page

```text
--------------------------------------------------
Alex Morgan / Coins of the Roman Empire

A collection of Roman imperial coins from Augustus
to Constantine, showing the evolution of imperial
portraiture, propaganda, and religious symbolism.

[Share]

--------------------------------------------------

[Coin image]
Hadrian Denarius
117–138 CE · Silver · Rome · RIC II 123

[Coin image]
Antoninus Pius Sestertius
138–161 CE · Bronze · Rome

[Coin image]
Constantine Follis
306–337 CE · Bronze · Trier

--------------------------------------------------

Report this content
```

## 15.6 Public Coin Page

```text
--------------------------------------------------
Roman Denarius of Hadrian

[Large Obverse Image] [Large Reverse Image]

Additional Images:
[Edge] [Detail] [Slab] [More...]

Roman Empire
Ruler: Hadrian
Date: 117–138 CE
Denomination: Silver Denarius
Mint: Rome
Weight: 3.2g
Diameter: 18mm
Grade: VF

Catalog References:
- RIC II Hadrian 123
- Cohen 456

--------------------------------------------------

History

This denarius was minted during the reign of Emperor
Hadrian, a ruler known for consolidating Rome’s borders
and commissioning major architectural works, including
Hadrian’s Wall in Britain.

The obverse depicts Hadrian facing right. The reverse
shows a seated figure of Roma, symbolizing the authority
and endurance of the Roman state.

--------------------------------------------------

Part of collection:
Coins of the Roman Empire

Collector:
Alex Morgan

--------------------------------------------------

Report this content
```

## 15.7 Public Profile Page

```text
--------------------------------------------------
Alex Morgan

Collector of Roman imperial coins, British India
coinage, and early modern silver.

Collections:

[ Coins of the Roman Empire ]
18 public coins

[ British India Silver ]
9 public coins

[ U.S. Type Collection ]
12 public coins

--------------------------------------------------

Report this profile
```

Important: Public profile shows only public collections and public coin counts. It does not mention private or unlisted coins.

---

# 16. Main User Flows

## 16.1 Flow 1: Add First Coin

1. User signs up.
2. User creates username and display name.
3. User sees security guidance.
4. User enters coin title.
5. User optionally uploads one or two images.
6. User optionally adds country, ruler/issuer, year/date, and denomination.
7. User chooses visibility.
8. User saves coin.
9. User views coin page.
10. User is prompted to add story, images, or advanced details.

Success target:

> User can save first coin in under 3 minutes.

## 16.2 Flow 2: Add Advanced Details

1. User opens existing coin.
2. User expands advanced sections.
3. User adds catalog references.
4. User adds grading or certification details.
5. User adds provenance privately.
6. User saves coin.

Success target:

> Serious collectors can document a coin without feeling the product is shallow.

## 16.3 Flow 3: Create and Share Collection

1. User creates a collection.
2. User adds coins to the collection.
3. User manually orders coins or uses default chronological ordering.
4. User writes collection description.
5. User chooses visibility: public, unlisted, or private.
6. User publishes collection.
7. User copies share link.
8. Shared link renders with a beautiful Open Graph preview.

Example public link:

```text
https://numismatist.app/@alex/coins-of-the-roman-empire
```

Example unlisted link:

```text
https://numismatist.app/@alex/coins-of-the-roman-empire?share=private-token
```

Final URL structure can be decided during implementation, but unlisted links must not be discoverable through search or Explore.

## 16.4 Flow 4: Export Data

1. User opens account settings or dashboard.
2. User clicks `Export data`.
3. User chooses CSV or JSON.
4. User downloads collection data.

Success target:

> Users trust that their data is theirs and can leave the platform anytime.

## 16.5 Flow 5: Regenerate Unlisted Link

1. User opens coin or collection settings.
2. User clicks `Regenerate share link`.
3. App confirms that old links will stop working.
4. User confirms.
5. Old token is invalidated.
6. New link is generated.

## 16.6 Flow 6: Report Public Content

1. Visitor clicks `Report this content`.
2. Visitor selects a report reason.
3. Visitor optionally adds details and email.
4. Report is submitted.
5. Admin reviews manually.

---

# 17. Discovery

## 17.1 Explore Page

The Explore page should show only public content.

Visitors can browse:

- Featured collections
- Recent public collections
- Recently added public coins
- Popular tags
- Categories

Example categories:

- Ancient
- Medieval
- Modern
- Roman
- Greek
- U.S.
- British
- Indian
- Islamic
- Silver
- Gold
- Commemorative

## 17.2 Basic Search

Search should support:

- Coin title
- Collection title
- Country / region
- Ruler / issuer
- Denomination
- Mint
- Tags
- Catalog reference number

Example searches:

- `Hadrian denarius`
- `Mughal rupee`
- `1909-S VDB`
- `RIC Hadrian`
- `British India silver`

## 17.3 Public vs. Private Search Rules

| Content | Searchable? |
|---|---:|
| Public coin | Yes |
| Public collection | Yes |
| Public profile | Yes |
| Unlisted coin | No |
| Unlisted collection | No |
| Private coin | No |
| Private collection | No |
| Hidden/reported content | No |
| Deleted content | No |

---

# 18. SEO Requirements

Public coin and collection pages should be built with basic SEO from the start.

SEO is not a separate feature. It is part of public page quality.

## 18.1 Requirements for Public Pages

| Requirement | Notes |
|---|---|
| Semantic slugs | Example: `/@alex/coins-of-the-roman-empire`. |
| Page title | Include coin or collection title. |
| Meta description | Auto-generate from description/history when available. |
| Open Graph tags | Required for social sharing. |
| Twitter/X card tags | Use same image and summary as Open Graph. |
| Image alt text | Required for accessibility and SEO. |
| Canonical URL | Avoid duplicate public URLs. |
| Sitemap inclusion | Public pages only. Never include private or unlisted pages. |
| Structured data | Use Schema.org where appropriate. |

## 18.2 Coin Page Metadata

Example page title:

```text
Roman Denarius of Hadrian | Numismatist.app
```

Example meta description:

```text
A Roman silver denarius of Hadrian, minted 117–138 CE, with catalog references and historical notes.
```

## 18.3 Collection Page Metadata

Example page title:

```text
Coins of the Roman Empire by Alex Morgan | Numismatist.app
```

Example meta description:

```text
A curated collection of Roman imperial coins from Augustus to Constantine, featuring historical context and numismatic details.
```

## 18.4 Structured Data

Use Schema.org structured data where appropriate.

| Page | Suggested Schema |
|---|---|
| Collection page | `CollectionPage` |
| Coin page | `CreativeWork` or `VisualArtwork` |
| Collector profile | `ProfilePage` |

Avoid using pricing-related product schema in MVP unless valuations are added later.

## 18.5 Indexing Rules

| Content | Sitemap | Indexing | Explore | Search |
|---|---:|---:|---:|---:|
| Public | Yes | Yes | Yes | Yes |
| Private | No | No | No | No |
| Unlisted | No | Noindex | No | No |
| Deleted | No | No | No | No |
| Hidden by admin | No | No | No | No |

Deleted public pages should return `404 Not Found` for MVP.

If engineering prefers `410 Gone`, that is acceptable, but `404` is simpler and safer.

---

# 19. Open Graph Sharing Cards

Because sharing is the main growth loop, Open Graph cards should ship with public and unlisted collection pages.

## 19.1 Collection OG Card

Should include:

- Collection cover image
- Collection title
- Collector display name
- Numismatist.app branding

Example:

```text
Coins of the Roman Empire
A collection by Alex Morgan
Numismatist.app
```

## 19.2 Coin OG Card

Should include:

- Primary coin image
- Coin title
- Date / issuer if available
- Numismatist.app branding

Example:

```text
Roman Denarius of Hadrian
117–138 CE · Roman Empire
Numismatist.app
```

## 19.3 OG Image Source Rules

For coins:

1. Use coin primary image.
2. Else use obverse image.
3. Else use first image.
4. Else use branded placeholder.

For collections:

1. Use explicit collection cover image.
2. Else use primary image of first coin by collection sort order.
3. Else use branded placeholder.

---

# 20. Accessibility Requirements

Accessibility is part of MVP quality, especially because the product is highly visual.

## 20.1 Phase 1 Accessibility Requirements

| Area | Requirement |
|---|---|
| Forms | Fully keyboard navigable. |
| Inputs | Labels associated with fields. |
| Buttons | Clear accessible names. |
| Color | Sufficient contrast across the museum-style theme. |
| Errors | Form errors must be readable by screen readers. |
| Image upload | Upload controls must be keyboard accessible. |

## 20.2 Phase 2 Accessibility Requirements

| Area | Requirement |
|---|---|
| Public image galleries | Keyboard navigable. |
| Lightbox | Escape key closes, focus is trapped while open. |
| Image alt text | Required or auto-generated for public images. |
| Collection cards | Clear headings and readable metadata. |
| Share buttons | Accessible labels. |

## 20.3 Image Alt Text

Coin image alt text should be meaningful.

Bad:

```text
image
```

Better:

```text
Obverse of a Roman Denarius of Hadrian, showing Hadrian facing right.
```

If the user does not provide alt text, auto-generate from available fields.

Example fallback:

```text
Obverse image of Roman Denarius of Hadrian.
```

---

# 21. Data Export

Data export should be part of MVP because it builds trust.

## 21.1 Export Formats

| Format | Purpose |
|---|---|
| CSV | Easy spreadsheet access. |
| JSON | Complete structured backup. |

## 21.2 CSV Export Should Include

- Coin title
- Country / region
- Ruler / issuer
- Year / date
- Denomination
- Mint
- Material
- Weight
- Diameter
- Grade / condition
- Grading service
- Certification number
- Variety / subtype
- Catalog references
- Tags
- Visibility
- Description / history
- Provenance fields, if full export selected

## 21.3 JSON Export Should Include

- User profile
- Coins
- Images metadata
- Catalog references
- Provenance
- Collections
- Collection memberships
- Visibility settings

## 21.4 Export Privacy

Only the owner can export their data.

Use this trust-building copy:

> Your collection data is yours. Export it anytime.

---

# 22. Deletion and Collection Integrity

## 22.1 Coin Deletion Behavior

For MVP, deleting a coin should immediately remove it from all user-visible surfaces.

When a coin is deleted:

1. Remove it from all collections.
2. Remove it from public profile pages.
3. Remove it from Explore and search.
4. Remove it from sitemap on next regeneration.
5. Return `404 Not Found` for the public coin URL.
6. Recompute affected collection cover images if needed.
7. Recompute affected collection ordering if needed.

Engineering may implement this as a soft delete internally, but product behavior should be immediate removal.

## 22.2 Collection Membership Behavior

If a deleted coin belonged to one or more collections:

1. Delete the relevant collection membership records.
2. Preserve the collection.
3. Do not delete the collection unless the user explicitly deletes it.
4. If the collection becomes empty, show an empty state to the owner.
5. Public empty collections should not appear in Explore.

## 22.3 Sort Order After Deletion

After a coin is removed from a collection:

1. Remaining coins should keep their relative order.
2. Sort order may be compacted asynchronously.
3. Public collection display should remain stable.

## 22.4 Cover Image After Deletion

If the deleted coin was used as the collection cover:

1. Use explicitly selected cover image if still valid.
2. Else use the primary image of the first coin by collection sort order.
3. Else show a collection placeholder image.

## 22.5 Collection Deletion Behavior

When a collection is deleted:

1. Do not delete coins in the collection.
2. Remove the collection from public profile, Explore, search, and sitemap.
3. Return `404 Not Found` for public collection URL.
4. Preserve coins and their visibility settings.

---

# 23. Content Reporting and Lightweight Moderation

Even without comments or a social feed, public pages need a basic abuse reporting path.

## 23.1 Public Report Links

Add a `Report this content` link to:

- Public coin pages
- Public collection pages
- Public profile pages

This can be small and unobtrusive in the footer.

## 23.2 Report Reasons

MVP report reasons:

| Reason |
|---|
| Spam |
| Offensive content |
| Copyright or image misuse |
| Non-coin content |
| Impersonation |
| Fraud or suspicious listing |
| Other |

## 23.3 Admin Review

MVP can use manual admin review.

Admin users should be able to:

- View reports
- Open reported content
- Hide content
- Dismiss report
- Mark report as resolved

## 23.4 Hidden Content Behavior

Admins should be able to hide public content without deleting it.

Hidden content behavior:

- Not visible publicly.
- Not in Explore.
- Not in search.
- Not in sitemap.
- Owner can still see it with a notice.

Example owner notice:

> This content has been hidden pending review.

---

# 24. Success Metrics

## 24.1 Activation Metrics

| Metric | Target |
|---|---:|
| New users who add at least one coin | 50%+ |
| Time to first saved coin | Under 3 minutes |
| Users who upload at least one image | 50%+ |
| Users who upload obverse and reverse images | 40%+ |
| Users who create a collection | 30%+ |
| Users who publish or unlist-share a collection | 20%+ |

## 24.2 Engagement Metrics

| Metric | Target |
|---|---:|
| Average coins per active collector | 10+ |
| Coins added per active session | 2+ |
| Average collections per active collector | 2+ |
| Return rate after 14 days | 25%+ |
| Return rate after 30 days | 15%+ |

## 24.3 Sharing Metrics

| Metric | Why It Matters |
|---|---|
| Public collection shares per user | Measures viral loop. |
| Shared link click-through rate | Measures whether previews and pages are compelling. |
| Public vs. unlisted vs. private ratio | Measures whether privacy controls support sharing. |
| Collection page views | Measures visitor interest. |

## 24.4 Quality Metrics

| Metric | Target / Why It Matters |
|---|---|
| Public coins with descriptions | Target 70%+. Storytelling quality. |
| Public coins with at least one image | Target 90%+. Visual quality. |
| Public coins with country or year/date | Target 80%+. Search and context quality. |
| Image upload success rate | Core experience depends on photos. |
| Percent of public coins with advanced metadata | Measures serious collector adoption. |

## 24.5 Qualitative Validation

The MVP is working if users say:

> This feels like my own digital museum.

> I can finally show my collection to people without bringing my safe.

> This makes my collection look professional.

> I would send this link to other collectors.

> I want to add the rest of my coins.

---

# 25. MVP Roadmap

## 25.1 Phase 1: Core Catalog and Trust

Goal: Let users create an account, add coins, manage visibility, and trust their data is portable.

Features:

- Account creation
- Email verification gate
- Collector profile
- Onboarding flow
- Security guidance
- Quick add coin
- Advanced coin details
- Image upload
- Basic crop and rotate
- EXIF/GPS stripping
- Private/public/unlisted visibility
- Coin detail pages
- CSV/JSON export
- Privacy-safe profile rules
- Mobile responsive layout
- Basic accessibility for forms
- Username validation
- Slug generation rules
- Public coin minimum
- Incomplete coin indicators
- Basic report link for public coin/profile pages

Must include fields for:

- Ruler / issuer
- Catalog references
- Grading service
- Certification number
- Variety / subtype
- Provenance
- Additional images

## 25.2 Phase 2: Collections and Sharing

Goal: Let users create beautiful shareable exhibits.

Features:

- Create/edit/delete collections
- Add/remove coins from collections
- Manual collection ordering
- Public collection pages
- Unlisted collection pages
- Shareable URLs
- Unlisted token regeneration
- Open Graph sharing cards
- Collection cover image
- Collection description
- Public profile collection list
- SEO metadata
- Structured data
- Public gallery accessibility
- Collection sitemap/indexing behavior
- Report link for collection pages

## 25.3 Phase 3: Discovery

Goal: Make public content browsable and searchable.

Features:

- Explore page
- Featured collections
- Recent public collections
- Recently added public coins
- Tags/categories
- Basic text search
- Search by title, issuer, ruler, country, and catalog reference

## 25.4 Phase 4: Migration and Polish

Goal: Reduce friction for collectors with existing spreadsheets and improve visual quality.

Features:

- Simple CSV import
- Better image presentation
- Improved gallery layouts
- Better photography guidance
- More collection templates
- Basic email updates
- Featured collector pages

---

# 26. Phase 1 Build Spec

This is the short execution reference for engineering.

## 26.1 Phase 1 Goal

Allow a collector to:

1. Create an account.
2. Create a profile.
3. Add coins quickly.
4. Add optional advanced metadata.
5. Upload and manage images.
6. Keep coins private, unlisted, or public.
7. Export their data.
8. View clean private/public coin pages.

## 26.2 Phase 1 Screens

| Screen | Required in Phase 1 |
|---|---:|
| Sign up / login | Yes |
| Email verification | Yes |
| Onboarding | Yes |
| Dashboard | Yes |
| Add coin | Yes |
| Edit coin | Yes |
| Coin detail page | Yes |
| My coins | Yes |
| Export data | Yes |
| Settings / profile | Basic only |

## 26.3 Phase 1 Must-Have Engineering Behaviors

| Item | Reason |
|---|---|
| Primary image model clarification | Prevents image type ambiguity. |
| Username validation | Required before accounts launch. |
| Slug generation rules | Required before public URLs exist. |
| Image upload limits | Required before image upload ships. |
| EXIF/GPS stripping | Security requirement. |
| Email verification gate | Spam prevention. |
| Coin deletion behavior | Required for data integrity. |
| Public coin minimum | Protects public content quality. |
| Incomplete coin indicators | Supports optional descriptions without lowering public quality. |
| Basic report link for public coin/profile pages | Liability and moderation baseline. |
| CSV/JSON export | Trust and data portability. |

## 26.4 Phase 1 User Flow: Sign Up and Add First Coin

1. User creates account.
2. User creates username and display name.
3. User sees security guidance.
4. User adds first coin with title.
5. User optionally uploads image.
6. User optionally adds country, ruler/issuer, year/date, and denomination.
7. User chooses visibility.
8. User saves coin.
9. User sees coin page.
10. User is prompted to add story, images, or advanced details.

Success target:

> First coin saved in under 3 minutes.

## 26.5 Phase 1 User Flow: Add Advanced Details

1. User opens Edit Coin.
2. User expands advanced sections.
3. User adds catalog references, physical details, certification, and provenance.
4. User saves.
5. Updated fields appear on the coin detail page according to public/private rules.

## 26.6 Phase 1 User Flow: Export Data

1. User opens Dashboard or Settings.
2. User clicks `Export data`.
3. User chooses CSV or JSON.
4. User downloads data.

Trust copy:

> Your collection data is yours. Export it anytime.

## 26.7 Phase 1 Public Visibility Rules

### Private Coin

- Visible only to owner.
- Not indexed.
- Not in sitemap.
- Not on public profile.
- Not in Explore.
- Not in search.

### Unlisted Coin

- Visible only with valid token.
- Not indexed.
- Not in sitemap.
- Not on public profile.
- Not in Explore.
- Not in search.
- Missing or invalid token returns `404`.

### Public Coin

Public coin must have:

1. Title
2. At least one image
3. Country / region OR year / date

Public coin appears in:

- Public profile
- Search
- Explore, if selected by ranking/recentness
- Sitemap

## 26.8 Phase 1 Dashboard Requirements

The owner dashboard should show private information only to the owner.

Each coin card should show:

- Primary image
- Title
- Visibility
- Basic metadata
- Completeness indicators

Example:

```text
[Coin image]
Roman Denarius of Hadrian
Private · Needs story · Needs reverse image
```

Owner can see:

- Total coins
- Public coins
- Unlisted coins
- Private coins
- Collections, once Phase 2 exists

Public visitors must never see private or unlisted counts.

---

# 27. Phase 2 Build Spec

## 27.1 Phase 2 Goal

Let users create beautiful, shareable collection exhibits.

## 27.2 Phase 2 Features

- Create/edit/delete collections
- Add/remove coins from collections
- Manual collection ordering
- Public collection pages
- Unlisted collection pages
- Open Graph sharing cards
- SEO metadata
- Accessibility for public galleries
- Public profile collection list

## 27.3 Phase 2 Must-Have Engineering Behaviors

| Item | Reason |
|---|---|
| Collection slug rules | Required for shareable collection URLs. |
| Collection deletion behavior | Required once collections exist. |
| Collection ordering | Required for museum-style exhibits. |
| Collection cover fallback | Required for cards and OG images. |
| Unlisted collection token regeneration | Required for safe sharing. |
| Report link for collection pages | Moderation baseline. |
| Collection sitemap/indexing behavior | SEO and privacy correctness. |
| Public gallery accessibility | Required for accessible public pages. |
| Dynamic Open Graph images | Required for growth loop. |

---

# 28. Launch Content Strategy

The Explore page will be weak without public content. The app should not launch empty.

## 28.1 Seed Content

Before public launch, create or recruit:

- 5–10 beautiful public collections.
- 50–100 high-quality public coin pages.
- At least 3 different collecting categories.

Suggested seed collections:

- Coins of the Roman Empire
- U.S. Morgan Dollars
- British India Silver
- Ancient Greek Silver
- Coins Featuring Animals
- Islamic Golden Age Coinage
- World War II Era Coins

## 28.2 Beta User Strategy

Recruit beta users from:

- Coin clubs
- Reddit coin communities
- Discord collector groups
- Instagram coin collectors
- Local numismatic societies

Offer:

- Free early access
- Featured collector placement
- Assisted CSV import
- Feedback calls

---

# 29. Product Risks and Mitigations

## 29.1 Risk 1: Too Complex for Casual Users

If the Add Coin flow shows every advanced field upfront, casual users may abandon.

Mitigation:

- Use quick add first.
- Hide advanced fields behind expandable sections.
- Allow incomplete private coins.
- Let users improve coin pages over time.
- Keep first coin under 3 minutes.

## 29.2 Risk 2: Too Shallow for Serious Collectors

If the product lacks catalog references, provenance, and certification details, serious collectors will not trust it.

Mitigation:

- Include optional advanced fields in MVP.
- Add CSV/JSON export.
- Use numismatic terminology correctly.
- Make advanced fields searchable where appropriate.

## 29.3 Risk 3: Security Concerns Prevent Sharing

Collectors may avoid public sharing if they fear theft or exposure.

Mitigation:

- Include unlisted visibility in MVP.
- Keep sensitive fields private by default.
- Do not show private counts publicly.
- Avoid precise location fields.
- Strip EXIF/GPS metadata.
- Add security guidance during onboarding.

## 29.4 Risk 4: Public Pages Are Not Beautiful Enough

The main differentiation is design quality. If pages look like ordinary database records, the product loses its reason to exist.

Mitigation:

- Invest heavily in public coin and collection pages.
- Prioritize image layout, typography, spacing, and sharing cards.
- Seed launch with beautiful examples.
- Treat public pages as the hero experience.

## 29.5 Risk 5: Cold Start Problem

Explore is not useful without public collections.

Mitigation:

- Seed public collections before launch.
- Feature beta collectors.
- Create example collections.
- Encourage unlisted sharing first, then public publishing.

## 29.6 Risk 6: Spam or Abuse on Public Pages

Public publishing can attract spam, impersonation, or non-coin content.

Mitigation:

- Require email verification before public/unlisted publishing.
- Add report links.
- Give admins ability to hide content.
- Keep comments and social features out of MVP.

## 29.7 Risk 7: Existing Platforms Add Similar Showcases

Numista or another large platform could add better public collection pages.

Mitigation:

- Invest disproportionately in design quality.
- Make storytelling central, not bolted on.
- Build trust through privacy and export.
- Seed with beautiful collections that define the brand.

---

# 30. Post-MVP Features

## 30.1 High-Value Post-MVP

| Feature | Why It Matters |
|---|---|
| CSV import | Helps serious collectors migrate existing spreadsheets. |
| AI-assisted coin descriptions | Helps users write historical summaries faster. |
| Image-based coin identification | Major convenience feature. |
| Timeline view | Makes collections feel historical. |
| Map view | Shows where coins were minted or circulated. |
| QR codes | Link physical coin displays to digital coin pages. |
| Watermarking | Helps protect public images from misuse. |
| Two-factor authentication | Important for accounts containing valuable collection data. |
| Insurance report export | Strong premium feature. |
| Institution profiles | Useful for museums, clubs, and schools. |
| Comments/questions | Adds community after showcase quality is proven. |
| Featured collector pages | Recognition loop without building a full social network. |
| Collection templates | Reduces cold-start friction for new users. |

## 30.2 Lower Priority

| Feature | Reason |
|---|---|
| Marketplace | High fraud and operational complexity. |
| Live pricing | Difficult accuracy problem. |
| Competitive registry | Already served by PCGS/NGC. |
| Native mobile apps | Web-first is sufficient until usage proves need. |

---

# 31. Suggested Monetization Later

Monetization is not required for MVP validation, but likely paths include freemium tiers.

## 31.1 Free Tier

- Limited number of coins.
- Public profile.
- Basic collections.
- Basic image uploads.
- CSV/JSON export.

## 31.2 Premium Collector Tier

- Unlimited coins.
- Higher image/storage limits.
- More private/unlisted collections.
- Advanced exports.
- Watermarking.
- Insurance report export.
- Custom profile URL options.
- Collection analytics.

## 31.3 Institution Tier

- Museum/school/club profiles.
- Multiple contributors.
- Curated exhibits.
- Embeddable galleries.
- Bulk import/export.

---

# 32. Brand and Design Direction

## 32.1 Brand Feel

Recommended direction: **modern museum archive**.

The product should feel:

- Elegant
- Trustworthy
- Historical
- Calm
- Scholarly but approachable
- Premium without being cold

## 32.2 Visual Direction

Possible palette:

- Ivory
- Charcoal
- Bronze
- Deep green
- Muted gold
- Warm gray

## 32.3 Design Priorities

1. Coin images should be the visual focus.
2. Typography should feel museum-like and readable.
3. Metadata should be structured but not overwhelming.
4. Public collection pages should feel curated.
5. Forms should feel lightweight despite advanced capabilities.

---

# 33. Glossary

| Term | Meaning |
|---|---|
| Numismatist | A person who studies or collects coins, paper money, medals, tokens, and related monetary objects. |
| Obverse | Front side of a coin. |
| Reverse | Back side of a coin. |
| Mint | Place where a coin was produced. |
| Denomination | Face value or type of coin, such as denarius, rupee, cent, or penny. |
| Ruler / Issuer | Person, government, authority, or entity under which the coin was issued. |
| Variety | Subtype, die variety, mint mark variation, overdate, or error classification. |
| Grade | Condition assessment, such as VF, XF, MS64. |
| Certification number | Identifier from a grading service such as PCGS or NGC. |
| Catalog reference | Standard reference number from systems such as KM, RIC, Spink, Crawford, or Schön. |
| Provenance | Documented ownership or acquisition history of a coin. |
| Unlisted | Accessible by valid link but not publicly discoverable. |

---

# 34. Source Notes and Research References

The planning discussion referenced the following market and domain sources. These should be re-verified during formal business planning, but they informed the PRD direction.

- Strategic Market Research — Coin Collection Market: https://www.strategicmarketresearch.com/market-report/coin-collection-market
- Market Research Future — Coin Collecting Market: https://www.marketresearchfuture.com/reports/coin-collecting-market-22623
- Numista: https://en.numista.com
- WifiTalents — Coin Collecting Software Overview: https://wifitalents.com/best/coin-collecting-software
- CoinWeek — Coin Collector Apps: https://coinweek.com/ten-must-have-apps-for-coin-collectors
- Numis Forums — Privacy and sharing coins online: https://www.numisforums.com/topic/6569-internet-privacy-and-sharing-coins-online
- NMCollector — Collection security concerns: https://www.nmcollector.net/coincollections
- Numista Forum — KM numbers: https://en.numista.com/forum/topic39528.html
- Numista Forum — Catalog numbers: https://en.numista.com/forum/topic43975.html
- Queensland Mint — Coin provenance: https://queenslandmint.com/topic/importance-of-coin-provenance-explained
- APMEX — What is coin provenance: https://learn.apmex.com/learning-guide/coin-collecting/what-is-coin-provenance
- Kinzer Coins — Understanding provenance: https://kinzercoins.com/blogs/kinzer-coins-journal/what-is-provenance-understanding-an-ancient-coins-history
- Reddit r/coincollecting — Spreadsheet fatigue discussion: https://www.reddit.com/r/coincollecting/comments/1rrrs93/i_got_tired_of_tracking_my_coin_collection_in
- Liberty Street Software — CoinManage export features: https://www.libertystreet.com/Coin-Collecting-Software.htm
- Coin Photography Studio — Coin photography guide: https://www.coinphotographystudio.com/coin-blog/9zk6hqafvel4lr8b55gmvnbeywb5i9
- NGC Boards — Coin photography tips: https://boards.ngccoin.com/topic/430750-coin-photography-tips
- Reddit r/coins — Displaying collection discussion: https://www.reddit.com/r/coins/comments/hixc2a/displaying_your_coin_collection
- PCGS Apps: https://www.pcgs.com/apps
- NGC Registry overview: https://www.greatamericancoincompany.com/blogs/news/the-ngc-certified-coin-registry-what-it-is-and-why-its-useful

---

# 35. Final MVP Summary

Numismatist.app should launch as a beautiful, secure, web-based coin archive and showcase.

The MVP should obsess over four things:

1. **Fast entry:** A user can add their first coin in under 3 minutes.
2. **Credibility:** Serious collectors see catalog references, issuer/ruler, provenance, grading, certification, and export support.
3. **Safe sharing:** Users can choose private, unlisted, or public visibility.
4. **Museum-quality presentation:** Public coin and collection pages feel polished, historical, and worth sharing.

The product should feel simple on the surface and serious underneath.

The ideal first reaction is:

> This makes my collection look like it belongs in a museum.

---

# 36. Pre-Build Decisions (Tier 1)

These four decisions block the data model and tech-stack selection. Each is stated as a **recommended default** to adopt unless a stakeholder overrides it. Where a default changes an earlier section, this section is authoritative. Resolve these before architecture; the legal/safety and security items raised in review (illegal-content scanning, ToS/Privacy/DMCA, rate limiting, admin tooling) are tracked separately and do not need to be resolved to choose a stack.

## 36.1 Authentication and Sessions

**Decision needed:** login mechanism, session model, and the fields the User record must carry.

**Recommended default:**

- **Email + password** as the primary method. Hash with a modern KDF (argon2id or bcrypt). This aligns with the existing verification gate (§8.6), which requires that a user can create an account and save private coins *before* verifying email — a magic-link-only flow would break that, because clicking the link is itself verification.
- **Email verification** stays a separate gate exactly as specified in §8.6 (save private before verify; verify before share).
- **Google OAuth** as an optional low-cost add. OAuth identities arrive provider-verified, so they satisfy the §8.6 gate immediately (no separate verification email).
- **Password reset** flow is in scope for Phase 1 (it was previously unspecified): time-limited single-use token, emailed, with resend cooldown.
- Magic-link and additional OAuth providers (Apple, etc.) are post-MVP.

**Data-model delta to §11.1 (User):**

| Field | Notes |
|---|---|
| `password_hash` | Nullable. Null for OAuth-only accounts. |
| `auth_provider` | `password`, `google`. Supports linking later. |
| `provider_id` | External subject ID for OAuth accounts. |
| `last_login_at` | Internal. |

Plus two supporting token stores (also used by §36-adjacent security work): an **email-verification token** record and a **password-reset token** record, each with `token_hash`, `expires_at`, `consumed_at`. Define lifetime and resend cooldown during build (suggested: 24h verification, 1h reset, 60s resend cooldown).

## 36.2 Year / Date Model

**Decision needed:** how a single coin date can be displayed as typed, sorted chronologically (§11.10), and searched/filtered (§17.2) across a BCE→present range.

**Problem with the current spec:** §11.2 defines `Year/date` as one flexible freetext field, but three features depend on it being machine-comparable — collection ordering "chronological by year/date when parseable" (§11.10), search (§17.2), and the public-publish gate (§9.4). Freetext alone cannot satisfy these.

**Recommended default — replace the single field with a small structured set:**

| Field | Type | Notes |
|---|---|---|
| `date_display` | string | What the user typed / what is shown. Examples: `117–138 CE`, `circa 50 BCE`, `1909`. Authoritative for display. |
| `year_start` | integer, signed | Chronological sort key. BCE is negative (`50 BCE` = `-50`). |
| `year_end` | integer, signed, nullable | For ranges/reigns. Null for a single year. |
| `date_precision` | enum | `exact`, `circa`, `range`, `unknown`. |

Rules:

1. On entry, a lightweight parser attempts to populate `year_start` / `year_end` from `date_display`; the user can override the parsed values manually when the parser fails or guesses wrong.
2. **Sorting** (§11.10) uses `year_start`, then `year_end`, then added date.
3. **Search/filter** (§17.2) operates on the integer fields for ranges and on `date_display` for text matches.
4. **Public-publish gate** (§9.4): the "has year/date" condition is satisfied when `year_start` is set **or** `date_display` is non-empty.

This replaces the single `Year/date` row in §11.2 and powers §11.10 and §17.2.

## 36.3 Storage Quotas and Image Retention (Free MVP)

**Decision needed:** the MVP has no paid tiers, so without explicit caps the free tier is unbounded (unlimited coins × 12 images × 20 MB) — an open-ended storage and CDN cost.

**Recommended default:**

| Limit | MVP value | Notes |
|---|---|---|
| Max coins per account | 500 (soft cap) | Generous for the 10–100 target user; bounds abuse. Show an upgrade/waitlist message at the cap. |
| Max total storage per account | 2 GB | Backstop independent of the coin cap. |
| Per-image size | 20 MB | Unchanged from §13.3. |
| Per-coin images | 12 | Unchanged from §13.3. |

**Original-image retention** (resolves the "if budget allows" ambiguity in §13.5): **do not retain originals at MVP.** Store the optimized display image and thumbnail only. Revisit retaining originals when a premium tier funds the storage. This keeps cost bounded and avoids serving originals publicly (already required by §8.3).

## 36.4 Account Deletion and Erasure

**Decision needed:** §21 covers data *export* but there is no deletion path; GDPR/CCPA require one, and deletion interacts with public slugs and the anti-impersonation reservation in §12.4.

**Recommended default:**

1. **Self-serve "Delete account"** in Settings. Show an export reminder first ("Download your data before deleting — this can't be undone").
2. **Soft-delete with a 30-day grace window** (reversible by the user), then **hard purge**.
3. On deletion, **public coins and collections are removed immediately** and their URLs return `404` (consistent with §22).
4. **Hard purge** removes images from storage/CDN, database rows, the search index, and the sitemap, and propagates to backups within the stated retention window.
5. **Username and public slugs remain reserved** for 12 months to prevent impersonation and broken collector links (per §12.4), but are de-associated from the user's PII at purge.
6. Document a **backup retention window** (e.g., backups purged within 35 days) so erasure requests can be honored end-to-end.

## 36.5 Net Data-Model Deltas (Summary)

For quick engineering reference, §36 changes the §11 data model as follows:

- **User (§11.1):** add `password_hash` (nullable), `auth_provider`, `provider_id`, `last_login_at`.
- **New token stores:** email-verification token, password-reset token.
- **Coin (§11.2):** replace `Year/date` with `date_display`, `year_start`, `year_end`, `date_precision`.
- **User (§11.1) / quotas:** enforce per-account coin and storage caps (§36.3); no new column required if computed, or add a cached `storage_bytes_used`.
- **User (§11.1):** add `deleted_at` and a purge schedule to support §36.4 soft-delete grace.
