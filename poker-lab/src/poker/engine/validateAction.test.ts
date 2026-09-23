import { validateAction } from "./validateAction";
import { describe, it, expect } from "vitest";
import createHand from "./createHand";
import { Position, ActionType } from "../types";

describe("validateAction", () => {
    it("Should not throw an error if a fold is valid", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        expect(() => validateAction(hand, action)).not.toThrow();
    });
    
    it("Should throw an error for an out of turn fold", () => {
        const hand = createHand();

        let action = {
            player: "MP" as Position,
            type: "fold" as ActionType
        }

        expect(() => validateAction(hand, action)).toThrow("INVALID ACTION: Out of turn fold");
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

        expect(() => validateAction(hand, action)).toThrow("INVALID ACTION: Player already folded");
    });

    it("Should throw an error for a player that is not at the table", () => {
        const hand = createHand();

        let action = {
            player: "NOT VALID POSITION" as Position,
            type: "fold" as ActionType
        }

        expect(() => validateAction(hand, action)).toThrow("INVALID ACTION: Player is not at table");
    });

    it("Should throw an error if the hand is already completed", () => {
        const hand = createHand();
        
        hand.players.forEach(player => {
            if (player.position != "BB") {
                player.folded = true;
            }
        });

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        expect(() => validateAction(hand, action)).toThrow("INVALID ACTION: Hand is completed");
    });

    it("Should throw an error if the action is not implemented", () => {
        const hand = createHand();
        
        let action = {
            player: "UTG" as Position,
            type: "NOT VALID ACTION" as ActionType
        }

        expect(() => validateAction(hand, action)).toThrow("INVALID ACTION: Action is not implemented");
    });

    it("Should leave original hand unchanged if action is invalid", () => {
        const hand = createHand();
        
        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        validateAction(hand, action);

        expect(hand).toEqual(
            {
                activePlayer: "UTG",
                players: [
                    {
                        position: "SB",
                        committedThisStreet: 0.5,
                        folded: false,
                        stack: 99.5,
                        hand: []
                    },
                    {
                        position: "BB",
                        committedThisStreet: 1,
                        folded: false,
                        stack: 99,
                        hand: []
                    },
                    {
                        position: "UTG",
                        committedThisStreet: 0,
                        folded: false,
                        stack: 100,
                        hand: []
                    },
                    {
                        position: "MP",
                        committedThisStreet: 0,
                        folded: false,
                        stack: 100,
                        hand: []
                    },
                    {
                        position: "CO",
                        committedThisStreet: 0,
                        folded: false,
                        stack: 100,
                        hand: []
                    },
                    {
                        position: "BTN",
                        committedThisStreet: 0,
                        folded: false,
                        stack: 100,
                        hand: []
                    },
                ],
                street: "preflop",
                actions: [],
                currentBet: 1,
                pot: 1.5,
                communityCards: []
            }
        );
    });
});