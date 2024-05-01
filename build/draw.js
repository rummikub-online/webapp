"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCard = exports.shuffledCards = void 0;
const cards_js_1 = require("./cards.js");
const toShuffled = (arr) => {
    const arrCopy = [...arr];
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
    return arrCopy;
};
const shuffledCards = () => toShuffled(toShuffled(toShuffled(cards_js_1.cards)));
exports.shuffledCards = shuffledCards;
const drawCard = (oldCards) => {
    const [drawn, ...cards] = oldCards;
    return Object.freeze({
        drawn,
        cards: Object.freeze(cards),
    });
};
exports.drawCard = drawCard;
