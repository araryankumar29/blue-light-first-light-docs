# Client app · one link

`client-app/index.html` is the one client link: it opens the mobile app on a narrow screen and the
desktop app on a wide screen, and also shows both choices as cards.

It links to the sibling folders:

```
client-app/
  index.html          this landing
  assets/renders/     proxy renders used on the landing
  assets/docs/        proxy HOMESIC PDFs
  fonts/              Manrope
../client-app-mobile/index.html
../client-app-desktop/index.html
```

When the three folders sit under `prototype/` in the repository, the same relative links work from
`prototype/client-app/`.

The landing does not replace the apps; it is the shared entrance. It uses the MD palette and the
supplied proxy images. The three quotation PDFs and the proposal/pitch/brief are linked from the
designs screen in both apps.
