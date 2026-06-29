# Three Chess

_Three Chess_ is a web-based implementation of the classic game _Chess_.

---

# Summary

1. [Motivation](#motivation)
2. [Methodology](#methodology)
   1. [Goals](#goals)
   2. [First Step](#first-step)
   3. [Why a chess game?](#why-a-chess-game)
   4. [How support both desktop and mobile?](#how-support-both-desktop-and-mobile)
3. [Technologies](#technologies)
   1. [Front End](#front-end)
   2. [Back End](#back-end)
   3. [Infrastructure](#infrastructure)
   4. [Database](#database)
   5. [Tooling](#tooling)
---

# Motivation

This project was created as a way to connect and apply concepts I wanted to learn more deeply.

# Methodology

One of the first skills I want to improve is the ability to understand a problem and think about it systematically, making informed decisions and understanding the scope of each one.

To track this process over time, this repository contains documentation of the decisions made and the questions raised to arrive at them.

## Goals
- Practice backend and database related skills.
- Practice mobile related skills.
- Practice cloud related skills.

## First Step

First of all, I believe that applying the concepts to a project is better than applying them without context.
Therefore, the first step is to choose a theme. This is an important decision, as it will influence how much I can learn during the process, how long it will take me to achieve a satisfactory result, and so on.

## Why a chess game?

Chess is a good choice, I believe. There are a lot of content about the game, understanding how it works and how to implement it will not be a difficult; the limits about where the project can go are known, the scope is limited.
There is some complexity, but less than several other possibilities. It has a good balance between complexity and possibility of learning.

It is possible to imagine this project finished.

## How support both desktop and mobile?

Progressive web applications (PWAs) seem like a good option, and I have never used it. So, this is an opportunity to see how it works.

# Technologies

The following technologies have been used throughout the project's development. Some remain part of the current stack, while others were replaced as the architecture evolved. Each entry briefly explains the reasoning behind its adoption and, when applicable, why it was eventually replaced.

## Front End

- Typescript: I like typed languages :)
- Chess.js: at this point, I see no reason to implement the chess logic myself. There are many edge cases and rules that would require significant effort to handle correctly, and solving those problems would only distract from the actual goals of this project.
- Three.js: the abstraction offered by Three.js is excellent. I feel more confident using it, and I don't see a compelling reason to adopt another engine such as Babylon.js for this project.
- Alpine.js: I wanted a lightweight solution that keeps the application close to standard HTML instead of introducing a large framework. Alpine.js provides enough reactivity for the UI while keeping the code simple and allowing me to build my own architecture around Web Components and TypeScript.
- Tailwind CSS: I prefer a utility-first approach over maintaining large CSS files. Tailwind makes it easy to prototype interfaces quickly while remaining consistent. Combined with a small design system based on CSS variables, it provides a flexible foundation for supporting themes and reusable components.

## Back End
-

## Infrastructure
-

## Database
-

## Tooling
- Docker
- PWA

# Running

From the project root:

## Start the frontend

```bash
pnpm --dir src/frontend dev
```

## Start the backend

```bash
pnpm --dir src/backend dev
```

## Installing dependencies

Syntax for dependency:

```bash
pnpm run add:<app> <package>
```

Syntax for development dependency:

```bash
pnpm run add-dev:<app> <package>
```

Example:

```bash
pnpm run add:frontend chess.js
```
