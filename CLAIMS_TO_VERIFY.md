# Marketing & Operational Claims to Verify

The following claims were discovered across the codebase during the technical SEO audit. Per instructions, these marketing claims have **NOT** been rewritten or deleted, but are documented below for review and verification by the SkyOne business stakeholders.

---

### 1. Country & Destination Reach Counts
- **`200+` / `250+` Countries & Territories:**
  - `src/components/AboutHero.tsx:22`: `value: '200+'` (Global Destination Countries)
  - `src/components/FeaturedService.tsx:214`: `200+ Countries & Territories`
  - `src/components/FeaturedService.tsx:225`: `val: '250+'`, `label: 'Countries Served'`
  - `src/components/Footer.tsx:41`: `...and 200+ countries worldwide.`
  - `src/components/TrustStats.tsx:41`: `countries: 250`
  - `src/components/TrustStats.tsx:81`: `Global reach, local presence in 250+ countries.`
  - `src/components/WhySkyOne.tsx:27`: `...linking India to over 250 destination countries and territories.`
  - `src/pages/AboutPage.tsx:52`: `Tier-1 airline alliances secured, enabling next-day and 2-3 day express delivery to over 250 countries...`
  - `src/pages/AboutPage.tsx:174`: `...dedicated customs expertise for 200+ countries...`
  - `src/pages/HomePage.tsx:48`: `...and 200+ countries worldwide.`
  - `src/pages/ServiceDetailPage.tsx:79`: `...and 200+ countries in 2-4 business days.`
  - `src/pages/ServicesPage.tsx:392`: `["IATA Certified", "200+ Countries", "24/7 Support", "Insured Shipments"]`

---

### 2. Volume & Milestone Metrics
- **`100K+` Shipments Delivered:**
  - `src/components/FeaturedService.tsx:224`: `val: '100K+'`, `label: 'Shipments Delivered'`, `sub: '+12% this month'`
  - `src/components/TrustStats.tsx:40`: `shipments: 100` (`100K+ Shipments Delivered`)
  - `src/components/TrustStats.tsx:75`: `label: 'Shipments Delivered'`, `val: '100K+'`
- **`+12% this month`:**
  - `src/components/FeaturedService.tsx:224`: `sub: '+12% this month'`
- **`99%` Satisfaction / On-Time Delivery:**
  - `src/components/FeaturedService.tsx:226`: `val: '99%'`, `label: 'On-Time Delivery'`
  - `src/components/TrustStats.tsx:44`: `satisfaction: 99` (`99% On-Time Delivery`)
  - `src/components/TrustStats.tsx:95`: `label: 'On-Time Delivery'`, `val: '99%'`

---

### 3. Certifications, Airline Alliances & Operational Capabilities
- **`IATA Certified` / `Insured`:**
  - `src/pages/ServicesPage.tsx:363`: `For charter flights, dangerous goods (IATA certified)...`
  - `src/pages/ServicesPage.tsx:391`: `["IATA Certified", "200+ Countries", "24/7 Support", "Insured Shipments"]`
  - `src/pages/TermsPage.tsx:74`: `Liability is limited pursuant to standard IATA / Convention guidelines unless declared value insurance has been purchased...`
- **`Committed airline space allocations` / `Tier-1 airline alliances`:**
  - `src/components/WhySkyOne.tsx:21`: `Committed airline space allocations and predictable flight schedules ensure your deadlines are honored without transshipment delays.`
  - `src/pages/AboutPage.tsx:51`: `Tier-1 airline alliances secured, enabling next-day and 2-3 day express delivery to over 250 countries...`
- **`Licensed customs brokerage` / `Bill of entry`:**
  - `src/data/servicesData.ts:125`: `Our licensed customs brokerage specialists ensure accurate HS tariff classification...`
  - `src/data/servicesData.ts:130`: `Commercial invoice and bill of entry validation`
- **`Charter`, `ULD`, and `Dangerous Goods` Capability:**
  - `src/data/servicesData.ts:60`: `Unit Load Device (ULD) container palletization`
  - `src/data/servicesData.ts:61`: `Full and partial air charter capabilities`
  - `src/data/servicesData.ts:62`: `Dangerous goods (IATA compliant) certification`
  - `src/pages/ProhibitedItemsPage.tsx:119`: `Contact our dangerous goods (DG) compliance team to review Material Safety Data Sheets (MSDS)...`
  - `src/pages/ProhibitedItemsPage.tsx:126`: `Consult Dangerous Goods Specialist`

---

### 4. Regional & Market Share Statistics
- **`~60% of Kerala air cargo`:**
  - `src/pages/AboutPage.tsx:76`: `Operating directly from Cochin International Airport (CIAL) — handling ~60% of Kerala air cargo — gives us priority access...`
- **`Recognised as Kerala's go-to`:**
  - `src/pages/AboutPage.tsx:58`: `Recognised as Kerala's go-to international courier — trusted by NRI families, exporters, students, and enterprises...`
- **`Remittance and Gulf-population statistics`:**
  - `src/components/AboutHero.tsx:28`: `Annual NRI remittances to Kerala (USD 14B+)`
  - `src/pages/AboutPage.tsx:159`: `With over 2.5 million Keralites living and working in the Gulf alone...`

---

### 5. Platform API Integrations
- **`Shopify & WooCommerce API`:**
  - `src/data/servicesData.ts:152`: `Automated API integration with Shopify & WooCommerce`
  - `src/pages/ServiceDetailPage.tsx:103`: `Shopify and WooCommerce integration, DDP delivery, branded tracking pages...`

---

### 6. Testimonials & Reviews
- **`Testimonials` and `Verified customer reviews`:**
  - `src/components/TestimonialsSection.tsx:11-54`: Hardcoded customer reviews attributed to "Dr. Thomas Mathew (Kottayam)", "Amina Farooq (Kozhikode)", "George Varghese (Thiruvalla)"
  - `src/components/TestimonialsSection.tsx:160`: `* Verified customer reviews across SkyOne express air corridors from Kerala to Gulf, UK & worldwide.`
  - `src/pages/HomePage.tsx:77`: `<TestimonialsSection />` carousel display
  *(Note: No Schema.org Review or AggregateRating markup was added for these, in accordance with SEO guidelines).*

