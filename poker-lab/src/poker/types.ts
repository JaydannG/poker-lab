export type Position = "SB" | "BB" | "UTG" | "MP" | "CO" | "BTN";

export type ActionType = "fold" | "check" | "call" | "bet" | "raise";

type Street = "preflop" | "flop" | "turn" | "river";

type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "T" | "J" | "Q" | "K" | "A";
type Suit = "h" | "d" | "c" | "s";
type Card = {
    rank: Rank;
    suit: Suit;
};

export type Action = {
    player: Position;
    type: ActionType;
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
    communityCards: Card[];
    actions: Action[];
    currentBet: number;
    pot: number;
    winner?: Position;
};