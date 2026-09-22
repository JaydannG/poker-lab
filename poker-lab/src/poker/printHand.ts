import { HandState } from "./types";

export default function printHand(hand: HandState) {
    console.log("Current Hand State:\n")
    console.log("Community Cards: " + hand.communityCards.map(card => card.rank + card.suit));
    console.log("Active Player: " + hand.activePlayer);
    console.log("Pot: " + hand.pot);
    console.log("Street: " + hand.street);
    console.log("Current Bet: " + hand.currentBet);

    console.log("Actions:\n");
    hand.actions.forEach(action => {
        console.log("Player: " + action.player);
        console.log("Action Type: " + action.type);
        if (action.amount) {
            console.log("Amount: " + action.amount);
        }
        
        console.log("\n");
    });

    console.log("Players:\n");
    hand.players.forEach(player => {
        console.log("Position: " + player.position);
        console.log("Stack: " + player.stack);
        console.log("Hand: " + player.hand.map(card => card.rank + card.suit));
        console.log("Folded: " + player.folded);
        console.log("Committed This Street: " + player.committedThisStreet);
    });
}