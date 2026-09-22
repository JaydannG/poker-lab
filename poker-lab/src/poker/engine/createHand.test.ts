import { getNextActivePlayer } from "./applyAction";
import { describe, it, expect } from "vitest";
import createHand from "./createHand";

describe("createHand", () => {
    it("Should create a new hand with 6 players", () => {
        const hand = createHand();
        expect(hand.players.length === 6);
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

    it("Should advance action to the next active player", () => {
        const hand = createHand();
        const nextActivePlayer = getNextActivePlayer(hand);
        expect(nextActivePlayer === "SB");
    });
});