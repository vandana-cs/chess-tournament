# ♟ Chess Tournament Management System

## Project Overview

Chess Tournament Management System is a web application used to manage chess tournaments, players, registrations, matches, and rankings.

The system allows administrators to add players, create tournaments, register players, generate matches, select winners, and view tournament rankings.

## Features

### Player Management
- Add players
- View players
- Update player details
- Delete players

### Tournament Management
- Create tournaments
- View tournaments
- Update tournament details
- Delete tournaments

### Tournament Registration
- Register players for tournaments
- Prevent duplicate registrations

### Match Management
- Generate matches between registered players
- Select match winner

### Rankings
- Display player rankings based on wins

## Technologies Used

### Frontend
- SvelteKit
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- REST APIs

### Database
- PostgreSQL

## Database Tables

### Players
id
name
age
rating

### Tournaments
id
name
date
location

### Tournament Players
id
player_id
tournament_id

### Matches
id
tournament_id
player1
player2
winner

## Setup Instructions

Clone the repository:
git clone <repository-url>

Install dependencies:
npm install

Run the application:
npm run dev

Open:
http://localhost:5173/

## Assignment Completion

| Requirement | Status |
|---|---|
| Player CRUD | ✅ |
| Tournament CRUD | ✅ |
| PostgreSQL Database | ✅ |
| Player Registration | ✅ |
| Match Generation | ✅ |
| Winner Selection | ✅ |
| Rankings | ✅ |
| SvelteKit Frontend | ✅ |
| REST APIs | ✅ |

## Screenshots

Add screenshots of:
- Player page
- Tournament page
- Registration page
- Matches page
- Rankings page