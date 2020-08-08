import { Rhythm, RhythmOptions } from '../libs/rhythm';
import styled, { css } from 'styled-components';

export class Typography {
    rhythm: Rhythm = new Rhythm();
    constructor(options?: RhythmOptions) {
        this.rhythm = new Rhythm(options);
    }

    rhythmCss = (scale: number) => {
        return css`
            ${this.rhythm.getFontSizeStyle(scale)};
            ${this.rhythm.getLineHeightStyle(scale)};
            margin-bottom: 0;
            margin-top: 0;
        `;
    };

    rhythmHeight = (scale: number) => {
        const calc = `calc(${this.rhythm.getRhythmUnit(
            scale
        )} * ${this.rhythm.getBaseFontSize()}rem)`;
        return css`
            ${calc}
        `;
    };

    rhythmHeightValue = (scale: number): number => {
        return this.rhythm.getRhythmUnit(scale) * this.rhythm.getBaseFontSize();
    };
}
