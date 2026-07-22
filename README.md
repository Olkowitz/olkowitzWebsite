# olkowitzWebsite

Jednoduchý statický web pro Olkowitz z.s. postavený na čistém HTML, CSS a JavaScriptu bez frameworků a build nástrojů.

## Struktura projektu

- `index.html` - hlavní stránka
- `about.html` - informace o spolku
- `events.html` - přehled akcí
- `contact.html` - kontaktní údaje
- `404.html` - chybová stránka
- `css/style.css` - centrální styly
- `js/main.js` - sdílené chování webu
- `js/events.js` - logika pro akce
- `events.json` - data akcí

## Automatická kontrola odkazů

Repozitář obsahuje workflow `link-check`, který při `push` a `pull request` do `main` kontroluje interní odkazy v HTML souborech.

## Publish checklist (GitHub Pages)

Před push na `main`:

- [ ] Zkontroluj obsah a pravopis na změněných stránkách
- [ ] Zkontroluj, že navigace funguje na desktopu i mobilu
- [ ] Zkontroluj, že stránky mají správný `title`, `meta description`, `canonical` a `og:*`
- [ ] Zkontroluj, že `sitemap.xml` a `robots.txt` odpovídají aktuálnímu stavu stránek
- [ ] Zkontroluj konzoli prohlížeče (bez JavaScript chyb)
- [ ] Otestuj 404 stránku (`/neexistuje`)

Po nasazení:

- [ ] Otevři `https://www.olkowitz.cz/` a ověř hlavní stránky (`/`, `/about.html`, `/events.html`, `/contact.html`)
- [ ] Otestuj HTTPS certifikát a přesměrování na `www.olkowitz.cz`
- [ ] Ověř, že se načítají obrázky a favicon

## Lokální náhled (volitelné)

Pokud máš v systému Python, můžeš web rychle spustit lokálně:

```powershell
Set-Location "C:\Users\JF46725\IdeaProjects\olkowitzWebsite"
python -m http.server 8080
```

Pak otevři `http://localhost:8080`.
