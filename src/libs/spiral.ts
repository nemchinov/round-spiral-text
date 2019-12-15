type Options = {
    radius?: number;
    color?: string;
    letterWidth?: number;
    start?: number;
    heightRow?: number;
    sizingFont?: boolean;
};

type MutableOnEachStep = {
    radius: number;
    currentAngle: number;
    height: number;
    fontSize: number;
    steps: number;
};

type MutableOptions = {
    perimeter: number;
    countLettersOnRound: number;
    angle: number;
    percent: number;
};

export function draw(plainText: string, container: HTMLElement, options: Options = {}) {
    const text = plainText.replace(/\s+/g, ' ');
    const letterWidth = options.letterWidth || 20;
    const radius = options.radius || 100;
    const color = options.color || 'transparent';
    const startAngle = options.start || -90;
    const heightStep = options.heightRow || 70;
    const sizingFont = options.sizingFont || false;
    const letters = text.split('');
    const fontStep = sizingFont ? (1 / letters.length) : 0;

    Object.assign(container.style, {
        width: radius * 2,
        height: radius * 2,
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: `${radius * 1000}px`,
        position: 'relative',
    });

    let mutableEachStep: MutableOnEachStep = {
        radius,
        currentAngle: startAngle,
        height: radius * 2,
        fontSize: 1,
        steps: 0,
    };
    let mutableOptions = getMutatedOptions(mutableEachStep.radius, letterWidth, heightStep);

    letters.forEach((letter) => {
        if (mutableEachStep.height < 1 || mutableEachStep.radius < 1) { return; }

        const span = document.createElement("SPAN");
        span.innerHTML = letter !== ' ' ? letter : '&nbsp;';
        
        Object.assign(span.style, {
            transform: `rotate(${mutableEachStep.currentAngle}deg)`,
            height: mutableEachStep.height,
            position: 'absolute',
            width: letterWidth,
            fontSize: `${mutableEachStep.fontSize}em`,
        });

        container.appendChild(span);

        mutableEachStep = getMutatedEachStep(mutableEachStep, mutableOptions, fontStep);

        if (mutableEachStep.steps >= mutableOptions.countLettersOnRound) {
            mutableEachStep.steps = 0;
            mutableOptions = getMutatedOptions(mutableEachStep.radius, letterWidth, heightStep);
        }
    });
}

function getMutatedEachStep(mutableEachStep: MutableOnEachStep, mutableOptions: MutableOptions, fontStep?: number) {
    mutableEachStep.currentAngle += mutableOptions.angle;

    if (mutableEachStep.currentAngle > 360) {
        mutableEachStep.currentAngle = 0;
    }

    mutableEachStep.height = Math.round(mutableEachStep.height - mutableOptions.percent);
    mutableEachStep.radius -= mutableOptions.percent / 2;
    mutableEachStep.steps++;

    if (fontStep) {
        mutableEachStep.fontSize -= fontStep;
    }

    return mutableEachStep;
}

function getMutatedOptions(radius: number, letterWidth: number, heightStep: number) {
    const perimeter = getPerimeter(radius);
    const countLettersOnRound = getNumberLettersOnRound(perimeter, letterWidth);

    return {
        perimeter,
        countLettersOnRound,
        angle: getLetterAngle(countLettersOnRound),
        percent: getLetterMovement(heightStep, countLettersOnRound),
    };
}

function getPerimeter(radius: number) {
    return 2 * Math.PI * radius;
}

function getLetterAngle(countRoundSteps: number) {
    return 360 / countRoundSteps;
}

function getLetterMovement(heightStep: number, countRoundSteps: number) {
    return heightStep / countRoundSteps;
}

function getNumberLettersOnRound(perimeter: number, letterWidth: number) {
    return perimeter / letterWidth;
}
