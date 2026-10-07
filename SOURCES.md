# Source Catalog

This catalog describes the initial curated source foundation. The YAML registry is authoritative; this document explains why entries exist and what they are **not** allowed to imply.

Research snapshot: 2026-10-07.

## Authority rule

A source's presence does not make it interchangeable with every other source.

- **CANONICAL** — canonical text provider.
- **OFFICIAL_INSTITUTION** — an institution speaking within its formal scholarly/fiqh remit.
- **APPROVED_SCHOLAR_CORPUS** — an attributable named-scholar corpus.
- **APPROVED_PRIMARY_WORK** — a named classical juristic work; the work is the authority object while the website is only its digital access provider.
- **APPROVED_SCHOLARLY_SECONDARY** — useful scholarly/reference material that must not be silently promoted to primary authority.
- **EXTERNAL_FACTUAL** — establishes contemporary external facts only.

## General Sunni

### Quran Foundation — active
Canonical exact Qur'an lookup already used by the runtime.

### International Islamic Fiqh Academy (OIC) — active
Official collective-iǧtihād institution. Use for its published resolutions/recommendations and attributable institutional positions, especially contemporary fiqh. Do not present a resolution as unanimous Sunni ijma unless the source itself establishes that status.

Origin: `iifa-aifi.org`.

### Islamic Fiqh Council, Muslim World League — active
Collective fiqh council within the Muslim World League, useful for contemporary resolutions and cross-regional scholarly positions.

Origin: `themwl.org`.

### Dorar al-Sunniyyah — active
High-value scholarly/reference layer for hadith research, tafsir, aqeedah, fiqh/usul and related encyclopedias. It is intentionally classified as scholarly secondary rather than as a universal fatwa authority.

Origin: `dorar.net`.

### Sunnah.com — active
Research/access layer for hadith collection text, numbering, translations, and attributed grading metadata. Its own documentation explicitly says it is not a fiqh/fatwa site, so the plugin must not derive rulings merely from a retrieved hadith page.

Origin: `sunnah.com`.

### IslamQA — active
Broad Sunni/Salafi scholarly Q&A and research source. In this foundation catalog it is deliberately restricted as scholarly secondary until answer-authority and document-class policy is modeled more precisely.

Origin: `islamqa.info`.

### Islamweb — active
Broad Sunni educational/fatwa/reference website. Initially treated as scholarly secondary; later work should distinguish fatwa material, articles, hadith/Qur'an utilities, and translations rather than granting one authority level to the whole site.

Origin: `islamweb.net`.

### Egypt's Dar Al-Ifta — active
Governmental national fatwa institution. Kept as its own institutional lens; its rulings are attributable to Dar al-Ifta and are not silently generalized to all Sunni scholarship.

Origin: `www.dar-alifta.org`.

### Al-Azhar Global Center for Electronic Fatwa — active
Official Al-Azhar fatwa center with a searchable fatwa bank. Kept as a distinct institutional lens, including its own methodology and attribution.

Origins: `azhar.eg`, `service.azhar.eg`.

## Saudi Arabia

### General Presidency of Islamic Research and Ifta — active
Saudi government fatwa/research institution, including the Permanent Committee and Council of Senior Scholars material. This is the highest-priority Saudi institutional source.

Origin: `alifta.gov.sa`.

### Ibn Baz official corpus — active
Existing named-scholar source. Restricted to the official fatwa/search paths currently validated.

Origin: `binbaz.org.sa`.

### Ibn Uthaymeen Foundation official corpus — active
Named-scholar foundation with a large corpus of fatwas, lessons, tafsir, hadith explanation, aqeedah and other materials.

Origin: `binothaimeen.net`.

### King Fahd Glorious Qur'an Printing Complex — active
Saudi official Qur'an institution. Initially registered conservatively; machine-readable canonical text/translation adapters remain TODO.

Origin: `qurancomplex.gov.sa`.

### Muslim World League Fiqh Council — also in General Sunni
Saudi-based but intentionally kept in the general Sunni pack as a cross-regional collective fiqh institution.

## Sudan

### Central Bank of Sudan — Higher Sharia Supervisory Board corpus — active
The Central Bank publishes official books of fatwas and fiqh guides produced by the Higher Sharia Supervisory Board for the banking and financial system. This is a high-value Sudan-specific source for Islamic finance and institutional Sharia rulings.

Origin: `cbos.gov.sd`.

### Sudan government portal — active as external factual only
Useful for current official facts such as ministries, appointments, laws, and public-service announcements. It cannot establish an Islamic ruling merely because it is a government source.

Origin: `sudan.gov.sd`.

### Nusk Sudan / Hajj and Umrah — active as external factual only
Official Sudan Hajj/Umrah service information. Useful for logistics and current administrative facts, not independent Islamic authority.

Origin: `nusk.gov.sd`.

### Sudan Islamic Fiqh Academy — admission pending
The academy is historically a major Sudanese collective-fatwa institution, but this pass did **not** identify a current official web origin that can be confidently distinguished from mirrors/secondary copies. It is therefore deliberately **not** registered as active authority yet.

High-priority TODO: verify the current official origin, then ingest/route its fatwa books, resolutions, and publications with explicit historical/current metadata.

### Ministry of Religious Affairs and Endowments — admission pending
Current ministry activity is verifiable through Sudan government material, but a dedicated official publication origin/document taxonomy needs to be established before giving ministry content Islamic-authority permissions.

## Deliberately excluded for now

- unofficial archives of scholars whose official site has disappeared;
- social-media-only channels without stable attribution/versioning;
- mirror sites when an original institution/source cannot be verified;
- arbitrary mosque/preacher pages;
- scraped book collections without edition/provenance metadata.

These may be useful for discovery, but discovery is not authority.


## Four Sunni madhhabs

The four madhhab packs are explicit work-based registry objects. The current digital access layer is Usul.ai; **Usul is not the juristic authority**. Each evidence item remains attributable to the named work/author/madhhab.

A work's presence in a pack permits accurate attribution to that work and contextual use in madhhab research. It does **not** by itself prove that a proposition is the madhhab's relied-upon (`mu'tamad`) position. That stronger claim requires evidence from a work/source that establishes that level of attribution.

### Hanafi — `madhhab-hanafi`

- *Al-Hidaya sharh Bidayat al-Mubtadi* — Burhan al-Din al-Marghinani.
- *Bada'i al-Sana'i fi Tartib al-Shara'i* — Ala al-Din al-Kasani.
- *Al-Bahr al-Ra'iq sharh Kanz al-Daqa'iq* — Ibn Nujaym.

### Maliki — `madhhab-maliki`

- *Mukhtasar Khalil* — Khalil ibn Ishaq al-Jundi.
- *Al-Dhakhira* — Shihab al-Din al-Qarafi.
- *Hashiyat al-Dusuqi 'ala al-Sharh al-Kabir* — Muhammad al-Dusuqi.

### Shafi'i — `madhhab-shafii`

- *Al-Umm* — Imam al-Shafi'i.
- *Al-Majmu' sharh al-Muhadhdhab* — Imam al-Nawawi.
- *Rawdat al-Talibin wa 'Umdat al-Muftin* — Imam al-Nawawi.

### Hanbali — `madhhab-hanbali`

- *Al-Mughni* — Ibn Qudama.
- *Al-Insaf fi Ma'rifat al-Rajih min al-Khilaf* — al-Mardawi.
- *Kashshaf al-Qina' 'an Matn al-Iqna'* — al-Buhuti.
- *Zad al-Mustaqni'* — al-Hajjawi.

These packs are the plugin's baseline madhhab research layer. Future edition/provider changes should update the access/provenance metadata without changing the logical work identity.
