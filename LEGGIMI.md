# Turni e Presenze — app installabile (guscio per GitHub Pages)

Questi file NON contengono l'app né i dati: sono un "guscio" con nome e icona.
Quando lo apri, carica dentro di sé la web app di Google (l'indirizzo /exec).
I dati restano su Google Fogli, l'accesso resta protetto dal PIN.

## File
- `index.html` — la pagina che si apre toccando l'icona
- `config.js` — **l'unica cosa da modificare**: l'indirizzo /exec
- `manifest.webmanifest` — nome, colori e icone per l'installazione
- `sw.js` — rende l'app installabile e la apre anche senza rete (con avviso)
- `icons/` — le icone (telefono Android, iPhone, computer)

## Parametri dei tag NFC
Se apri il guscio con `?t=CODICE` (es. `…github.io/presenze/?t=SEG-ETNEO-01`),
il codice viene passato all'app di Google tale e quale. I tag NFC già scritti
con l'indirizzo /exec continuano a funzionare senza cambiare niente.

## Da non fare
- Non caricare in questo archivio GitHub i file .gs o Index.html dell'app:
  l'archivio è pubblico.
