/**
 * Shared product-window geometry. Scenes hand the SAME window from one
 * to the next (Home → Create Goal → checkbox), so the product feels
 * continuous rather than cut together.
 */
import {Box} from '../lib/anim';

/** The hero product window: Lumo UI floating on black. */
export const PRODUCT: Box = {x: 1060, y: 90, w: 600, h: 900};
/**
 * Home, full width, framed from "Today's habit" down (the stats card at
 * the top of Home is deliberately never shown). 600 px wide shows the
 * whole 1320 px source; 782 px tall shows its lower 59 %.
 */
export const HOME_WINDOW: Box = {x: 1060, y: 150, w: 600, h: 782};
export const PRODUCT_WIDE: Box = {x: 1000, y: 60, w: 720, h: 960};
export const RADIUS = 56;

/** A hairline that defines the UI edge on pure black (the UI is #101012). */
export const HAIRLINE = '0 0 0 1px rgba(245,245,247,0.09)';

/** The checkbox in scene 04 — the Create Goal window collapses into it. */
export const CHECKBOX: Box = {x: 960 - 36, y: 470 - 36, w: 72, h: 72};
