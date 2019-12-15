import './styles/style.scss';
import * as round from './libs/round';
import * as spiral from './libs/spiral';

const longText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            more and more text. I'm here. Letters. Spiral. A B C D E F G.`;

const text = 'Lorem Ipsum';

round.draw(text, document.querySelector('.round-box'), { radius: 200, color: '#d6ffee' });
spiral.draw(longText, document.querySelector('.spiral-box'), { radius: 200, color: 'green', sizingFont: true });
