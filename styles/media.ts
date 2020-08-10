export const size = {
    small: 0,
    standard: 640,
    wide: 1280
};

export const media = {
    small: `@media (min-width: 0px)`,
    standard: `@media (min-width: ${size.standard}px)`,
    wide: `@media (min-width: ${size.wide}px)`
};
