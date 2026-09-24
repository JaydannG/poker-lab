import { HandState, Action } from "../types";
import { isHandOver } from "./handResults";

export function validateAction(hand: HandState, action: Action) {
    if (isHandOver(hand) && action.type === "fold") {
        throw new Error("INVALID ACTION: Cannot fold if hand is completed");
    }

    if (isHandOver(hand) && action.type === "check") {
        throw new Error("INVALID ACTION: Cannot check if hand is completed");
    }

    if (hand.players.find(player => player.position === action.player) === undefined) {
        throw new Error("INVALID ACTION: Player is not at table");
    }

    hand.players.find(player => {
        if (player.position === action.player && player.folded) {
            throw new Error("INVALID ACTION: Player already folded")
        }
    });

    if (hand.activePlayer !== action.player && action.type === "fold") {
        throw new Error("INVALID ACTION: Out of turn fold")
    }

    if (hand.activePlayer !== action.player && action.type === "check") {
        throw new Error("INVALID ACTION: Out of turn check")
    }

    const validActions = ["bet", "check", "fold", "call"];
    if (validActions.find(type => type === action.type) === undefined) {
        throw new Error("INVALID ACTION: Action is not implemented");
    }

    if (action.type === "check" && hand.currentBet != 0) {
        throw new Error("INVALID ACTION: Cannot check if there is a bet");
    }
}