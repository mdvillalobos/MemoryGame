import type { Difficulty } from "../types/game.types";

export const GAME_ICONS = [ "🎲","🎯","🎮","🎧","🎵","🎬","🏀","🚗","🐶", "🐱","🌸","🌍","🚀","⚡","🍕","🍩","🎁","🕹️" ];

export const MAX_FLIPPED_CARDS = 2;

export const LEVEL_OF_DIFFICULTIES: Record<Difficulty,  number> = { 
    easy: 2,   //2x2
    medium: 4, //4x4
    hard: 6    //6x6
}
