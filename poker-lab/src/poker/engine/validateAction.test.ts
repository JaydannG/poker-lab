import { validateAction } from "./validateAction";
import { describe, it, expect } from "vitest";
import { applyAction } from "./applyAction";
import createHand from "./createHand";
import { Position, ActionType } from "../types";

describe("validateAction", () => {
    it("Should not throw an error if a fold is valid", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        expect(applyAction(hand, action)).not.toThrow();
    });
    
    it("Should throw an error for an out of turn fold", () => {
        const hand = createHand();

        let action = {
            player: "MP" as Position,
            type: "fold" as ActionType
        }

        expect(applyAction(hand, action)).toThrow("INVALID ACTION: Out of turn fold");
    });

    it("Should throw an error for a player that is already folded", () => {
        const hand = createHand();

        hand.players.map(player => {
            if (player.position === "UTG") {
                player.folded = true;
            }
        })

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        expect(applyAction(hand, action)).toThrow("INVALID ACTION: Player already folded");
    });

    it("Should throw an error for a player that is not at the table", () => {
        const hand = createHand();

        let action = {
            player: "NOT VALID POSITION" as Position,
            type: "fold" as ActionType
        }

        expect(applyAction(hand, action)).toThrow("INVALID ACTION: Player is not at table");
    });

    it("Should throw an error if the hand is already completed", () => {
        const hand = createHand();
        
        hand.players.forEach(player => player.folded = true);

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        expect(applyAction(hand, action)).toThrow("INVALID ACTION: Hand is completed");
    });

    it("Should throw an error if the action is not implemented", () => {
        const hand = createHand();
        
        let action = {
            player: "UTG" as Position,
            type: "bet" as ActionType
        }

        expect(applyAction(hand, action)).toThrow("INVALID ACTION: Action is not implemented");
    });

});