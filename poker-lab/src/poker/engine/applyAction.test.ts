import { getNextActivePlayer } from "./applyAction";
import { describe, it, expect } from "vitest";
import createHand from "./createHand";
import { Position } from "../types";
import { get } from "http";

describe("applyAction", () => {
    it("Should follow normal turn progression", () => {
        const hand = createHand();
        const nextActivePlayer = getNextActivePlayer(hand);
        expect(nextActivePlayer).toBe("MP");
    });

    it("Should follow normal turn progression with 1 folded player", () => {
        const hand = createHand();
        const mp = hand.players.find(player => player.position === "MP");

        if (mp) {
            mp.folded = true;
        }

        const nextPlayer = getNextActivePlayer(hand);

        expect(nextPlayer).toBe("CO");
    });

    it("Should follow normal turn progression with mutlitple folded players", () => {
        const hand = createHand();
        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        const nextPlayer = getNextActivePlayer(hand);

        expect(nextPlayer).toBe("BTN");
    });

    it("Should wrap around the table", () => {
        const hand = createHand();
        hand.activePlayer = "BTN";

        const nextPlayer = getNextActivePlayer(hand);

        expect(nextPlayer).toBe("SB");
    });

    it("Should wrap around the table and skip folded players", () => {
        const hand = createHand();
        hand.activePlayer = "BTN";

        const sb = hand.players.find(player => player.position === "SB");
        const bb = hand.players.find(player => player.position === "BB");

        if (sb) {
            sb.folded = true;
        }

        if (bb) {
            bb.folded = true;
        }

        const nextPlayer = getNextActivePlayer(hand);

        expect(nextPlayer).toBe("UTG");
    });

    it("Should follow normal turn progression with 2 players left", () => {
        const hand = createHand();

        const mp = hand.players.find(player => player.position === "MP");
        const co = hand.players.find(player => player.position === "CO");
        const sb = hand.players.find(player => player.position === "SB");
        const bb = hand.players.find(player => player.position === "BB");

        if (sb) {
            sb.folded = true;
        }

        if (bb) {
            bb.folded = true;
        }

        if (mp) {
            mp.folded = true;
        }

        if (co) {
            co.folded = true;
        }

        const nextActivePlayer = getNextActivePlayer(hand);
        expect(nextActivePlayer).toBe("BTN");
    });

    it("Should throw an error for an invalid active player", () => {
        const hand = createHand();
        hand.activePlayer = "INVALID" as Position;
        expect(() => getNextActivePlayer(hand)).toThrow();
    });

    it("Should throw an error if there are no players left in the hand", () => {
        const hand = createHand();
        hand.players.forEach(player => {
            player.folded = true;
        });

        expect(() => getNextActivePlayer(hand)).toThrow();
    });
});