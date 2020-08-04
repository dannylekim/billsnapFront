import React from 'react';
import {Logo} from '../Logo.jsx';

describe('Logo', () => {
    describe('render', () => {
        describe('snapshots 📸', () => {
            it('Logo default should match snap shot', () => {
                matches(<Logo/>);
            });

            it('Logo size large should match snap shot', () => {
                matches(<Logo size='large'/>);
            });

            it('Logo size medium should match snap shot', () => {
                matches(<Logo size='medium'/>);
            });

            it('Logo size undefined option should match snap shot', () => {
                matches(<Logo size='gibberish'/>);
            });
        });
    });
});