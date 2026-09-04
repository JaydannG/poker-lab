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

export type PlayerState = {
    position: Position;
    stack: number;
    folded: boolean;
    hand: Card[];
    committedThisStreet: number;
};

export type HandState = {
    players: PlayerState[];
    activePlayer: Position;
    street: Street;
    actions: PokerAction[];
    currentBet: number;
    pot: number;
};