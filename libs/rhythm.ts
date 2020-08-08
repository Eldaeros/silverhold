import { scales, ModularScale, ScaleKey } from './modularScale';
import styled, { css } from 'styled-components';

const defaults: RhythmOptions = {
    baseFontSize: 1,
    baseLineHeight: 1.5,
    baseFontScale: 'minorThird'
};

export interface RhythmOptions {
    baseFontSize?: number;
    baseLineHeight?: number;
    baseFontScale?: ScaleKey;
}

export class Rhythm {
    baseFontSize: number;
    baseLineHeight: number;
    baseFontScale: ScaleKey;
    rhythmUnit: number;

    constructor(options?: RhythmOptions) {
        this.baseFontSize = options?.baseFontSize || defaults.baseFontSize;
        this.baseLineHeight =
            options?.baseLineHeight || defaults.baseLineHeight;
        this.baseFontScale = options?.baseFontScale || defaults.baseFontScale;
        this.rhythmUnit = this.baseFontSize * this.baseLineHeight;
    }

    getBaseFontSize = () => {
        return this.baseFontSize;
    };

    getRhythmUnit = (scaleMultiplier: number = 1) => {
        return this.rhythmUnit * scaleMultiplier;
    };

    fontSizeNumber = (scaleIndex: number) => {
        let fontSize = this.baseFontSize;
        if (scaleIndex > 0) {
            fontSize =
                this.baseFontSize *
                Math.pow(scales[this.baseFontScale], scaleIndex);
        } else if (scaleIndex < 0) {
            fontSize =
                this.baseFontSize /
                (Math.abs(scaleIndex) * scales[this.baseFontScale]);
        }
        return fontSize;
    };

    getLineHeight = (scaleIndex: number = 0) => {
        const fontSize = this.fontSizeNumber(scaleIndex);
        const calculateLineHeight = (rhythmHeight: number) => {
            return (this.rhythmUnit * rhythmHeight) / fontSize;
        };

        let targetRhythmHeight = Math.ceil(fontSize / this.rhythmUnit);
        let lineHeight = calculateLineHeight(targetRhythmHeight);

        // Iterate until we get a suitable line-height
        while (lineHeight < 1.2) {
            targetRhythmHeight += 1;
            lineHeight = calculateLineHeight(targetRhythmHeight);
        }

        return lineHeight;
    };

    // Style (CSS) functions

    getStyleFontSize = (scaleIndex: number = 0) => {
        return css`
            font-size: ${this.fontSizeNumber(scaleIndex)}rem;
        `;
    };

    getStyleLineHeight = (scaleIndex: number = 0) => {
        let lineHeight = this.getLineHeight(scaleIndex);
        return css`
            line-height: ${lineHeight}em;
        `;
    };
}

export class RhythmTypography {
    rhythm: Rhythm = new Rhythm();
    constructor(options?: RhythmOptions) {
        this.rhythm = new Rhythm(options);
    }

    verticalRhythm = (options: { fontScale: number; height?: number }) => {
        return css`
            ${this.rhythm.getStyleFontSize(options.fontScale)};
            ${this.rhythm.getStyleLineHeight(
                options.height || options.fontScale
            )};
            margin: ${this.rhythmHeight(1)} 0;
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

export const getBaseFontSize = () => {
    const parentElement = window.document.body;
    var div = document.createElement('div');
    div.style.width = '1000em';
    parentElement.appendChild(div);
    var pixels = div.offsetWidth / 1000;
    parentElement.removeChild(div);
    return pixels;
};
