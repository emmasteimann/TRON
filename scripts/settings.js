var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// =============
// GRID SETTINGS
// =============
var VERTICES_PER_ROW = 30,
    GRID_OFFSET_X = 250,
    GRID_OFFSET_Y = 50;
    VERTEX_MARGIN = (g_canvas.width - (2 * GRID_OFFSET_X)) /
    				(VERTICES_PER_ROW - 1),
    // PHYS_ACC denotes accuracy of physics simulation.
    // lower for better performance
    PHYS_ACC = 8;

// ==============
// SCORE SETTINGS
// ==============
var LOSE_PENALTY = 10,
	SCORE_INC = 5,
	SCORE_POSY = GRID_OFFSET_Y - 10;

// ==============
// HALO SETTINGS
// ==============

var HALO_ALPHA = 0.2;

//==============
// WALL LENGTH
//=============

var WALL_INC = 5;

// ==============
// INTRO SEQUENCE
// ==============
var INTRO_SEQUENCE = [{x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 1, y: 0},
					  {x: 1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: 0, y: 1},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: 0, y: -1},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: -1, y: 0},
					  {x: 0, y: -1},
					  {x: 1, y: 0},];