"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cards = void 0;
const colors = Object.freeze(["red", "blue", "black", "yellow"]);
const nums = Object.freeze([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
]);
const jokerNum = 0;
function makeCard(color, num) {
    return Object.freeze({
        color,
        num,
    });
}
exports.cards = Object.freeze([
    ...colors.flatMap((color) => nums.flatMap((num) => {
        return [makeCard(color, num), makeCard(color, num)];
    })),
    makeCard("red", jokerNum),
    makeCard("black", jokerNum),
]);
