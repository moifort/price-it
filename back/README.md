# Price-it Backend

This repository contains the backend code for the Price-it application, organized using Domain-Driven Design principles.

## Architecture Overview

The application is structured with distinct domains, each responsible for a specific area of functionality. Below is a dependency graph showing how these domains interact with each other:

```mermaid
graph TD
    index --> api
    api --> user
    api --> shop
    api --> game
    api --> game-guess
    api --> airdrop
    api --> run
    api --> score
    api --> leaderboard
    api --> player
    api --> payment
    api --> system
    api --> utils
    
    shop --> run
    shop --> score
    shop --> shop-product
    
    run --> score
    
    game-guess --> game
    game-guess --> score
    game-guess --> run
    
    leaderboard --> score
    
    payment --> score
    
    player --> user
    player --> run
</mermaid>

## Domain Structure

Each domain follows a consistent structure:
- `command.ts`: Contains write operations for the domain
- `query.ts`: Contains read operations for the domain
- `infra/`: Infrastructure code including repositories and external services
- `business-rules/`: Pure functions implementing domain business logic
- `graphql/`: GraphQL definitions for the domain (if applicable)
- `types.ts`: Type definitions for the domain
- `validators.ts`: Validation functions for the domain

## Development Guidelines

- Business rules should be pure functions without infrastructure dependencies
- Commands handle write operations
- Queries handle read operations
- Infrastructure code manages external concerns like databases and APIs
- Tests are organized as:
  - `*.unit.test.ts`: For pure functions without async operations
  - `*.int.test.ts`: For functions making API calls
  - `*.feat.test.ts`: For functions using infrastructure like Firestore

## Command to generate this document

```
En analysant le dossier back crée moi un markdown README.md en utilisant mermaid un graph de dépendance entre mes différents domaines
- Regroupe tout pas domaine
- tout en haut on a 'index.ts'
- En dessous avec une connexion a 'index.ts' on a 'api' 
- En dessous d''api on a tous les autres domaines leur interaction en se basant uniquement sur les imports des fichiers 'query.ts' et 'command.ts' en les groupant sous le nom du domaine. Tout domain possedant un dossier 'graphql' doit être connecté a 'api'
- Place les sous domaines en dessous des domaines en te basant sur la definition suivante 'shop' => domain principale, 'shop-{name}' => Sous domaine).

Mermaid: pas de couleur pas de subgraph 