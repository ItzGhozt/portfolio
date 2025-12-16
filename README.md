# Interactive Portfolio Game

A 2D interactive portfolio experience built with Kaboom.js where visitors can explore a virtual world to learn about me.

**Live Demo:** [adventure.isabel-yeow.dev](https://adventure.isabel-yeow.dev)

---

## Features

- **Interactive 2D World** - Explore a custom-designed map with your character
- **Smooth Controls** - Mouse click or keyboard (WASD/Arrow keys) movement
- **Dialogue System** - Interact with objects to learn about my work and experience
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Custom Sprites & Maps** - Hand-crafted visuals using Tiled Map Editor

---

## Tech Stack

- **[Kaboom.js](https://kaboomjs.com/)** - Game framework for 2D games
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **JavaScript (ES6+)** - Modern JavaScript features
- **[Tiled](https://www.mapeditor.org/)** - Map design and level creation
- **GitHub Pages** - Hosting and deployment
- **GitHub Actions** - Automated CI/CD pipeline

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/ItzGhozt/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will open automatically at `http://localhost:5173`

---

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/                      # Static assets
│   ├── map.json                # Tiled map data
│   ├── map.png                 # Map tileset
│   ├── REAL.png                # Player sprite sheet
│   ├── spritesheet.png         # Game sprites
│   └── monogram.ttf            # Custom font
├── src/                         # Source code
│   ├── scenes/
│   │   ├── mapScene.js         # Main game scene logic
│   │   └── sceneConfig.js      # Scene configuration
│   ├── constants.js            # Game constants & dialogue
│   ├── kaboomCtx.js            # Kaboom initialization
│   ├── main.js                 # Entry point
│   └── utils.js                # Utility functions
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
└── vite.config.js              # Vite configuration
```

---

## Controls

| Input | Action |
|-------|--------|
| **Mouse Click** | Move player towards mouse position |
| **WASD / Arrow Keys** | Move player in four directions |
| **Collision with Objects** | Trigger dialogue and interactions |

---

## Customization

### Adding Dialogue

Edit `src/constants.js` to add or modify dialogue:

```javascript
export const dialogueData = {
  "Object Name": [
    "First line of dialogue",
    "Second line of dialogue",
  ],
};
```

### Editing Maps

1. Open `public/map.json` in [Tiled Map Editor](https://www.mapeditor.org/)
2. Edit tiles, boundaries, and spawn points
3. Export as JSON
4. Update references in `src/scenes/sceneConfig.js` if needed

### Changing Sprites

1. Replace sprite files in the `public/` folder
2. Update sprite loading in `src/main.js`:

```javascript
k.loadSprite("player", "/YOUR_SPRITE.png", {
  sliceX: 16,  // Number of frames horizontally
  sliceY: 1,   // Number of frames vertically
  anims: {
    // Define your animations
  }
});
```

---

## Deployment

The project automatically deploys to GitHub Pages via GitHub Actions whenever you push to the `main` branch.

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains your production build
# Upload it to any static hosting service
```

### Deployment Workflow

The site is deployed automatically using GitHub Actions:

1. Push code to `main` branch
2. GitHub Actions builds the project
3. Deploys to GitHub Pages
4. Available at [adventure.isabel-yeow.dev](https://adventure.isabel-yeow.dev)

---

## Custom Domain Setup

This project is configured to work with the custom domain `adventure.isabel-yeow.dev`.

### DNS Configuration

**CNAME Record:**
```
Host: adventure
Target: itzghozt.github.io
```

**Files Configured:**
- `public/CNAME` - Contains the custom domain
- `vite.config.js` - Base URL set to `/` for custom domain

### Changing the Domain

1. Update `public/CNAME` with your domain
2. Configure DNS records with your registrar
3. Update GitHub Pages settings:
   - Go to Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

---

## Troubleshooting

### Blank Screen After Deployment

**Issue:** Assets not loading on GitHub Pages

**Solution:** 
- Check `vite.config.js` base path configuration
- Verify all asset paths in code start with `/`
- Clear browser cache or test in incognito mode

### Sprites Not Loading

**Issue:** Images fail to load

**Solution:**
- Ensure files exist in `public/` folder
- Verify file names match exactly (case-sensitive)
- Check browser console for 404 errors

### Map Not Rendering

**Issue:** Game runs but map doesn't appear

**Solution:**
- Validate JSON file at [jsonlint.com](https://jsonlint.com/)
- Verify `map.json` is in `public/` folder
- Check console for parsing errors

### Local Development Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## Author

**Isabel Yeow**

- Website: [adventure.isabel-yeow.dev](https://adventure.isabel-yeow.dev)
- GitHub: [@ItzGhozt](https://github.com/ItzGhozt)
- Portfolio: [isabel-yeow.dev](https://isabel-yeow.dev)

---

## Acknowledgments

- [Kaboom.js](https://kaboomjs.com/) - Amazing game framework
- [Tiled](https://www.mapeditor.org/) - Map editor
- [Vite](https://vitejs.dev/) - Build tool
