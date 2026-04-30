# The Sword of Neramar

A text-based, choice-driven adventure game built with Node.js.

## Overview

In _The Sword of Neramar_, you play as a brave adventurer on a quest for the legendary Sword of Neramar. The game puts you through branching paths, merchant encounters, dungeon exploration, and multiple combat challenges.

## Features

- Interactive branching story with multiple paths
- Choose your starting weapon: `sword`, `spear`, `bow`, or `mace`
- Combat encounters with goblins, orcs, robbers, a dragon, and more
- Multiple shops and villages where you can buy health or armor
- Gold, health, and armor track your progress through the adventure
- `help` returns you to the previous scene
- `quit` asks for confirmation before exiting
- Multiple endings, including city rulership, kingdom defeat, and farther journeys toward the Lich King

## Requirements

- Node.js installed (version 12 or later recommended)

## Running the Game

1. Open a terminal in the project folder.
2. Run:

```bash
node game.js
```

## How to Play

- Follow the prompts on-screen.
- Type one of the provided options and press Enter.
- Available commands during gameplay:
  - `help` - displays instructions and returns to the previous scene
  - `quit` - attempts to exit the game, with confirmation

## Gameplay Notes

- You begin with full health and no armor.
- Camping or resting restores health to 100 when the option is available.
- Gold is earned from treasure, battles, and quests.
- Armor can be purchased and reduces incoming damage.
- Your choices impact which paths and endings you reach.

## Story Paths

- Forest: choose between the left path, the right path, or camping.
- Cave: find an underground city, treasure, and a portal toward plains.
- Village: interact with shops, quests, and merchant encounters.
- Ruins: explore, fight a dragon, or continue toward the mountain pass.
- Mountain path: discover a magic cave and the Sword of Neramar.
- Later adventure: travel through badlands, deserts, coasts, and face the Lich King's threat.

## Notes

This game runs entirely in the terminal as a single-player adventure. When you reach a choice prompt, type the exact option shown and press Enter. Have fun, and choose wisely!
