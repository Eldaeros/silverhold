import { scales, ModularScale, ScaleKey } from './modularScale';
import styled, { css } from 'styled-components';

const defaults: RhythmOptions = {
    baseFontSize: 1,
    baseLineHeight: 2,
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

    getRhythmUnit = (scaleMultiplier: number) => {
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

    getFontSizeStyle = (scaleIndex: number = 0) => {
        return css`
            font-size: ${this.fontSizeNumber(scaleIndex)}rem;
        `;
    };

    getLineHeightStyle = (scaleIndex: number = 0) => {
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

        return css`
            line-height: ${lineHeight};
        `;
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
