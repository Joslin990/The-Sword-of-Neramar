# The Sword of Neramar

A text-based, choice-driven adventure game available as both a browser HTML game and a Node.js terminal game.

## Overview

In _The Sword of Neramar_, you play as a brave adventurer on a quest for the legendary Sword of Neramar. The game puts you through branching paths, merchant encounters, dungeon exploration, and multiple combat challenges.

## Features

- Interactive branching story with multiple paths
- Choose your starting weapon: `sword`, `spear`, `bow`, or `mace`
- Combat encounters with goblins, orcs, robbers, a dragon, a kraken, elementals, and a Lich King
- Multiple shops and villages where you can buy health or armor
- Gold, health, and armor tracked throughout the adventure
- `help` returns you to the previous scene
- `quit` asks for confirmation before exiting
- Multiple endings, including city rulership, poverty, and ultimate victory over the Lich King

## Playing in the Browser (Recommended)

Open `index.html` directly in any web browser — no server or install required.

- Features a **royal color scheme**: deep navy background, gold accents, royal purple, and crimson
- Live stats bar showing Health, Armor, Gold, and current Weapon
- Choice buttons are generated automatically from each scene's options — click or type
- Health color shifts green → yellow → red as you take damage

## Playing in the Terminal

Requires Node.js (version 12 or later).

1. Open a terminal in the project folder.
2. Run:

```bash
node game.js
```

## How to Play

- Follow the prompts on screen.
- Type one of the provided options and press Enter (or click a button in the browser version).
- Available commands during gameplay:
  - `help` — displays instructions and returns to the previous scene
  - `quit` — attempts to exit the game, with confirmation

## Gameplay Notes

- You begin with full health and no armor.
- Camping or resting restores health to 100 when the option is available.
- Gold is earned from treasure, battles, and quests.
- Armor can be purchased and reduces incoming damage.
- Your choices determine which paths and endings you reach.

## Story Paths

- **Forest** — choose left (goblins), right (cave/underground city), or camp.
- **Plains / Village** — interact with shops, accept a robber-clearing quest, or move on.
- **Ruins** — explore for gold and face a dragon, or go around to the merchant.
- **Mountain Pass** — find the magic cave and claim the Sword of Neramar.
- **City** — get crowned ruler and learn of the Lich King threat.
- **Badlands** — face orcs or a sandworm on two diverging paths.
- **Desert / Coast** — visit an oasis, fight a sand elemental, or find the fishing village and its kraken.
- **Silver Hills** — battle an ice elemental on the way to the Lich King's crypt.
- **Lich King's Crypt** — final showdown; find the Amulet of Divine Light for a decisive advantage.
