import React from 'react';
import SmallBillCard from '../SmallBillCard.jsx';

const fakeBills = [
    {
        "id": 48,
        "name": "Mcdonald",
        "status": "OPEN",
        "category": "food",
        "created": "28-07-2020 14:25:10 -0400",
        "balance": 253.89
    },
    {
        "id": 49,
        "name": "STM",
        "status": "OPEN",
        "category": "public-transport",
        "created": "02-07-2020 15:25:10 -0400",
        "balance": 151.00
    },
]

describe('SmallBillCard', () => {

    describe('render', () => {
        describe('snapshots 📸', () => {
            it('SmallBillCard should match snap shot', () => {
                matches(<SmallBillCard bill={fakeBills} filterDateTime={jest.fn()} billIcons={jest.fn()}/>);
            });
        })
    })
})