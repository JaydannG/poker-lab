import { HandState, Action } from "../types";
import { isHandOver } from "./handResults";

export function validateAction(hand: HandState, action: Action) {
    if (isHandOver(hand)) {
        throw new Error("INVALID ACTION: Hand is completed");
    }

    if (hand.players.find(player => player.position === action.player) === undefined) {
        throw new Error("INVALID ACTION: Player is not at table");
    }

    hand.players.find(player => {
        if (player.position === action.player && player.folded) {
            throw new Error("INVALID ACTION: Player already folded")
        }
    });

    if (hand.activePlayer !== action.player) {
        throw new Error("INVALID ACTION: Out of turn fold")
    }

    const validActions = ["bet", "check", "fold", "call"];
    if (validActions.find(type => type === action.type) === undefined) {
        throw new Error("INVALID ACTION: Action is not implemented");
    }
}