import { Position, ActionType, Action } from "../types";
import { describe, it, expect } from "vitest";
import { applyAction } from "./applyAction";
import createHand from "./createHand";

describe("applyAction", () => {
    it("Should fold the correct player", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);
        const utg = updatedHand.players.find(player => player.position === "UTG");

        expect(utg?.folded).toBe(true);
    });

    it("Should not fold other players", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);
        const folded = updatedHand.players.map(player => player.folded);

        expect(folded).toEqual([
            false,
            false,
            true,
            false,
            false,
            false
        ]);
    });

    it("Should record the fold action", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);
        const foldedAction = updatedHand.actions.at(0);

        expect(foldedAction).toEqual({ player: "UTG", type: "fold" });
    });

    it("Should advance to the next player after folding", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);
        const nextActivePlayer = updatedHand.activePlayer;

        expect(nextActivePlayer).toBe("MP");
    });

    it("Should skip previously folded players", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const mp = hand.players.find(player => player.position === "MP");

        if (mp) {
            mp.folded = true;
        }

        const updatedHand = applyAction(hand, action);
        const nextActivePlayer = updatedHand.activePlayer;

        expect(nextActivePlayer).toBe("CO");
    });

    it("Should preserve the original hand", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);

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

    it("Should preserve action order", () => {
        const hand = createHand();

        let UTGAction = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        let MPAction = {
            player: "MP" as Position,
            type: "fold" as ActionType
        }

        let updatedHand = applyAction(hand, UTGAction);
        updatedHand = applyAction(updatedHand, MPAction);

        const actions = updatedHand.actions;

        expect(actions).toEqual([
            {
                player: "UTG" as Position,
                type: "fold" as ActionType
            },
            {
                player: "MP" as Position,
                type: "fold" as ActionType
            }
        ]);
    });

    it("Should end the hand after the final fold", () => {
        const hand = createHand();

        const co = hand.players.find(player => player.position === "CO");
        const btn = hand.players.find(player => player.position === "BTN");
        const sb = hand.players.find(player => player.position === "SB");
        const bb = hand.players.find(player => player.position === "BB");

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

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);

        expect(updatedHand.winner).toEqual("MP");
    });

    it("Should set activePlayer to null after hand has ended", () => {
        const hand = createHand();

        const co = hand.players.find(player => player.position === "CO");
        const btn = hand.players.find(player => player.position === "BTN");
        const sb = hand.players.find(player => player.position === "SB");
        const bb = hand.players.find(player => player.position === "BB");

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

        let action = {
            player: "UTG" as Position,
            type: "fold" as ActionType
        }

        const updatedHand = applyAction(hand, action);

        expect(updatedHand.activePlayer).toEqual(null);
    });

    it("Should not change the size of the pot if the player checks", () => {
        const hand = createHand();

        let action : Action = {
            player: "UTG", 
            type: "check"
        }

        hand.currentBet = 0;

        const updatedHand = applyAction(hand, action);

        expect(hand.pot).toEqual(1.5);
    });

    it("Should not change the size of the players stack if the player checks", () => {
        const hand = createHand();

        let action : Action = {
            player: "UTG", 
            type: "check"
        }

        hand.currentBet = 0;

        const updatedHand = applyAction(hand, action);
        const utg = hand.players.find(player => player.position === "UTG");

        expect(utg?.stack).toEqual(100);
    });

    it("Should record the check action", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "check" as ActionType
        }

        hand.currentBet = 0;

        const updatedHand = applyAction(hand, action);
        const checkAction = updatedHand.actions.at(0);

        expect(checkAction).toEqual({ player: "UTG", type: "check" });
    });

    it("Should advance to the next player after checking", () => {
        const hand = createHand();

        let action = {
            player: "UTG" as Position,
            type: "check" as ActionType
        }

        hand.currentBet = 0;

        const updatedHand = applyAction(hand, action);

        expect(hand.activePlayer).toEqual("MP");
    });
});