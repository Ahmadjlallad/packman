"use strict";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// innerWidth is coming form window element innerWidth
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export { canvas, context };
