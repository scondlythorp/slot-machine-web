# 🎰 Slot Machine Web

A fully functional browser-based slot machine game with player accounts, leaderboards, sound effects, and jackpot system.

## Features

- **Player Accounts** - Login with username/password, stored securely using SHA-256 hashing
- **Balance System** - Start with $500, place bets and win real rewards
- **Jackpot** - 5% of each bet contributes to a growing jackpot
- **Sound Effects** - Spin sounds, win sounds, jackpot celebration, button clicks
- **Leaderboard** - Track top players by balance
- **Volume Control** - Adjustable sound volume slider
- **Mute Toggle** - Enable/disable all game sounds
- **Confetti Animation** - Visual celebration on big wins
- **Responsive Design** - Works on desktop and mobile

## How to Play

1. **Login** - Enter username and password, select an avatar
2. **Place Bet** - Use the bet input to set your wager amount
3. **Spin** - Click the SPIN button to start the reels
4. **Win** - Match 3 symbols to win (higher symbols = bigger payouts)

### Symbol Values

| Symbol | Payout |
|--------|--------|
| 💎 Diamond | 50x |
| 🔔 Bell | 30x |
| 🍒 Cherry | 20x |
| 🍋 Lemon | 10x |
| ⭐ Star | 5x |

## Getting Started

Simply open `index.html` in your web browser. No server required!

```bash
# Or serve locally
npx serve .
```

## Files

- `index.html` - Main game interface
- `script.js` - Game logic and functionality
- `style.css` - Visual styling
- `sounds/` - Audio files for game effects

## Technical Details

- Pure vanilla JavaScript (no frameworks)
- LocalStorage for data persistence
- SHA-256 password hashing
- CSS animations for visual effects
- Web Audio API for sound playback

## License

MIT