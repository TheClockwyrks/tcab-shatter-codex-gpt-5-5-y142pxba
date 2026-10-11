import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import {
  ACTIONS,
  BINDINGS,
  BULLET_LIFE,
  BULLET_R,
  CORE_R,
  CUES,
  EXTRA_LIFE_STEP,
  FACE_UP,
  FIELD_H,
  FIELD_W,
  FIRE_INTERVAL_TICKS,
  HALO_R,
  HIT_FLASH_TIME,
  INVULN_TIME,
  MAX_BULLETS,
  MU,
  MUZZLE_SPEED,
  PAUSE_ITEMS,
  ROCK_CHILD,
  ROCK_HEALTH,
  ROCK_RADIUS,
  ROCK_SPEED_MAX,
  ROCK_SPEED_MIN,
  SAFE_X,
  SAFE_Y,
  SAUCER_AIM_ERROR,
  SAUCER_BULLET_LIFE,
  SAUCER_BULLET_R,
  SAUCER_BULLET_SPEED,
  SAUCER_FIRE_INTERVAL,
  SAUCER_FIRST_DELAY,
  SAUCER_GAP_MAX,
  SAUCER_GAP_MIN,
  SAUCER_LIFETIME,
  SAUCER_R,
  SAUCER_SPEED,
  SAUCER_WEAVE_INTERVAL,
  SAUCER_WEAVE_SPEED,
  SCORE_LARGE,
  SCORE_MEDIUM,
  SCORE_SAUCER,
  SCORE_SMALL,
  SHATTER_DEBUG_VERSION,
  SHIP_DRAG_HALFLIFE,
  SHIP_MAX,
  SHIP_R,
  SHIP_THRUST,
  SHIP_TURN,
  SOFTEN,
  SPLIT_KICK,
  START_LIVES,
  STAR_X,
  STAR_Y,
  TAGLINE_TEXT,
  TICK_DT,
  TITLE_ITEMS,
  TITLE_TEXT,
  TORPEDO_CONE,
  TORPEDO_LIFE,
  TORPEDO_R,
  TORPEDO_RECHARGE,
  TORPEDO_SCATTER,
  TORPEDO_SPEED,
  TORPEDO_TURN,
  TRAIL_TICKS,
  WAVE_BANNER_TIME,
  WAVE_BASE_ROCKS,
  WAVE_MIN_SHIP_DIST,
  WAVE_MIN_STAR_DIST,
  WAVE_SPEED_CAP,
  WAVE_SPEED_STEP,
} from "./constants";
import type { RockSize } from "./constants";

export type Screen = "title" | "howto" | "playing" | "paused" | "gameover";
export type SaucerEdge = "left" | "right";
export type FieldEdge = "top" | "bottom" | "left" | "right";

export interface ShipState {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly angle: number;
  readonly thrusting: boolean;
  readonly invuln: number;
  readonly collision: boolean;
  readonly fireCooldown: number;
}

export interface BulletState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly life: number;
}

export interface RockState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly size: RockSize;
  readonly spin: number;
  readonly health: number;
  readonly flash: number;
}

export interface SaucerState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly mind: boolean;
  readonly gun: boolean;
  readonly travel: boolean;
  readonly weave: 1 | -1;
  readonly fireClock: number;
  readonly weaveClock: number;
  readonly age: number;
}

export interface TorpedoState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly heading: number;
  readonly life: number;
  readonly homing: boolean;
}

export interface ShatterState {
  readonly screen: Screen;
  readonly menuIndex: number;

  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;

  readonly ship: ShipState;
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly RockState[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;

  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;

  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;

  readonly tickClock: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}

type Rect = { x: number; y: number; w: number; h: number };
type Snapshot = ReturnType<typeof snapshot>;

export interface ShatterDebugApi {
  readonly version: number;
  reset(state: DeepReadonly<ShatterState>): ShatterState;
  snapshot(state: DeepReadonly<ShatterState>): Snapshot;
  reconcile(state: DeepReadonly<ShatterState>): ShatterState;
  menuItemRect(state: DeepReadonly<ShatterState>, index: number): Rect | null;
  setScreen(state: DeepReadonly<ShatterState>, screen: Screen): ShatterState;
  setMenuIndex(state: DeepReadonly<ShatterState>, n: number): ShatterState;
  setScore(state: DeepReadonly<ShatterState>, n: number): ShatterState;
  setLives(state: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWave(state: DeepReadonly<ShatterState>, n: number): ShatterState;
  setWaveBanner(
    state: DeepReadonly<ShatterState>,
    seconds: number,
  ): ShatterState;
  setWaveSpawning(
    state: DeepReadonly<ShatterState>,
    enabled: boolean,
  ): ShatterState;
  setSaucerSpawning(
    state: DeepReadonly<ShatterState>,
    enabled: boolean,
  ): ShatterState;
  setSaucerDue(
    state: DeepReadonly<ShatterState>,
    seconds: number,
  ): ShatterState;
  setShipPosition(
    state: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipVelocity(
    state: DeepReadonly<ShatterState>,
    vx: number,
    vy: number,
  ): ShatterState;
  setShipAngle(
    state: DeepReadonly<ShatterState>,
    radians: number,
  ): ShatterState;
  setShipInvuln(
    state: DeepReadonly<ShatterState>,
    seconds: number,
  ): ShatterState;
  setFireCooldown(
    state: DeepReadonly<ShatterState>,
    ticks: number,
  ): ShatterState;
  setShipCollision(
    state: DeepReadonly<ShatterState>,
    enabled: boolean,
  ): ShatterState;
  addBullet(
    state: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeBullet(state: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearBullets(state: DeepReadonly<ShatterState>): ShatterState;
  addEnemyBullet(
    state: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeEnemyBullet(
    state: DeepReadonly<ShatterState>,
    id: number,
  ): ShatterState;
  clearEnemyBullets(state: DeepReadonly<ShatterState>): ShatterState;
  addRock(
    state: DeepReadonly<ShatterState>,
    size: RockSize,
    x: number,
    y: number,
  ): ShatterState;
  setRockVelocity(
    state: DeepReadonly<ShatterState>,
    id: number,
    vx: number,
    vy: number,
  ): ShatterState;
  setRockHealth(
    state: DeepReadonly<ShatterState>,
    id: number,
    hp: number,
  ): ShatterState;
  removeRock(state: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearRocks(state: DeepReadonly<ShatterState>): ShatterState;
  addSaucer(
    state: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setSaucerVelocity(
    state: DeepReadonly<ShatterState>,
    vx: number,
    vy: number,
  ): ShatterState;
  setSaucerWeave(
    state: DeepReadonly<ShatterState>,
    direction: 1 | -1,
  ): ShatterState;
  removeSaucer(state: DeepReadonly<ShatterState>): ShatterState;
  setSaucerMind(
    state: DeepReadonly<ShatterState>,
    enabled: boolean,
  ): ShatterState;
  setSaucerGun(
    state: DeepReadonly<ShatterState>,
    enabled: boolean,
  ): ShatterState;
  setSaucerTravel(
    state: DeepReadonly<ShatterState>,
    enabled: boolean,
  ): ShatterState;
  setNextSaucerEdge(
    state: DeepReadonly<ShatterState>,
    edge: SaucerEdge,
  ): ShatterState;
  setNextSaucerRow(state: DeepReadonly<ShatterState>, y: number): ShatterState;
  setNextSaucerAim(
    state: DeepReadonly<ShatterState>,
    radians: number,
  ): ShatterState;
  setNextRockSpeed(
    state: DeepReadonly<ShatterState>,
    speed: number,
  ): ShatterState;
  setNextRecycleEdge(
    state: DeepReadonly<ShatterState>,
    edge: FieldEdge,
  ): ShatterState;
  setTorpedoCharge(
    state: DeepReadonly<ShatterState>,
    fraction: number,
  ): ShatterState;
  addTorpedo(
    state: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    heading: number,
  ): ShatterState;
  setTorpedoHeading(
    state: DeepReadonly<ShatterState>,
    id: number,
    radians: number,
  ): ShatterState;
  setTorpedoHoming(
    state: DeepReadonly<ShatterState>,
    id: number,
    enabled: boolean,
  ): ShatterState;
  removeTorpedo(state: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearTorpedoes(state: DeepReadonly<ShatterState>): ShatterState;
}

export const BACKGROUND = "#050711";

const TWO_PI = Math.PI * 2;
const MENU_W = 310;
const MENU_H = 48;
const MENU_GAP = 16;
const ROCK_SCORE: Readonly<Record<RockSize, number>> = {
  large: SCORE_LARGE,
  medium: SCORE_MEDIUM,
  small: SCORE_SMALL,
};

function finite(name: string, value: number): number {
  if (!Number.isFinite(value))
    throw new Error(`Shatter debug: ${name} must be finite`);
  return value;
}

function assertSize(size: RockSize): RockSize {
  if (size !== "large" && size !== "medium" && size !== "small") {
    throw new Error(`Shatter debug: invalid rock size ${String(size)}`);
  }
  return size;
}

function assertEdge(edge: FieldEdge): FieldEdge {
  if (!["top", "bottom", "left", "right"].includes(edge)) {
    throw new Error(`Shatter debug: invalid edge ${String(edge)}`);
  }
  return edge;
}

function assertSaucerEdge(edge: SaucerEdge): SaucerEdge {
  if (edge !== "left" && edge !== "right") {
    throw new Error(`Shatter debug: invalid saucer edge ${String(edge)}`);
  }
  return edge;
}

function assertScreen(screen: Screen): Screen {
  if (
    screen !== "title" &&
    screen !== "howto" &&
    screen !== "playing" &&
    screen !== "paused" &&
    screen !== "gameover"
  ) {
    throw new Error(`Shatter debug: invalid screen ${String(screen)}`);
  }
  return screen;
}

function assertWeave(direction: 1 | -1): 1 | -1 {
  if (direction !== 1 && direction !== -1) {
    throw new Error(`Shatter debug: invalid weave ${String(direction)}`);
  }
  return direction;
}

function assertFraction(name: string, value: number): number {
  finite(name, value);
  if (value < 0 || value > 1) {
    throw new Error(`Shatter debug: ${name} must be from 0 to 1`);
  }
  return value;
}

function removeById<T extends { readonly id: number }>(
  list: readonly T[],
  id: number,
  name: string,
): T[] {
  const filtered = list.filter((item) => item.id !== id);
  if (filtered.length === list.length)
    throw new Error(`Shatter debug: no ${name} ${id}`);
  return filtered;
}

function wrap(value: number, size: number): number {
  return ((value % size) + size) % size;
}

function wrappedDelta(a: number, b: number, size: number): number {
  let d = b - a;
  if (d >= size / 2) d -= size;
  if (d < -size / 2) d += size;
  return d;
}

function separation(
  ax: number,
  ay: number,
  bx: number,
  by: number,
): { dx: number; dy: number } {
  return {
    dx: wrappedDelta(ax, bx, FIELD_W),
    dy: wrappedDelta(ay, by, FIELD_H),
  };
}

function distance(ax: number, ay: number, bx: number, by: number): number {
  const d = separation(ax, ay, bx, by);
  return Math.hypot(d.dx, d.dy);
}

function directGravity(x: number, y: number): { ax: number; ay: number } {
  const dx = STAR_X - x;
  const dy = STAR_Y - y;
  const d = Math.hypot(dx, dy);
  if (d === 0) return { ax: 0, ay: 0 };
  const effective = Math.max(d, SOFTEN);
  const a = MU / (effective * effective);
  return { ax: (dx / d) * a, ay: (dy / d) * a };
}

function angleVector(angle: number): { x: number; y: number } {
  return { x: Math.cos(angle), y: Math.sin(angle) };
}

function angleDiff(from: number, to: number): number {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

function clampMagnitude(
  vx: number,
  vy: number,
  max: number,
): { vx: number; vy: number } {
  const speed = Math.hypot(vx, vy);
  if (speed <= max || speed === 0) return { vx, vy };
  const scale = max / speed;
  return { vx: vx * scale, vy: vy * scale };
}

function initialShip(): ShipState {
  return {
    x: SAFE_X,
    y: SAFE_Y,
    vx: 0,
    vy: 0,
    angle: FACE_UP,
    thrusting: false,
    invuln: 0,
    collision: true,
    fireCooldown: 0,
  };
}

function titleState(muted = false): ShatterState {
  return {
    screen: "title",
    menuIndex: 0,
    score: 0,
    lives: START_LIVES,
    wave: 0,
    waveBanner: 0,
    ship: initialShip(),
    bullets: [],
    rocks: [],
    saucer: null,
    enemyBullets: [],
    torpedoes: [],
    torpedoCharge: 1,
    waveSpawning: true,
    saucerSpawning: true,
    saucerClock: 0,
    saucerDue: SAUCER_FIRST_DELAY,
    nextSaucerEdge: null,
    nextSaucerRow: null,
    nextSaucerAim: null,
    nextRockSpeed: null,
    nextRecycleEdge: null,
    tickClock: 0,
    nextId: 1,
    simTime: 0,
    muted,
  };
}

function startGame(state: DeepReadonly<ShatterState>): ShatterState {
  const base = titleState(state.muted);
  return spawnWave({ ...base, screen: "playing", wave: 1 }, 1);
}

function menuItems(screen: Screen): readonly string[] {
  if (screen === "title") return TITLE_ITEMS;
  if (screen === "paused") return PAUSE_ITEMS;
  if (screen === "gameover") return ["PLAY AGAIN", "MENU"];
  return [];
}

function menuRect(
  state: DeepReadonly<ShatterState>,
  index: number,
): Rect | null {
  const items = menuItems(state.screen);
  if (index < 0 || index >= items.length) return null;
  const startY =
    state.screen === "title" ? 410 : state.screen === "gameover" ? 430 : 330;
  return {
    x: FIELD_W / 2 - MENU_W / 2,
    y: startY + index * (MENU_H + MENU_GAP),
    w: MENU_W,
    h: MENU_H,
  };
}

function pointInRect(x: number, y: number, rect: Rect): boolean {
  return (
    x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h
  );
}

function itemAt(
  state: DeepReadonly<ShatterState>,
  x: number,
  y: number,
): number | null {
  for (let i = 0; i < menuItems(state.screen).length; i += 1) {
    const rect = menuRect(state, i);
    if (rect && pointInRect(x, y, rect)) return i;
  }
  return null;
}

function nextId(state: ShatterState): [number, ShatterState] {
  return [state.nextId, { ...state, nextId: state.nextId + 1 }];
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function consumeRockSpeed(
  state: ShatterState,
  size: RockSize,
): [number, ShatterState] {
  if (state.nextRockSpeed !== null)
    return [state.nextRockSpeed, { ...state, nextRockSpeed: null }];
  return [randomRange(ROCK_SPEED_MIN[size], ROCK_SPEED_MAX[size]), state];
}

function randomWavePoint(ship: ShipState): { x: number; y: number } {
  for (let i = 0; i < 1000; i += 1) {
    const x = Math.random() * FIELD_W;
    const y = Math.random() * FIELD_H;
    if (
      distance(x, y, ship.x, ship.y) >= WAVE_MIN_SHIP_DIST &&
      distance(x, y, STAR_X, STAR_Y) >= WAVE_MIN_STAR_DIST
    ) {
      return { x, y };
    }
  }
  return { x: 80, y: 80 };
}

function makeRock(
  state: ShatterState,
  size: RockSize,
  x: number,
  y: number,
  vx: number,
  vy: number,
): [RockState, ShatterState] {
  const [id, withId] = nextId(state);
  return [
    {
      id,
      x: wrap(x, FIELD_W),
      y: wrap(y, FIELD_H),
      vx,
      vy,
      size,
      spin: Math.random() * TWO_PI,
      health: ROCK_HEALTH[size],
      flash: 0,
    },
    withId,
  ];
}

function spawnWave(state: ShatterState, wave: number): ShatterState {
  let next = state;
  const rocks: RockState[] = [];
  const multiplier = 1 + Math.min(WAVE_SPEED_CAP, WAVE_SPEED_STEP * (wave - 1));
  for (let i = 0; i < WAVE_BASE_ROCKS + wave; i += 1) {
    const pos = randomWavePoint(next.ship);
    const [speed, speedState] = consumeRockSpeed(next, "large");
    next = speedState;
    const angle = Math.random() * TWO_PI;
    const [rock, rockState] = makeRock(
      next,
      "large",
      pos.x,
      pos.y,
      Math.cos(angle) * speed * multiplier,
      Math.sin(angle) * speed * multiplier,
    );
    rocks.push(rock);
    next = rockState;
  }
  return { ...next, rocks, waveBanner: 0 };
}

function addScore(
  state: ShatterState,
  amount: number,
  cues: Set<string>,
): ShatterState {
  const before = Math.floor(state.score / EXTRA_LIFE_STEP);
  const score = state.score + amount;
  const after = Math.floor(score / EXTRA_LIFE_STEP);
  const gained = Math.max(0, after - before);
  if (gained > 0) cues.add(CUES.extraLife);
  return { ...state, score, lives: state.lives + gained };
}

function splitRock(
  state: ShatterState,
  rock: RockState,
  weaponVx: number,
  weaponVy: number,
  torpedo: boolean,
  cues: Set<string>,
): ShatterState {
  let next = addScore(state, ROCK_SCORE[rock.size], cues);
  cues.add(CUES.shatter);
  const child = ROCK_CHILD[rock.size];
  if (!child) return next;
  const speed = torpedo ? TORPEDO_SCATTER : SPLIT_KICK;
  const travel = Math.atan2(weaponVy, weaponVx);
  const angles = torpedo
    ? [travel, travel + Math.PI]
    : [travel + Math.PI / 2, travel - Math.PI / 2];
  const additions: RockState[] = [];
  for (const angle of angles) {
    const [fragment, withId] = makeRock(
      next,
      child,
      rock.x,
      rock.y,
      rock.vx + Math.cos(angle) * speed,
      rock.vy + Math.sin(angle) * speed,
    );
    additions.push(fragment);
    next = withId;
  }
  return { ...next, rocks: [...next.rocks, ...additions] };
}

function recycleRock(
  state: ShatterState,
  rock: RockState,
): [RockState, ShatterState] {
  const posed = state.nextRecycleEdge;
  const edge: FieldEdge =
    posed ??
    (["top", "bottom", "left", "right"] as const)[
      Math.floor(Math.random() * 4)
    ];
  let next = posed ? { ...state, nextRecycleEdge: null } : state;
  const [speed, speedState] = consumeRockSpeed(next, rock.size);
  next = speedState;
  const along = Math.random();
  const x = edge === "left" ? 0 : edge === "right" ? FIELD_W : along * FIELD_W;
  const y = edge === "top" ? 0 : edge === "bottom" ? FIELD_H : along * FIELD_H;
  const inward =
    edge === "left"
      ? 0
      : edge === "right"
        ? Math.PI
        : edge === "top"
          ? Math.PI / 2
          : -Math.PI / 2;
  return [
    {
      ...rock,
      x: wrap(x, FIELD_W),
      y: wrap(y, FIELD_H),
      vx: Math.cos(inward) * speed,
      vy: Math.sin(inward) * speed,
    },
    next,
  ];
}

function integratePulled<T extends BulletState | RockState>(body: T): T {
  const g = directGravity(body.x, body.y);
  const vx = body.vx + g.ax * TICK_DT;
  const vy = body.vy + g.ay * TICK_DT;
  return {
    ...body,
    vx,
    vy,
    x: wrap(body.x + vx * TICK_DT, FIELD_W),
    y: wrap(body.y + vy * TICK_DT, FIELD_H),
  };
}

function touches(
  ax: number,
  ay: number,
  ar: number,
  bx: number,
  by: number,
  br: number,
): boolean {
  return distance(ax, ay, bx, by) <= ar + br;
}

function launchBullet(state: ShatterState): ShatterState {
  if (state.ship.fireCooldown > 0 || state.bullets.length >= MAX_BULLETS)
    return state;
  const dir = angleVector(state.ship.angle);
  const [id, withId] = nextId(state);
  const bullet: BulletState = {
    id,
    x: wrap(state.ship.x + dir.x * SHIP_R, FIELD_W),
    y: wrap(state.ship.y + dir.y * SHIP_R, FIELD_H),
    vx: state.ship.vx + dir.x * MUZZLE_SPEED,
    vy: state.ship.vy + dir.y * MUZZLE_SPEED,
    life: BULLET_LIFE,
  };
  return {
    ...withId,
    ship: { ...withId.ship, fireCooldown: FIRE_INTERVAL_TICKS },
    bullets: [...withId.bullets, bullet],
  };
}

function launchTorpedo(state: ShatterState): ShatterState {
  if (state.torpedoCharge < 1 || state.torpedoes.length > 0) return state;
  const dir = angleVector(state.ship.angle);
  const [id, withId] = nextId(state);
  const torpedo: TorpedoState = {
    id,
    x: wrap(state.ship.x + dir.x * SHIP_R, FIELD_W),
    y: wrap(state.ship.y + dir.y * SHIP_R, FIELD_H),
    vx: dir.x * TORPEDO_SPEED,
    vy: dir.y * TORPEDO_SPEED,
    heading: state.ship.angle,
    life: TORPEDO_LIFE,
    homing: true,
  };
  return {
    ...withId,
    torpedoCharge: 0,
    torpedoes: [...withId.torpedoes, torpedo],
  };
}

function respawnOrGameOver(
  state: ShatterState,
  cues: Set<string>,
): ShatterState {
  cues.add(CUES.death);
  const lives = Math.max(0, state.lives - 1);
  if (lives <= 0)
    return {
      ...state,
      lives: 0,
      screen: "gameover",
      menuIndex: 0,
      ship: { ...state.ship, thrusting: false },
    };
  return {
    ...state,
    lives,
    ship: { ...initialShip(), invuln: INVULN_TIME },
    bullets: [],
    enemyBullets: [],
    torpedoes: [],
    torpedoCharge: 1,
  };
}

function updateSaucer(state: ShatterState, cues: Set<string>): ShatterState {
  let next = state;
  let saucer = next.saucer;
  if (!saucer) {
    if (next.saucerSpawning && next.screen === "playing") {
      const clock = next.saucerClock + TICK_DT;
      next = { ...next, saucerClock: clock };
      if (clock >= next.saucerDue) next = spawnSaucer(next, cues);
    }
    return next;
  }

  const vx = saucer.vx;
  let vy = saucer.vy;
  let weaveClock = saucer.weaveClock - TICK_DT;
  if (saucer.mind && weaveClock <= 0) {
    weaveClock += SAUCER_WEAVE_INTERVAL;
    vy =
      (Math.abs(vy) < 1 ? saucer.weave : -Math.sign(vy)) * SAUCER_WEAVE_SPEED;
  }
  let x = saucer.x;
  let y = saucer.y;
  if (saucer.travel) {
    x = wrap(x + vx * TICK_DT, FIELD_W);
    y = wrap(y + vy * TICK_DT, FIELD_H);
  }
  if (saucer.mind && distance(x, y, STAR_X, STAR_Y) < CORE_R + SAUCER_R + 18) {
    const away = Math.atan2(y - STAR_Y, x - STAR_X);
    vy = Math.sin(away) * SAUCER_WEAVE_SPEED;
    y = wrap(y + vy * TICK_DT, FIELD_H);
  }
  let fireClock = saucer.fireClock - TICK_DT;
  let enemyBullets = [...next.enemyBullets];
  if (saucer.gun && fireClock <= 0) {
    fireClock += SAUCER_FIRE_INTERVAL;
    const d = separation(x, y, next.ship.x, next.ship.y);
    const posed = next.nextSaucerAim;
    const error = posed ?? randomRange(-SAUCER_AIM_ERROR, SAUCER_AIM_ERROR);
    next = posed !== null ? { ...next, nextSaucerAim: null } : next;
    const angle = Math.atan2(d.dy, d.dx) + error;
    const [id, withId] = nextId(next);
    next = withId;
    enemyBullets = [
      ...enemyBullets,
      {
        id,
        x,
        y,
        vx: vx + Math.cos(angle) * SAUCER_BULLET_SPEED,
        vy: vy + Math.sin(angle) * SAUCER_BULLET_SPEED,
        life: SAUCER_BULLET_LIFE,
      },
    ];
  }
  saucer = {
    ...saucer,
    x,
    y,
    vx,
    vy,
    fireClock,
    weaveClock,
    age: saucer.age + TICK_DT,
  };
  if (saucer.age >= SAUCER_LIFETIME) {
    return {
      ...next,
      saucer: null,
      enemyBullets,
      saucerClock: 0,
      saucerDue: randomRange(SAUCER_GAP_MIN, SAUCER_GAP_MAX),
    };
  }
  return { ...next, saucer, enemyBullets };
}

function spawnSaucer(state: ShatterState, cues: Set<string>): ShatterState {
  const edge = state.nextSaucerEdge ?? (Math.random() < 0.5 ? "left" : "right");
  const row = state.nextSaucerRow ?? randomRange(SAUCER_R, FIELD_H - SAUCER_R);
  const [id, withId] = nextId({
    ...state,
    nextSaucerEdge: null,
    nextSaucerRow: null,
  });
  cues.add(CUES.saucer);
  return {
    ...withId,
    saucerClock: 0,
    saucer: {
      id,
      x: edge === "left" ? 0 : FIELD_W,
      y: row,
      vx: edge === "left" ? SAUCER_SPEED : -SAUCER_SPEED,
      vy: 0,
      mind: true,
      gun: true,
      travel: true,
      weave: Math.random() < 0.5 ? 1 : -1,
      fireClock: SAUCER_FIRE_INTERVAL,
      weaveClock: SAUCER_WEAVE_INTERVAL,
      age: 0,
    },
  };
}

function guideTorpedo(
  torpedo: TorpedoState,
  state: ShatterState,
): TorpedoState {
  if (!torpedo.homing) return torpedo;
  const candidates = [
    ...state.rocks.map((rock) => ({ x: rock.x, y: rock.y })),
    ...(state.saucer ? [{ x: state.saucer.x, y: state.saucer.y }] : []),
  ];
  let best: { angle: number; dist: number } | null = null;
  for (const candidate of candidates) {
    const d = separation(torpedo.x, torpedo.y, candidate.x, candidate.y);
    const angle = Math.atan2(d.dy, d.dx);
    const diff = Math.abs(angleDiff(torpedo.heading, angle));
    const dist = Math.hypot(d.dx, d.dy);
    if (diff <= TORPEDO_CONE && (!best || dist < best.dist))
      best = { angle, dist };
  }
  if (!best) return torpedo;
  const maxTurn = TORPEDO_TURN * TICK_DT;
  const turn = Math.max(
    -maxTurn,
    Math.min(maxTurn, angleDiff(torpedo.heading, best.angle)),
  );
  const heading = torpedo.heading + turn;
  return {
    ...torpedo,
    heading,
    vx: Math.cos(heading) * TORPEDO_SPEED,
    vy: Math.sin(heading) * TORPEDO_SPEED,
  };
}

function resolveCollisions(
  state: ShatterState,
  cues: Set<string>,
): ShatterState {
  let next = state;
  let rocks = [...next.rocks];
  let bullets = [...next.bullets];
  let enemyBullets = [...next.enemyBullets];
  let torpedoes = [...next.torpedoes];

  bullets = bullets.filter(
    (bullet) => !touches(bullet.x, bullet.y, BULLET_R, STAR_X, STAR_Y, CORE_R),
  );
  enemyBullets = enemyBullets.filter(
    (bullet) =>
      !touches(bullet.x, bullet.y, SAUCER_BULLET_R, STAR_X, STAR_Y, CORE_R),
  );
  torpedoes = torpedoes.filter(
    (torpedo) =>
      !touches(torpedo.x, torpedo.y, TORPEDO_R, STAR_X, STAR_Y, CORE_R),
  );

  const recycled: RockState[] = [];
  for (const rock of rocks) {
    if (
      touches(rock.x, rock.y, ROCK_RADIUS[rock.size], STAR_X, STAR_Y, CORE_R)
    ) {
      const [newRock, newState] = recycleRock(next, rock);
      next = newState;
      recycled.push(newRock);
    } else {
      recycled.push(rock);
    }
  }
  rocks = recycled;

  const remainingBullets: BulletState[] = [];
  for (const bullet of bullets) {
    let hit = false;
    for (let i = 0; i < rocks.length && !hit; i += 1) {
      const rock = rocks[i];
      if (
        touches(
          bullet.x,
          bullet.y,
          BULLET_R,
          rock.x,
          rock.y,
          ROCK_RADIUS[rock.size],
        )
      ) {
        hit = true;
        const health = rock.health - 1;
        rocks.splice(i, 1);
        if (health <= 0) {
          next = { ...next, rocks };
          next = splitRock(next, rock, bullet.vx, bullet.vy, false, cues);
          rocks = [...next.rocks];
        } else {
          rocks.splice(i, 0, { ...rock, health, flash: HIT_FLASH_TIME });
        }
      }
    }
    if (
      !hit &&
      next.saucer &&
      touches(
        bullet.x,
        bullet.y,
        BULLET_R,
        next.saucer.x,
        next.saucer.y,
        SAUCER_R,
      )
    ) {
      hit = true;
      next = addScore({ ...next, saucer: null }, SCORE_SAUCER, cues);
    }
    if (!hit) remainingBullets.push(bullet);
  }
  bullets = remainingBullets;

  const remainingTorpedoes: TorpedoState[] = [];
  for (const torpedo of torpedoes) {
    let hit = false;
    for (let i = 0; i < rocks.length && !hit; i += 1) {
      const rock = rocks[i];
      if (
        touches(
          torpedo.x,
          torpedo.y,
          TORPEDO_R,
          rock.x,
          rock.y,
          ROCK_RADIUS[rock.size],
        )
      ) {
        hit = true;
        rocks.splice(i, 1);
        next = { ...next, rocks };
        next = splitRock(next, rock, torpedo.vx, torpedo.vy, true, cues);
        rocks = [...next.rocks];
      }
    }
    if (
      !hit &&
      next.saucer &&
      touches(
        torpedo.x,
        torpedo.y,
        TORPEDO_R,
        next.saucer.x,
        next.saucer.y,
        SAUCER_R,
      )
    ) {
      hit = true;
      next = addScore({ ...next, saucer: null }, SCORE_SAUCER, cues);
    }
    if (!hit) remainingTorpedoes.push(torpedo);
  }
  torpedoes = remainingTorpedoes;

  next = { ...next, rocks, bullets, enemyBullets, torpedoes };
  if (next.ship.collision && next.ship.invuln <= 0) {
    const shipHitRock = next.rocks.some((rock) =>
      touches(
        next.ship.x,
        next.ship.y,
        SHIP_R,
        rock.x,
        rock.y,
        ROCK_RADIUS[rock.size],
      ),
    );
    const shipHitSaucer = next.saucer
      ? touches(
          next.ship.x,
          next.ship.y,
          SHIP_R,
          next.saucer.x,
          next.saucer.y,
          SAUCER_R,
        )
      : false;
    const bulletIndex = next.enemyBullets.findIndex((bullet) =>
      touches(
        next.ship.x,
        next.ship.y,
        SHIP_R,
        bullet.x,
        bullet.y,
        SAUCER_BULLET_R,
      ),
    );
    if (bulletIndex >= 0)
      next = {
        ...next,
        enemyBullets: next.enemyBullets.filter((_, i) => i !== bulletIndex),
      };
    if (shipHitRock || shipHitSaucer || bulletIndex >= 0)
      next = respawnOrGameOver(next, cues);
  }

  const dx = next.ship.x - STAR_X;
  const dy = next.ship.y - STAR_Y;
  const d = Math.hypot(dx, dy);
  if (d < CORE_R + SHIP_R && d > 0) {
    const nx = dx / d;
    const ny = dy / d;
    const inward = next.ship.vx * nx + next.ship.vy * ny;
    const vx = inward < 0 ? next.ship.vx - inward * nx : next.ship.vx;
    const vy = inward < 0 ? next.ship.vy - inward * ny : next.ship.vy;
    next = {
      ...next,
      ship: {
        ...next.ship,
        x: STAR_X + nx * (CORE_R + SHIP_R),
        y: STAR_Y + ny * (CORE_R + SHIP_R),
        vx,
        vy,
      },
    };
  }

  if (
    state.rocks.length > 0 &&
    next.rocks.length === 0 &&
    next.screen === "playing" &&
    next.waveSpawning
  ) {
    next = { ...next, wave: next.wave + 1, waveBanner: WAVE_BANNER_TIME };
  }
  return next;
}

function tick(
  state: ShatterState,
  controls: {
    left: boolean;
    right: boolean;
    thrust: boolean;
    fireHeld: boolean;
    torpedoPressed: boolean;
  },
  cues: Set<string>,
): ShatterState {
  let next = { ...state, simTime: state.simTime + TICK_DT };
  if (next.screen === "paused") return next;
  if (next.screen !== "playing") return next;

  if (controls.fireHeld) {
    const fired =
      next.ship.fireCooldown <= 0 && next.bullets.length < MAX_BULLETS;
    next = launchBullet(next);
    if (fired) cues.add(CUES.fire);
  }
  if (controls.torpedoPressed) next = launchTorpedo(next);
  if (controls.thrust) cues.add(CUES.thrust);

  const turn = (controls.right ? 1 : 0) - (controls.left ? 1 : 0);
  const angle = next.ship.angle + turn * SHIP_TURN * TICK_DT;
  let vx = next.ship.vx;
  let vy = next.ship.vy;
  if (controls.thrust) {
    vx += Math.cos(angle) * SHIP_THRUST * TICK_DT;
    vy += Math.sin(angle) * SHIP_THRUST * TICK_DT;
  }
  const drag = 0.5 ** (TICK_DT / SHIP_DRAG_HALFLIFE);
  vx *= drag;
  vy *= drag;
  ({ vx, vy } = clampMagnitude(vx, vy, SHIP_MAX));
  next = {
    ...next,
    ship: {
      ...next.ship,
      angle,
      vx,
      vy,
      x: wrap(next.ship.x + vx * TICK_DT, FIELD_W),
      y: wrap(next.ship.y + vy * TICK_DT, FIELD_H),
      thrusting: controls.thrust,
      invuln: Math.max(0, next.ship.invuln - TICK_DT),
      fireCooldown: Math.max(0, next.ship.fireCooldown - 1),
    },
    torpedoCharge: Math.min(1, next.torpedoCharge + TICK_DT / TORPEDO_RECHARGE),
    bullets: next.bullets
      .map((bullet) => ({
        ...integratePulled(bullet),
        life: bullet.life - TICK_DT,
      }))
      .filter((bullet) => bullet.life > 0),
    enemyBullets: next.enemyBullets
      .map((bullet) => ({
        ...integratePulled(bullet),
        life: bullet.life - TICK_DT,
      }))
      .filter((bullet) => bullet.life > 0),
    rocks: next.rocks.map((rock) => ({
      ...integratePulled(rock),
      spin: rock.spin + TICK_DT,
      flash: Math.max(0, rock.flash - TICK_DT),
    })),
    torpedoes: next.torpedoes
      .map((torpedo) => {
        const guided = guideTorpedo(torpedo, next);
        return {
          ...guided,
          x: wrap(guided.x + guided.vx * TICK_DT, FIELD_W),
          y: wrap(guided.y + guided.vy * TICK_DT, FIELD_H),
          life: guided.life - TICK_DT,
        };
      })
      .filter((torpedo) => torpedo.life > 0),
  };
  next = updateSaucer(next, cues);
  next = resolveCollisions(next, cues);
  if (next.waveBanner > 0) {
    const banner = Math.max(0, next.waveBanner - TICK_DT);
    next = { ...next, waveBanner: banner };
    if (state.waveBanner > 0 && banner === 0 && next.waveSpawning)
      next = spawnWave(next, next.wave);
  }
  return next;
}

function confirmMenu(state: ShatterState): ShatterState {
  if (state.screen === "title")
    return state.menuIndex === 0
      ? startGame(state)
      : { ...state, screen: "howto" };
  if (state.screen === "howto")
    return { ...state, screen: "title", menuIndex: 1 };
  if (state.screen === "paused") {
    if (state.menuIndex === 0)
      return { ...state, screen: "playing", menuIndex: 0 };
    if (state.menuIndex === 1) return startGame(state);
    return { ...titleState(state.muted), menuIndex: 0 };
  }
  if (state.screen === "gameover")
    return state.menuIndex === 0
      ? startGame(state)
      : { ...titleState(state.muted), menuIndex: 0 };
  return state;
}

function updateMenus(state: ShatterState, api: UpdateApi): ShatterState {
  let next = state;
  if (api.input.pressed("mute")) api.audio.setMuted(!api.audio.muted());
  if (next.screen === "playing" && api.input.pressed("pause"))
    return { ...next, screen: "paused", menuIndex: 0 };
  if (
    next.screen === "paused" &&
    (api.input.pressed("pause") || api.input.pressed("back"))
  )
    return { ...next, screen: "playing", menuIndex: 0 };
  if (
    next.screen === "howto" &&
    (api.input.pressed("confirm") || api.input.pressed("back"))
  )
    return { ...next, screen: "title", menuIndex: 1 };
  if (next.screen === "gameover" && api.input.pressed("back"))
    return { ...titleState(next.muted), menuIndex: 0 };

  const items = menuItems(next.screen);
  if (items.length > 0) {
    if (api.input.pressed("down"))
      next = { ...next, menuIndex: (next.menuIndex + 1) % items.length };
    if (api.input.pressed("up"))
      next = {
        ...next,
        menuIndex: (next.menuIndex + items.length - 1) % items.length,
      };
    const keyConfirmed = api.input.pressed("confirm");
    if (keyConfirmed) return confirmMenu(next);
    const pointer = api.input.pointer();
    const hover = itemAt(next, pointer.x, pointer.y);
    if (hover !== null) next = { ...next, menuIndex: hover };
    let downItem: number | null = null;
    let upItem: number | null = null;
    for (const sample of api.input.pointerSamples()) {
      const index = itemAt(next, sample.x, sample.y);
      if (sample.type === "down") downItem = index;
      if (sample.type === "move" && index !== null)
        next = { ...next, menuIndex: index };
      if (sample.type === "up") upItem = index;
    }
    if (downItem !== null && downItem === upItem)
      return confirmMenu({ ...next, menuIndex: downItem });
  }
  return next;
}

function snapshot(state: DeepReadonly<ShatterState>) {
  return {
    version: SHATTER_DEBUG_VERSION,
    screen: state.screen,
    menuIndex: state.menuIndex,
    score: state.score,
    lives: state.lives,
    wave: state.wave,
    waveBanner: state.waveBanner,
    muted: state.muted,
    waveSpawning: state.waveSpawning,
    saucerSpawning: state.saucerSpawning,
    saucerClock: state.saucerClock,
    saucerDue: state.saucerDue,
    nextSaucerEdge: state.nextSaucerEdge,
    nextSaucerRow: state.nextSaucerRow,
    nextSaucerAim: state.nextSaucerAim,
    nextRockSpeed: state.nextRockSpeed,
    nextRecycleEdge: state.nextRecycleEdge,
    ship: { ...state.ship, speed: Math.hypot(state.ship.vx, state.ship.vy) },
    bullets: state.bullets.map((b) => ({ ...b })),
    rocks: state.rocks.map((r) => ({
      id: r.id,
      x: r.x,
      y: r.y,
      vx: r.vx,
      vy: r.vy,
      size: r.size,
      radius: ROCK_RADIUS[r.size],
      health: r.health,
    })),
    saucer: state.saucer ? { ...state.saucer } : null,
    enemyBullets: state.enemyBullets.map((b) => ({ ...b })),
    torpedoes: state.torpedoes.map((t) => ({ ...t })),
    torpedoCharge: state.torpedoCharge,
    torpedoReady: state.torpedoCharge >= 1,
    simTime: state.simTime,
  };
}

function replaceRock(
  state: DeepReadonly<ShatterState>,
  id: number,
  edit: (rock: RockState) => RockState,
): ShatterState {
  let found = false;
  const rocks = state.rocks.map((rock) => {
    if (rock.id !== id) return rock;
    found = true;
    return edit(rock as RockState);
  });
  if (!found) throw new Error(`Shatter debug: no rock ${id}`);
  return { ...state, rocks } as ShatterState;
}

function replaceTorpedo(
  state: DeepReadonly<ShatterState>,
  id: number,
  edit: (torpedo: TorpedoState) => TorpedoState,
): ShatterState {
  let found = false;
  const torpedoes = state.torpedoes.map((torpedo) => {
    if (torpedo.id !== id) return torpedo;
    found = true;
    return edit(torpedo as TorpedoState);
  });
  if (!found) throw new Error(`Shatter debug: no torpedo ${id}`);
  return { ...state, torpedoes } as ShatterState;
}

function debugApi(): ShatterDebugApi {
  return {
    version: SHATTER_DEBUG_VERSION,
    reset: (state) => titleState(state.muted),
    snapshot,
    reconcile: (state) => state as ShatterState,
    menuItemRect: menuRect,
    setScreen: (state, screen) =>
      ({ ...state, screen: assertScreen(screen) }) as ShatterState,
    setMenuIndex: (state, n) =>
      ({ ...state, menuIndex: finite("menuIndex", n) }) as ShatterState,
    setScore: (state, n) =>
      ({ ...state, score: finite("score", n) }) as ShatterState,
    setLives: (state, n) =>
      ({ ...state, lives: finite("lives", n) }) as ShatterState,
    setWave: (state, n) =>
      ({ ...state, wave: finite("wave", n) }) as ShatterState,
    setWaveBanner: (state, seconds) =>
      ({
        ...state,
        waveBanner: Math.max(0, finite("waveBanner", seconds)),
      }) as ShatterState,
    setWaveSpawning: (state, enabled) =>
      ({ ...state, waveSpawning: enabled }) as ShatterState,
    setSaucerSpawning: (state, enabled) =>
      ({ ...state, saucerSpawning: enabled }) as ShatterState,
    setSaucerDue: (state, seconds) =>
      ({ ...state, saucerDue: finite("saucerDue", seconds) }) as ShatterState,
    setShipPosition: (state, x, y) =>
      ({
        ...state,
        ship: { ...state.ship, x: finite("x", x), y: finite("y", y) },
      }) as ShatterState,
    setShipVelocity: (state, vx, vy) =>
      ({
        ...state,
        ship: { ...state.ship, vx: finite("vx", vx), vy: finite("vy", vy) },
      }) as ShatterState,
    setShipAngle: (state, radians) =>
      ({
        ...state,
        ship: { ...state.ship, angle: finite("angle", radians) },
      }) as ShatterState,
    setShipInvuln: (state, seconds) =>
      ({
        ...state,
        ship: { ...state.ship, invuln: finite("invuln", seconds) },
      }) as ShatterState,
    setFireCooldown: (state, ticks) =>
      ({
        ...state,
        ship: { ...state.ship, fireCooldown: finite("fireCooldown", ticks) },
      }) as ShatterState,
    setShipCollision: (state, enabled) =>
      ({
        ...state,
        ship: { ...state.ship, collision: enabled },
      }) as ShatterState,
    addBullet: (state, x, y, vx, vy) => {
      const [id, next] = nextId(state as ShatterState);
      return {
        ...next,
        bullets: [
          ...next.bullets,
          {
            id,
            x: finite("x", x),
            y: finite("y", y),
            vx: finite("vx", vx),
            vy: finite("vy", vy),
            life: BULLET_LIFE,
          },
        ],
      };
    },
    removeBullet: (state, id) =>
      ({
        ...state,
        bullets: removeById(state.bullets, id, "bullet"),
      }) as ShatterState,
    clearBullets: (state) => ({ ...state, bullets: [] }) as ShatterState,
    addEnemyBullet: (state, x, y, vx, vy) => {
      const [id, next] = nextId(state as ShatterState);
      return {
        ...next,
        enemyBullets: [
          ...next.enemyBullets,
          {
            id,
            x: finite("x", x),
            y: finite("y", y),
            vx: finite("vx", vx),
            vy: finite("vy", vy),
            life: SAUCER_BULLET_LIFE,
          },
        ],
      };
    },
    removeEnemyBullet: (state, id) =>
      ({
        ...state,
        enemyBullets: removeById(state.enemyBullets, id, "enemy bullet"),
      }) as ShatterState,
    clearEnemyBullets: (state) =>
      ({ ...state, enemyBullets: [] }) as ShatterState,
    addRock: (state, size, x, y) => {
      const [rock, next] = makeRock(
        state as ShatterState,
        assertSize(size),
        finite("x", x),
        finite("y", y),
        0,
        0,
      );
      return { ...next, rocks: [...next.rocks, rock] };
    },
    setRockVelocity: (state, id, vx, vy) =>
      replaceRock(state, id, (rock) => ({
        ...rock,
        vx: finite("vx", vx),
        vy: finite("vy", vy),
      })),
    setRockHealth: (state, id, hp) =>
      replaceRock(state, id, (rock) => {
        if (!Number.isInteger(hp) || hp < 1 || hp > ROCK_HEALTH[rock.size])
          throw new Error("Shatter debug: invalid rock health");
        return { ...rock, health: hp };
      }),
    removeRock: (state, id) =>
      ({
        ...state,
        rocks: removeById(state.rocks, id, "rock"),
      }) as ShatterState,
    clearRocks: (state) => ({ ...state, rocks: [] }) as ShatterState,
    addSaucer: (state, x, y) => {
      const [id, next] = nextId(state as ShatterState);
      return {
        ...next,
        saucer: {
          id,
          x: finite("x", x),
          y: finite("y", y),
          vx: SAUCER_SPEED,
          vy: 0,
          mind: true,
          gun: true,
          travel: true,
          weave: 1,
          fireClock: SAUCER_FIRE_INTERVAL,
          weaveClock: SAUCER_WEAVE_INTERVAL,
          age: 0,
        },
      };
    },
    setSaucerVelocity: (state, vx, vy) =>
      ({
        ...state,
        saucer: requireSaucer(state, (s) => ({
          ...s,
          vx: finite("vx", vx),
          vy: finite("vy", vy),
        })),
      }) as ShatterState,
    setSaucerWeave: (state, direction) =>
      ({
        ...state,
        saucer: requireSaucer(state, (s) => ({
          ...s,
          weave: assertWeave(direction),
        })),
      }) as ShatterState,
    removeSaucer: (state) => ({ ...state, saucer: null }) as ShatterState,
    setSaucerMind: (state, enabled) =>
      ({
        ...state,
        saucer: requireSaucer(state, (s) => ({ ...s, mind: enabled })),
      }) as ShatterState,
    setSaucerGun: (state, enabled) =>
      ({
        ...state,
        saucer: requireSaucer(state, (s) => ({ ...s, gun: enabled })),
      }) as ShatterState,
    setSaucerTravel: (state, enabled) =>
      ({
        ...state,
        saucer: requireSaucer(state, (s) => ({ ...s, travel: enabled })),
      }) as ShatterState,
    setNextSaucerEdge: (state, edge) =>
      ({ ...state, nextSaucerEdge: assertSaucerEdge(edge) }) as ShatterState,
    setNextSaucerRow: (state, y) =>
      ({ ...state, nextSaucerRow: finite("nextSaucerRow", y) }) as ShatterState,
    setNextSaucerAim: (state, radians) =>
      ({
        ...state,
        nextSaucerAim: finite("nextSaucerAim", radians),
      }) as ShatterState,
    setNextRockSpeed: (state, speed) =>
      ({
        ...state,
        nextRockSpeed: finite("nextRockSpeed", speed),
      }) as ShatterState,
    setNextRecycleEdge: (state, edge) =>
      ({ ...state, nextRecycleEdge: assertEdge(edge) }) as ShatterState,
    setTorpedoCharge: (state, fraction) =>
      ({
        ...state,
        torpedoCharge: assertFraction("torpedoCharge", fraction),
      }) as ShatterState,
    addTorpedo: (state, x, y, heading) => {
      const angle = finite("heading", heading);
      const [id, next] = nextId(state as ShatterState);
      return {
        ...next,
        torpedoes: [
          ...next.torpedoes,
          {
            id,
            x: finite("x", x),
            y: finite("y", y),
            vx: Math.cos(angle) * TORPEDO_SPEED,
            vy: Math.sin(angle) * TORPEDO_SPEED,
            heading: angle,
            life: TORPEDO_LIFE,
            homing: true,
          },
        ],
      };
    },
    setTorpedoHeading: (state, id, radians) =>
      replaceTorpedo(state, id, (torpedo) => ({
        ...torpedo,
        heading: finite("heading", radians),
        vx: Math.cos(radians) * TORPEDO_SPEED,
        vy: Math.sin(radians) * TORPEDO_SPEED,
      })),
    setTorpedoHoming: (state, id, enabled) =>
      replaceTorpedo(state, id, (torpedo) => ({ ...torpedo, homing: enabled })),
    removeTorpedo: (state, id) =>
      ({
        ...state,
        torpedoes: removeById(state.torpedoes, id, "torpedo"),
      }) as ShatterState,
    clearTorpedoes: (state) => ({ ...state, torpedoes: [] }) as ShatterState,
  };
}

function requireSaucer(
  state: DeepReadonly<ShatterState>,
  edit: (saucer: SaucerState) => SaucerState,
): SaucerState {
  if (!state.saucer) throw new Error("Shatter debug: no saucer");
  return edit(state.saucer as SaucerState);
}

function registerDiagnostics(api: InitApi<ShatterState>): void {
  api.diagnostics.register("screen", (s) => s.screen);
  api.diagnostics.register("score", (s) => s.score);
  api.diagnostics.register("lives", (s) => s.lives);
  api.diagnostics.register("wave", (s) => s.wave);
  api.diagnostics.register(
    "ship",
    (s) => `${s.ship.x.toFixed(1)}, ${s.ship.y.toFixed(1)}`,
  );
  api.diagnostics.register(
    "ship velocity",
    (s) => `${s.ship.vx.toFixed(1)}, ${s.ship.vy.toFixed(1)}`,
  );
  api.diagnostics.register("ship speed", (s) =>
    Math.hypot(s.ship.vx, s.ship.vy),
  );
  api.diagnostics.register("ship angle", (s) => s.ship.angle);
  api.diagnostics.register("invuln", (s) => s.ship.invuln);
  api.diagnostics.register("bullets", (s) => s.bullets.length);
  api.diagnostics.register("rocks", (s) => s.rocks.length);
  api.diagnostics.register("saucer", (s) =>
    s.saucer ? `${s.saucer.x.toFixed(1)}, ${s.saucer.y.toFixed(1)}` : "none",
  );
  api.diagnostics.register("torpedo charge", (s) => s.torpedoCharge);
  api.diagnostics.register("torpedoes", (s) => s.torpedoes.length);
  api.diagnostics.register("sim", (s) => s.simTime);
}

export const game: Game<ShatterState, ShatterDebugApi> = {
  initialize(api: InitApi<ShatterState>): [ShatterState, ShatterDebugApi] {
    for (const action of ACTIONS) api.input.register(action, BINDINGS[action]);
    api.audio.define(CUES.fire, {
      wave: "square",
      freq: 720,
      freqTo: 360,
      durationMs: 60,
      gain: 0.12,
    });
    api.audio.define(CUES.shatter, {
      wave: "sawtooth",
      freq: 180,
      freqTo: 60,
      durationMs: 180,
      gain: 0.18,
    });
    api.audio.define(CUES.thrust, {
      wave: "sawtooth",
      freq: 90,
      durationMs: 100,
      gain: 0.08,
    });
    api.audio.define(CUES.saucer, {
      wave: "triangle",
      freq: 440,
      freqTo: 220,
      durationMs: 220,
      gain: 0.14,
    });
    api.audio.define(CUES.death, {
      wave: "square",
      freq: 130,
      freqTo: 30,
      durationMs: 260,
      gain: 0.18,
    });
    api.audio.define(CUES.extraLife, {
      wave: "sine",
      freq: 660,
      freqTo: 990,
      durationMs: 180,
      gain: 0.16,
    });
    registerDiagnostics(api);
    return [titleState(false), debugApi()];
  },

  update(
    state: DeepReadonly<ShatterState>,
    api: UpdateApi,
    dt: number,
  ): ShatterState {
    let next = updateMenus(
      { ...(state as ShatterState), muted: api.audio.muted() },
      api,
    );
    const cues = new Set<string>();
    const controls = {
      left: api.input.value("left") > 0,
      right: api.input.value("right") > 0,
      thrust: api.input.value("up") > 0,
      fireHeld: api.input.value("a") > 0,
      torpedoPressed: api.input.pressed("b"),
    };
    const steps = Math.min(
      12,
      Math.floor((next.tickClock + Math.max(0, dt)) / TICK_DT),
    );
    const tickClock = next.tickClock + Math.max(0, dt) - steps * TICK_DT;
    for (let i = 0; i < steps; i += 1) next = tick(next, controls, cues);
    next = { ...next, tickClock, muted: api.audio.muted() };
    if (cues.has(CUES.thrust) && !api.audio.looping(CUES.thrust))
      api.audio.loop(CUES.thrust);
    if (!cues.has(CUES.thrust)) api.audio.stop(CUES.thrust);
    for (const cue of cues) if (cue !== CUES.thrust) api.audio.play(cue);
    return next;
  },

  render(state: DeepReadonly<ShatterState>, api: RenderApi): void {
    draw(state, api.ctx);
  },
};

function draw(
  state: DeepReadonly<ShatterState>,
  ctx: CanvasRenderingContext2D,
): void {
  drawSpace(ctx);
  if (state.screen === "title" || state.screen === "howto")
    drawAmbientRocks(ctx);
  drawStar(ctx);
  if (state.screen !== "title" && state.screen !== "howto")
    drawWorld(state, ctx);
  if (state.screen === "playing") drawHud(state, ctx);
  if (state.waveBanner > 0 && state.screen === "playing")
    drawCentered(ctx, `WAVE ${state.wave}`, 62, FIELD_H / 2, "#f9f5d7");
  if (state.screen === "title") drawTitle(state, ctx);
  if (state.screen === "howto") drawHowto(ctx);
  if (state.screen === "paused")
    drawOverlayMenu(state, ctx, "PAUSED", PAUSE_ITEMS);
  if (state.screen === "gameover")
    drawOverlayMenu(state, ctx, `GAME OVER  SCORE ${state.score}`, [
      "PLAY AGAIN",
      "MENU",
    ]);
}

function drawSpace(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, FIELD_W, FIELD_H);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let i = 0; i < 90; i += 1) {
    const x = (i * 179) % FIELD_W;
    const y = (i * 97) % FIELD_H;
    ctx.fillRect(x, y, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
  }
}

function drawStar(ctx: CanvasRenderingContext2D): void {
  const halo = ctx.createRadialGradient(
    STAR_X,
    STAR_Y,
    CORE_R,
    STAR_X,
    STAR_Y,
    HALO_R * 1.5,
  );
  halo.addColorStop(0, "rgba(255,230,140,0.45)");
  halo.addColorStop(0.45, "rgba(93,178,255,0.20)");
  halo.addColorStop(1, "rgba(5,7,17,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(STAR_X, STAR_Y, HALO_R * 1.5, 0, TWO_PI);
  ctx.fill();
  const core = ctx.createRadialGradient(
    STAR_X - 8,
    STAR_Y - 8,
    2,
    STAR_X,
    STAR_Y,
    CORE_R,
  );
  core.addColorStop(0, "#fff8bf");
  core.addColorStop(0.55, "#f7a83b");
  core.addColorStop(1, "#713d95");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(STAR_X, STAR_Y, CORE_R, 0, TWO_PI);
  ctx.fill();
}

function drawWorld(
  state: DeepReadonly<ShatterState>,
  ctx: CanvasRenderingContext2D,
): void {
  for (const bullet of state.bullets)
    drawBullet(ctx, bullet, "#8ee8ff", BULLET_R);
  for (const bullet of state.enemyBullets)
    drawBullet(ctx, bullet, "#ff6b6b", SAUCER_BULLET_R);
  for (const torpedo of state.torpedoes) drawTorpedo(ctx, torpedo);
  for (const rock of state.rocks) drawRock(ctx, rock);
  if (state.saucer) drawSaucer(ctx, state.saucer);
  if (state.screen !== "gameover") drawShip(ctx, state.ship, true);
}

function drawWrapped(
  x: number,
  y: number,
  drawOne: (x: number, y: number) => void,
): void {
  for (const ox of [-FIELD_W, 0, FIELD_W])
    for (const oy of [-FIELD_H, 0, FIELD_H]) drawOne(x + ox, y + oy);
}

function drawBullet(
  ctx: CanvasRenderingContext2D,
  bullet: DeepReadonly<BulletState>,
  color: string,
  radius: number,
): void {
  drawWrapped(bullet.x, bullet.y, (x, y) => {
    ctx.strokeStyle = color.replace(")", ",0.35)").replace("rgb", "rgba");
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x - bullet.vx * TICK_DT * TRAIL_TICKS,
      y - bullet.vy * TICK_DT * TRAIL_TICKS,
    );
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TWO_PI);
    ctx.fill();
  });
}

function drawTorpedo(
  ctx: CanvasRenderingContext2D,
  torpedo: DeepReadonly<TorpedoState>,
): void {
  drawWrapped(torpedo.x, torpedo.y, (x, y) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(torpedo.heading);
    ctx.fillStyle = "#f7e66a";
    ctx.strokeStyle = "#fff7b0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-8, -5);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-8, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
}

function drawRock(
  ctx: CanvasRenderingContext2D,
  rock: DeepReadonly<RockState>,
): void {
  const r = ROCK_RADIUS[rock.size];
  const damage = 1 - rock.health / ROCK_HEALTH[rock.size];
  drawWrapped(rock.x, rock.y, (x, y) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rock.spin);
    ctx.fillStyle =
      rock.flash > 0
        ? "#ffffff"
        : `rgb(${110 + damage * 95}, ${123 - damage * 35}, ${135 - damage * 45})`;
    ctx.strokeStyle = "#d5e1ea";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const a = (i / 10) * TWO_PI;
      const rr = r * (0.78 + ((rock.id * 17 + i * 31) % 25) / 100);
      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
}

function drawShip(
  ctx: CanvasRenderingContext2D,
  ship: DeepReadonly<ShipState>,
  flame: boolean,
): void {
  if (ship.invuln > 0 && Math.floor(ship.invuln * 10) % 2 === 0)
    ctx.globalAlpha = 0.45;
  drawWrapped(ship.x, ship.y, (x, y) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ship.angle);
    if (flame && ship.thrusting) {
      ctx.fillStyle = "#ff9e4f";
      ctx.beginPath();
      ctx.moveTo(-16, 0);
      ctx.lineTo(-30, -7);
      ctx.lineTo(-25, 0);
      ctx.lineTo(-30, 7);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "#dff7ff";
    ctx.strokeStyle = "#50c8ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-14, -13);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-14, 13);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
  ctx.globalAlpha = 1;
}

function drawSaucer(
  ctx: CanvasRenderingContext2D,
  saucer: DeepReadonly<SaucerState>,
): void {
  drawWrapped(saucer.x, saucer.y, (x, y) => {
    ctx.fillStyle = "#c9ff7a";
    ctx.strokeStyle = "#f3ffd9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, 26, 9, 0, 0, TWO_PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#78b8ff";
    ctx.beginPath();
    ctx.ellipse(x, y - 5, 12, 8, 0, Math.PI, TWO_PI);
    ctx.fill();
  });
}

function drawHud(
  state: DeepReadonly<ShatterState>,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.fillStyle = "#eaf7ff";
  ctx.font = "700 30px system-ui, sans-serif";
  ctx.fillText(String(state.score).padStart(6, "0"), 28, 44);
  for (let i = 0; i < Math.max(0, state.lives - 1); i += 1)
    drawShip(
      ctx,
      { ...initialShip(), x: 42 + i * 28, y: 76, angle: FACE_UP },
      false,
    );
  ctx.strokeStyle = "#7df4c2";
  ctx.strokeRect(28, 104, 116, 10);
  ctx.fillStyle = state.torpedoCharge >= 1 ? "#f7e66a" : "#607080";
  ctx.fillRect(28, 104, 116 * state.torpedoCharge, 10);
}

function drawCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  size: number,
  y: number,
  color: string,
): void {
  ctx.fillStyle = color;
  ctx.font = `800 ${size}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(text, FIELD_W / 2, y);
  ctx.textAlign = "start";
}

function drawTitle(
  state: DeepReadonly<ShatterState>,
  ctx: CanvasRenderingContext2D,
): void {
  drawCentered(ctx, TITLE_TEXT, 96, 210, "#eaf7ff");
  drawCentered(ctx, TAGLINE_TEXT, 24, 254, "#7df4c2");
  drawMenu(state, ctx, TITLE_ITEMS);
}

function drawHowto(ctx: CanvasRenderingContext2D): void {
  drawCentered(ctx, "HOW TO PLAY", 48, 100, "#eaf7ff");
  const lines = [
    "Break every rock through its fragments to clear the wave.",
    "The star bends bullets and rocks, never the ship. Curve shots around it.",
    "Rocks swallowed by the core return from an edge with their armor scarred.",
    "The saucer hunts you. Shoot it down for points.",
    "Large rocks take several hits; damage shows as their armor breaks.",
    "F launches one homing torpedo every ten seconds and it destroys any rock outright.",
    "ARROWS or WASD fly, SPACE fires, F torpedoes, ENTER confirms, ESC/P pauses, M mutes.",
  ];
  ctx.fillStyle = "#dce8f2";
  ctx.font = "24px system-ui, sans-serif";
  lines.forEach((line, i) => ctx.fillText(line, 210, 180 + i * 48));
  drawCentered(ctx, "PRESS ENTER OR ESC", 22, 640, "#7df4c2");
}

function drawOverlayMenu(
  state: DeepReadonly<ShatterState>,
  ctx: CanvasRenderingContext2D,
  title: string,
  items: readonly string[],
): void {
  ctx.fillStyle = "rgba(2,4,10,0.62)";
  ctx.fillRect(0, 0, FIELD_W, FIELD_H);
  drawCentered(ctx, title, 46, 240, "#eaf7ff");
  drawMenu(state, ctx, items);
}

function drawMenu(
  state: DeepReadonly<ShatterState>,
  ctx: CanvasRenderingContext2D,
  items: readonly string[],
): void {
  ctx.font = "700 26px system-ui, sans-serif";
  ctx.textAlign = "center";
  items.forEach((item, i) => {
    const rect = menuRect(state, i);
    if (!rect) return;
    ctx.fillStyle =
      i === state.menuIndex
        ? "rgba(125,244,194,0.22)"
        : "rgba(255,255,255,0.06)";
    ctx.strokeStyle =
      i === state.menuIndex ? "#7df4c2" : "rgba(234,247,255,0.35)";
    ctx.lineWidth = 2;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillStyle = i === state.menuIndex ? "#ffffff" : "#b9c9d6";
    ctx.fillText(item, rect.x + rect.w / 2, rect.y + 33);
  });
  ctx.textAlign = "start";
}

function drawAmbientRocks(ctx: CanvasRenderingContext2D): void {
  ctx.globalAlpha = 0.28;
  for (let i = 0; i < 5; i += 1)
    drawRock(ctx, {
      id: i + 3,
      x: 120 + i * 250,
      y: 120 + ((i * 101) % 430),
      vx: 0,
      vy: 0,
      size: i % 2 === 0 ? "large" : "medium",
      spin: i,
      health: i % 2 === 0 ? 3 : 2,
      flash: 0,
    });
  ctx.globalAlpha = 1;
}
