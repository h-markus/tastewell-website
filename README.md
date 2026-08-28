# tastewell Website

Eigenständige, statische Marketing-Website für die tastewell App. Die Seite hat
keine Runtime-Abhängigkeiten, keinen Build-Schritt und kein Backend.

## Architektur

```text
website/
├── index.html                 # Landingpage
├── privacy.html               # vorbereiteter Datenschutz-Entwurf
├── terms.html                 # vorbereitete Nutzungsbedingungen
├── imprint.html               # vorbereitetes Impressum
├── 404.html                   # statische Fehlerseite
└── assets/
    ├── css/styles.css         # Designsystem, Layout, Responsive, Animationen
    ├── js/main.js             # Navigation, Reveal-Effekte, Parallax, Jahreszahl
    └── images/                # lokale, optimierte Markenassets
```

Die Architektur ist bewusst „plain static“:

- Jede Hosting-Plattform kann den Ordner direkt ausliefern.
- Es gibt keine Framework-Updates, Server oder Datenbank zu warten.
- Inhalte und rechtliche Seiten sind einfache, getrennte HTML-Dateien.
- Alle Assets liegen lokal. Die Website lädt keine externen Fonts, Tracker oder
  JavaScript-Bibliotheken.
- JavaScript ist nur progressive Verbesserung. Inhalt und Navigation bleiben
  ohne JavaScript lesbar.

Falls später Blog, CMS, Übersetzungen oder viele Unterseiten dazukommen, lässt
sich die gleiche Oberfläche gut nach Astro migrieren. Für eine kompakte
App-Landingpage wäre ein Framework aktuell nur zusätzliche Komplexität.

## Designstrategie

Die visuelle Sprache verbindet Specialty Coffee mit Produktpräzision:

- **Warm editorial:** Creme, Espresso, Karamell und Pflaume statt generischem
  Tech-Blau. Große Sans-Serif-Headlines werden durch kursiv gesetzte
  Serif-Akzente aufgelockert.
- **App als Beweis:** Der Hero zeigt ein detailliertes, mit HTML/CSS gebautes
  App-Mockup und konkrete Rezeptwerte statt austauschbarer Lifestyle-Fotos.
- **Geführte Bewegung:** Dampf, Orbit-Linien, Scroll-Reveals und subtile
  Pointer-Parallax unterstützen die Geschichte der Seite. Animationen lassen
  sich über `prefers-reduced-motion` vollständig reduzieren.
- **Bento mit Hierarchie:** Große Karten bündeln Bean Shelf, Shot History,
  Local-first und AI-Cover. Unterschiedliche Flächengrößen priorisieren den
  Nutzen besser als ein gleichförmiges Feature-Grid.
- **Conversion ohne falsche Versprechen:** Da noch kein App-Store-Link bekannt
  ist, führt der Abschluss derzeit zu einer direkten Launch-Update-E-Mail. Der
  Link kann später in `index.html` durch den Store-Link ersetzt werden.

## Lokal starten

Im `website`-Ordner:

```bash
python3 -m http.server 4173
```

Dann `http://localhost:4173` öffnen.

## Hosting

### Netlify / Cloudflare Pages

- Repository verbinden
- Base directory: `website`
- Build command: leer
- Publish directory: `.`

### Vercel

- Root Directory: `website`
- Framework Preset: `Other`
- Build Command: leer
- Output Directory: `.`

### Beliebiges Static Hosting

Den Inhalt von `website/` hochladen. `index.html` muss im Webroot liegen.

## Vor Veröffentlichung anpassen

1. App-Store-Link und CTA-Text in `index.html` ergänzen.
2. Finale Domain in Social-Meta-Tags und optional einer `sitemap.xml` ergänzen.
3. `privacy.html`, `terms.html` und `imprint.html` rechtlich vervollständigen.
4. Danach auf den drei Legal-Seiten das `noindex, nofollow` Meta-Tag entfernen.
5. Falls Analytics hinzukommt, Datenschutz, Consent-Anforderungen und Cookie-
   Verhalten passend zum Zielmarkt prüfen.

Die vorbereiteten Legal-Texte sind nur eine Inhaltsstruktur und keine
Rechtsberatung.
