type Position = "SB" | "BB" | "UTG" | "MP" | "CO" | "BTN";

type ActionType = "fold" | "check" | "call" | "bet" | "raise";

type Street = "preflop" | "flop" | "turn" | "river";

type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";
type Suit = "h" | "d" | "c" | "s";
type Card = {
    rank: Rank;
    suit: Suit;
};

type PokerAction = {
    player: Position;
    action: ActionType;
    amount?: number;
};

type PlayerState = {
    committedThisStreet: number;
    position: Position;
    folded: boolean;
    stack: number;
    hand: Card[];
};

type HandState = {
    activePlayer: Position;
    players: PlayerState[];
    actions: PokerAction[];
    currentBet: number;
    street: Street;
    pot: number;
};