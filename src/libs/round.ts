type Options = {
    radius?: number;
    color?: string;
    start?: number;
    letterWidth?: number;
};

export function draw(text: string, container: HTMLElement, options: Options = {}) {
    const radius = options.radius || 100;
    const color = options.color || 'transparent';
    const startAngle = options.start || -90;
    const letterWidth = options.letterWidth || 20;

    const count = text.length;
    const angle = 360 / (count + 1);
    let currentAngle = startAngle;

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

    text.split('').forEach((letter) => {
        const span = document.createElement("SPAN");
        span.innerHTML = letter !== ' ' ? letter : '&nbsp;';

        Object.assign(span.style, {
            transform: `rotate(${currentAngle}deg)`,
            height: radius,
            position: 'absolute',
            width: letterWidth,
            transformOrigin: '0 100%',
            top: 0,
        });

        container.appendChild(span);
        currentAngle += angle;
    });
}
