import React from 'react';
import ReactDOM from 'react-dom';
import { Logo } from '../Logo.jsx';

describe('Logo', () =>{
    describe('render', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Logo />, div);
            ReactDOM.unmountComponentAtNode(div);
        });
    });
});