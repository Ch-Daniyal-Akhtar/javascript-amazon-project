import {priceCalculator} from './../scripts/utils/money.js';

describe('test suite:Format Currency',()=>{
    it('tests with rounding',()=>{
        expect(priceCalculator(2095)).toEqual('20.95');
    })
    it('tests with zero',()=>{
        expect(priceCalculator(0)).toEqual('0.00');
    })
    it('works with rounding off',()=>{
        expect(priceCalculator(2000.5)).toEqual('20.01');
    })
})