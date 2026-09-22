import { getNextActivePlayer } from "./applyAction";
import { describe, it, expect } from "vitest";
import createHand from "./createHand";

describe("createHand", () => {
    it("Should create a new hand with 6 players", () => {
        const hand = createHand();
        expect(hand.players.length).toBe(6);
    });

    it("Should initialize the correct positions", () => {
        const hand = createHand();
        const positions = hand.players.map(player => player.position);
        expect(positions).toEqual([
            "SB",
            "BB",
            "UTG",
            "MP",
            "CO",
            "BTN"
        ]);
    });

    it("Should initialize the correct stack sizes (including posted blinds)", () => {
        const hand = createHand();
        const stacks = hand.players.map(player => player.stack);
        expect(stacks).toEqual([
            99.5,
            99,
            100,
            100,
            100,
            100
        ]);
    });

    it("Should initialize the pot correctly (including posted blinds)", () => {
        const hand = createHand();
        expect(hand.pot).toBe(1.5);
    });

    it("Should initalize all players as unfolded", () => {
        const hand = createHand();
        const folded = hand.players.map(player => player.folded);
        expect(folded).toEqual([
            false,
            false,
            false,
            false,
            false,
            false
        ])
    });

    it("Should initialize an empty action history", () => {
        const hand = createHand();
        expect(hand.actions).toEqual([]);
    });

    it("Should advance action to the next active player", () => {
        const hand = createHand();
        const nextActivePlayer = getNextActivePlayer(hand);
        expect(nextActivePlayer).toBe("MP");
    });
});