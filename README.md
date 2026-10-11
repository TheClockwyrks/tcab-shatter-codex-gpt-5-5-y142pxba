# Shatter

Shatter is a browser-only gravity-well rock shooter. You pilot a small momentum-driven ship through a wrapping starfield, bend shots around the central star, break armored rocks down through their fragments, and survive the saucer that arrives to hunt you.

This is the Warhead build: large rocks carry armor, and the ship carries a single homing torpedo on a ten-second recharge. The torpedo flies true through the well and destroys any rock outright.

## Install

```sh
npm ci
```

## Development

```sh
npm run dev
```

Vite serves the game locally with hot reload.

## Production Build

```sh
npm run build
```

The static site is written to `dist/` and can be served from any static host.

## Controls

- `ARROWS` or `WASD`: turn and thrust
- `SPACE`: fire the gun, and confirm menu choices
- `F`: launch the homing torpedo when charged
- `ENTER`: confirm menu choices
- `ESC`: pause, resume, or go back
- `P`: pause or resume
- `M`: mute or unmute

Clear every wave by destroying all rocks. The star pulls rocks and bullets, but never the ship or torpedo, so curving a shot around the core is often the cleanest way through.
