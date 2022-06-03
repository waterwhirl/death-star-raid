/**
 * @typedef Player
 * @property {Number} x Position in the X axis where the player will be created
 * @property {Number} y Position in the Y axis where the player will be created
 * @property {Number} height Height of the player
 * @property {Number} width Width of the player
 * @property {string} image Asset of the player
 * @property {Number} gravity Gravity 
 * @property {Number} velocity Velocity of the movement of the player
 * @property {Number} score 
 * @property {function} draw
 * @property {function} update
 * @property {function} reset
 */

import floor from "./floor.js";

import GAME_SETTINGS from "../constants/gameSettings.js";
import { Utility } from "../utils/index.js";

const baseHeight = 150;
const baseWidth = 150;
/** @type Utility */
let utility = null;

/** @type Player */
export default {
    x: GAME_SETTINGS.BASE_WIDTH / 2,
    y: floor.y - baseHeight,
    height: baseHeight,
    width: baseWidth,
    image: 'assets/TieFighter/0003 - Neutro.png',
    gravity: 1.6,
    velocity: 0,
    score: 0,
    /**
     * @param {CanvasRenderingContext2D} newContext 
     */
    init: function(newContext) {
        utility = new Utility(newContext);
    },
    draw: function() {
        utility.drawImage(this.image, this.x - this.width / 2, this.y, this.width, this.height, false);
    },
    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > (floor.y - this.height)) {
            this.y = floor.y - this.height;
        }
    },
    reset: function() {
        this.velocity = 0;
        this.y = 0;

        if (this.score > GAME_SETTINGS.RECORD) {
            localStorage.setItem("record", this.score);
            GAME_SETTINGS.RECORD = this.score;
        }

        this.score = 0;
    },
};