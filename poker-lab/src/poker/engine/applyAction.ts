import { HandState, Action, Position } from "../types";

export function applyAction(hand: HandState, action: Action): HandState {
    let updatedHand = hand;

    if (action.type === "fold") {
        const updatedPlayers = updatedHand.players.map(player => {
            if (player.position === action.player) {
                return { ...player, folded: true};
            }

            return player;
        });

        updatedHand = { ...updatedHand, players: updatedPlayers };
    }

    updatedHand = { ...updatedHand, actions: [...hand.actions, action] };

    if (isHandOver(updatedHand)) {
        const winner = getWinner(updatedHand);

        if (winner) {
            console.log("Hand is over! Winner: " + winner);
        } 

        updatedHand = { ...updatedHand, winner: winner || undefined }; 

        return updatedHand;
    } 

    const nextActivePlayer = getNextActivePlayer(updatedHand);

    updatedHand = {...updatedHand, activePlayer: nextActivePlayer };

    return updatedHand;
}

export function getNextActivePlayer(hand: HandState): Position {
    const currentIndex = hand.players.findIndex(player => player.position === hand.activePlayer);

    if (currentIndex === -1) {
        throw new Error("Active player not found in hand");
    }

    const nextIndex = (currentIndex + 1) % hand.players.length;

    for (let i = 0; i < hand.players.length; i++) {
        const player = hand.players[(nextIndex + i) % hand.players.length];
        if (!player.folded) {
            return player.position;
        }
    }

    throw new Error("No active players found");
}

function isHandOver(hand: HandState): boolean {
    let numActivePlayers = hand.players.filter(player => !player.folded).length;
    if (numActivePlayers === 1) {
        return true;
    }

    return false;
}

function getWinner(hand: HandState): Position | null {
    if (isHandOver(hand)) {
        const winner = hand.players.find(player => !player.folded);
        return winner ? winner.position : null;
    }

    return null;
}