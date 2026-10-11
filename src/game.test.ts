import { createCanvas } from "@napi-rs/canvas";
import { ConstantClock, createEngine } from "@clockwyrks/simple-2d";
import { describe, expect, it } from "vitest";
import { FIELD_H, FIELD_W, SCORE_LARGE, TICK_DT } from "./constants";
import { game } from "./game";

function makeEngine() {
  const canvas = createCanvas(FIELD_W, FIELD_H) as unknown as HTMLCanvasElement;
  const target = new EventTarget();
  return createEngine({
    canvas,
    width: FIELD_W,
    height: FIELD_H,
    game,
    background: "#050711",
    clock: new ConstantClock(TICK_DT * 1000),
    surface: {
      cssWidth: () => FIELD_W,
      cssHeight: () => FIELD_H,
      dpr: () => 1,
      events: () => target,
    },
  });
}

describe("Shatter", () => {
  it("initializes the title state and debug snapshot", async () => {
    const engine = makeEngine();
    await engine.initialize();

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.screen).toBe("title");
    expect(snap.ship.x).toBe(640);
    expect(snap.ship.y).toBe(560);
    expect(snap.torpedoReady).toBe(true);
    expect(engine.debug.menuItemRect(engine.state, 0)).not.toBeNull();
  });

  it("applies gravity to ballistic bullets but not the ship", async () => {
    const engine = makeEngine();
    await engine.initialize();
    engine.apply((s) => engine.debug.setScreen(s, "playing"));
    engine.apply((s) => engine.debug.setWaveSpawning(s, false));
    engine.apply((s) => engine.debug.addBullet(s, 260, 360, 0, 0));
    engine.apply((s) => engine.debug.setShipPosition(s, 260, 520));
    engine.apply((s) => engine.debug.setShipVelocity(s, 0, 0));

    await engine.advance(1);

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.bullets[0]?.vx).toBeGreaterThan(0);
    expect(snap.ship.vx).toBe(0);
  });

  it("lets a torpedo destroy an armored large rock outright", async () => {
    const engine = makeEngine();
    await engine.initialize();
    engine.apply((s) => engine.debug.setScreen(s, "playing"));
    engine.apply((s) => engine.debug.setWaveSpawning(s, false));
    engine.apply((s) => engine.debug.clearRocks(s));
    engine.apply((s) => engine.debug.addRock(s, "large", 800, 360));
    engine.apply((s) => engine.debug.addTorpedo(s, 760, 360, 0));

    await engine.advance(4);

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.score).toBe(SCORE_LARGE);
    expect(snap.rocks).toHaveLength(2);
    expect(snap.rocks.every((rock) => rock.size === "medium")).toBe(true);
    expect(snap.torpedoes).toHaveLength(0);
  });

  it("poses rock speeds for wave spawning", async () => {
    const engine = makeEngine();
    await engine.initialize();
    engine.apply((s) => engine.debug.setScreen(s, "playing"));
    engine.apply((s) => engine.debug.setNextRockSpeed(s, 100));
    engine.apply((s) => engine.debug.setWave(s, 1));
    engine.apply((s) => engine.debug.setWaveBanner(s, TICK_DT));

    await engine.advance(1);

    const snap = engine.debug.snapshot(engine.state);
    expect(snap.rocks).toHaveLength(4);
    expect(Math.hypot(snap.rocks[0]!.vx, snap.rocks[0]!.vy)).toBeCloseTo(
      100,
      4,
    );
  });
});
