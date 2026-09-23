import { HandState, Position } from "../types";

export function isHandOver(hand: HandState): boolean {
    let numActivePlayers = hand.players.filter(player => !player.folded).length;

    if (numActivePlayers < 1) {
        throw new Error("No players in the hand");
    }

    if (numActivePlayers === 1) {
        return true;
    }

    return false;
}

export function getWinner(hand: HandState): Position | null {
    if (isHandOver(hand)) {
        const winner = hand.players.find(player => !player.folded);
        return winner ? winner.position : null;
    }

    return null;
}