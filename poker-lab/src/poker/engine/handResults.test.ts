import { getNextActivePlayer, applyAction } from "./applyAction";
import createHand from "./createHand";
import { Action, Position, ActionType } from "../types";
import { describe, it, expect } from "vitest";
import { isHandOver, getWinner } from "./handResults";

describe("isHandOver", () => {
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

        hand.players.forEach(player => player.folded = true);

        expect(() => isHandOver(hand)).toThrow("No players in the hand");
    });
});

describe("getWinner", () => {
    it("Should return null for 6 players remaining", () => {
        const hand = createHand();

        expect(getWinner(hand)).toEqual(null);
    });

    it("Should return null for 2 players remaining", () => {
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

        expect(getWinner(hand)).toEqual(null);
    });

    it("Should return UTG if only UTG remains", () => {
        const hand = createHand();

        hand.players.map(player => {
            if (player.position != "UTG") {
                player.folded = true;
            }
        });

        expect(getWinner(hand)).toEqual("UTG");
    });

    it("Should return BTN if only BTN remains", () => {
        const hand = createHand();

        hand.players.map(player => {
            if (player.position != "BTN") {
                player.folded = true;
            }
        });

        expect(getWinner(hand)).toEqual("BTN");
    });

    it("Should return BB if only BB remains", () => {
        const hand = createHand();

        hand.players.map(player => {
            if (player.position != "BB") {
                player.folded = true;
            }
        });

        expect(getWinner(hand)).toEqual("BB");
    });
});