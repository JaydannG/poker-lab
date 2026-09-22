import { HandState, Action, Position } from "../types";

export function applyAction(hand: HandState, action: Action): HandState {
    if (action.type === "fold") {
        const updatedPlayers = hand.players.map(player => {
            if (player.position === action.player) {
                return { ...player, folded: true};
            }

            return player;
        })

        return { ...hand, players: updatedPlayers, actions: [...hand.actions, action], activePlayer: getNextActivePlayer(hand) };
    }

    return hand;
}

export function getNextActivePlayer(hand: HandState): Position {
    const currPosition = hand.activePlayer;

    return "SB";
}