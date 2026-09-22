import createHand from "./poker/engine/createHand";
import { applyAction, getNextActivePlayer } from "./poker/engine/applyAction";
import printHand from "./poker/printHand";

function main() {
    let hand = createHand();
    printHand(hand);
}

main();