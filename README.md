# Esercitazione — Report Vendite e Clienti (Fake Store)

Applicazione Node.js / TypeScript per l'estrazione e l'elaborazione dei dati di vendita da [Fake Store API](https://fakestoreapi.com/), con generazione di due report analitici in formato JSON.

---

## Prerequisiti e installazione dipendenze

Il progetto utilizza **pnpm** come package manager.

> **Nota sul setup**: a seguito di problemi riscontrati con il comando standard `npm create vite@latest`, l'ambiente è stato configurato e inizializzato tramite `pnpm` (`pnpm create vite`).

Per installare le dipendenze:

```bash
pnpm install
```

---

## Avvio del programma

Per eseguire l'applicazione e stampare a console i due report JSON:

```bash
pnpm start
```

In alternativa è possibile eseguire direttamente il file sorgente con Node (v22+ con supporto nativo TypeScript):

```bash
node src/main.ts
```

Per verificare la correttezza dei tipi ed effettuare la build:

```bash
pnpm run build
```

---

## Note metodologiche e criteri di analisi

### Definizione del periodo «Ultimo Mese»
Poiché le date degli ordini forniti da Fake Store API risalgono al 2020, la data dell'ordine più recente presente tra tutti i carrelli (`02 - 03 - 2020`) viene utilizzata dinamicamente come **data di ancoraggio**. Il periodo «ultimo mese» è definito come l'intervallo temporale a ritroso di **30 giorni** rispetto a tale data (dal `01 - 02 - 2020` al `02 - 03 - 2020` compresi).

### Gestione di prodotti o utenti assenti (fallback)
Qualora un carrello contenga un `productId` o un `userId` non presente nel rispettivo catalogo o anagrafica, l'applicazione non interrompe l'esecuzione:
- **Prodotto assente**: viene conteggiato nel volume delle unità vendute ma valorizzato con titolo `"Prodotto non a catalogo"`, categoria `"Sconosciuta"` e prezzo `0`.
- **Utente assente**: viene aggregato con username `"sconosciuto"`, nome completo `"Utente sconosciuto"` ed email `"N/D"`.

---

## Struttura del progetto

```
src/
├── api.ts        # Chiamate HTTP a Fake Store API (carrelli, prodotti, utenti)
├── types.ts      # Dichiarazioni dei tipi TypeScript (type alias)
├── utils.ts      # Funzioni di utilità (date, formattazione, calcoli e lookup)
├── report1.ts    # Generazione Report 1: Top 3 prodotti per unità vendute
├── report2.ts    # Generazione Report 2: Top 3 clienti per spesa totale
└── main.ts       # Entrypoint minimale che coordina il recupero dati e l'output
```

---

## Output dei Report

1. **Report 1 — Top 3 prodotti più venduti**:
   - Classifica per unità vendute per entrambi i periodi (*all time* e *ultimo mese*).
   - Dettaglio di posizione, identificativo, titolo, categoria, prezzo unitario, unità vendute e fatturato del periodo.
   - Metadati con timestamp di generazione, data di ancoraggio e intervallo temporale.

2. **Report 2 — Top 3 clienti per volume di acquisto**:
   - Classifica per spesa totale per entrambi i periodi (*all time* e *ultimo mese*).
   - Dettaglio di posizione, identificativo utente, username, nome completo, email, numero ordini, pezzi totali acquistati e spesa totale del periodo.
   - Metadati con timestamp di generazione, data di ancoraggio e intervallo temporale.
