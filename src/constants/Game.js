export const VERTICAL_CELLS_COUNT = 15;
export const HORIZONTAL_CELLS_COUNT = 12;

export const HORIZONTAL_MAX_INDEX = HORIZONTAL_CELLS_COUNT - 1;
export const VERTICAL_MAX_INDEX = VERTICAL_CELLS_COUNT - 1;

export const HORIZONTAL_MIDDLE_INDEX = Math.ceil(HORIZONTAL_MAX_INDEX / 2);

export const CELL_HEIGHT_PX = 20;
export const CELL_WIDTH_PX = 20;

export const KEY_REPEAT_TIME = 100;

export const STEP_TIME = 1500;
export const GAME_TIME = 500;

export const DIRECTION = {
    DOWN: 'DOWN',
    UP: 'UP',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    AROUND_ITS_AXIS: 'AROUND_ITS_AXIS',
    TO_BOTTOM: 'TO_BOTTOM'
};

export const GAME_STATUSES = {
    GAME_IS_TURNED_OFF: 'GAME_IS_TURNED_OFF',
    GAME_IS_ON: 'GAME_IS_ON',
    GAME_IS_ON_PAUSE: 'GAME_IS_ON_PAUSE',
    GAME_IS_OVER: 'GAME_IS_OVER'
};
