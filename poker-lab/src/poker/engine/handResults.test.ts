import { getNextActivePlayer, applyAction } from "./applyAction";
import createHand from "./createHand";
import { Action, Position, ActionType } from "../types";
import { describe, it, expect } from "vitest";
import { isHandOver } from "./handResults";

describe("handResults", () => {
    it("Should not end hand if all 6 players remain", () => {
        const hand = createHand();

        expect(isHandOver(hand)).toBe(false);
    });

    it("Should not end hand if 3 players remain", () => {
        const hand = createHand();

        const utg = hand.players.find(player => player.position === "UTG");
        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");

        if (utg) {
            utg.folded = true;
        }

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        expect(isHandOver(hand)).toBe(false);
    });

    it("Should not end hand if 2 players remain", () => {
        const hand = createHand();

        const utg = hand.players.find(player => player.position === "UTG");
        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");
        const btn = hand.players.find(player => player.position === "BTN");

        if (utg) {
            utg.folded = true;
        }

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        if (btn) {
            btn.folded = true;
        }

        expect(isHandOver(hand)).toBe(false);
    });

    it("Should end hand if only UTG remains", () => {
        const hand = createHand();

        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");
        const btn = hand.players.find(player => player.position === "BTN");
        const sb = hand.players.find(player => player.position === "SB");
        const bb = hand.players.find(player => player.position === "BB");

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        if (btn) {
            btn.folded = true;
        }

        if (sb) {
            sb.folded = true;
        }

        if (bb) {
            bb.folded = true;
        }

        expect(isHandOver(hand)).toBe(true);
    });
    
    it("Should end hand if only BB remains", () => {
        const hand = createHand();

        const utg = hand.players.find(player => player.position === "UTG");
        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");
        const btn = hand.players.find(player => player.position === "BTN");
        const sb = hand.players.find(player => player.position === "SB");

        if (utg) {
            utg.folded = true;
        }

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        if (btn) {
            btn.folded = true;
        }

        if (sb) {
            sb.folded = true;
        }

        expect(isHandOver(hand)).toBe(true);
    });

    it("Should error if no players remain", () => {
        const hand = createHand();

        const utg = hand.players.find(player => player.position === "UTG");
        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");
        const btn = hand.players.find(player => player.position === "BTN");
        const sb = hand.players.find(player => player.position === "SB");
        const bb = hand.players.find(player => player.position === "BB");

        if (utg) {
            utg.folded = true;
        }

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        if (btn) {
            btn.folded = true;
        }

        if (sb) {
            sb.folded = true;
        }

        if (bb) {
            bb.folded = true;
        }

        expect(() => isHandOver(hand)).toThrow("No players in the hand");
    });
});