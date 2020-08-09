export const size = {
    small: 768,
    standard: 992,
    wide: 1200
};

export const media = {
    small: `@media (max-width: ${size.small}px)`,
    standard: `@media (max-width: ${size.standard}px)`,
    wide: `@media (min-width: ${size.wide}px)`
};
