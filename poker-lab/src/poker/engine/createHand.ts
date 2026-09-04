import type { HandState } from "../types";

export default function createHand(): HandState {
    return {
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
        pot: 1.5
    };
}