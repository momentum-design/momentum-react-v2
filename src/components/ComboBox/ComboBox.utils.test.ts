import { handleFilter, searchItem, getSumScrollTop } from './ComboBox.utils';

describe('ComboBox utils', () => {
    describe('handleFilter', () => {
        const comboBoxGroupsWithSection = [
            {section:'secitonA',items:[
                {key:'keyA1',label:'itemA1'},
                {key:'keyA2',label:'itemA2'},
                {key:'keyA3',label:'itemA3'},
            ]},
            {section:'seciontB',items:[
                {key:'keyB1',label:'itemB1'},
                {key:'keyB2',label:'itemB2'},
                {key:'keyB3',label:'itemB3'},
            ]}
        ];
        
            const comboBoxGroupsWithoutSection = [
            {items:[
                {key:'keyA1',label:'itemA1'},
                {key:'keyA2',label:'itemA2'},
                {key:'keyA3',label:'itemA3'},
                {key:'keyB1',label:'itemB1'},
                {key:'keyB2',label:'itemB2'},
                {key:'keyB3',label:'itemB3'},
            ]}
        ];
        
        it('test case withSection', () => {
            expect(handleFilter(comboBoxGroupsWithSection, '1')).toEqual([
                {section:'secitonA',items:[
                    {key:'keyA1',label:'itemA1'},
                ]},
                {section:'seciontB',items:[
                    {key:'keyB1',label:'itemB1'},
                ]}
            ]);
            expect(handleFilter(comboBoxGroupsWithSection, 'A')).toEqual([
                {section:'secitonA',items:[
                    {key:'keyA1',label:'itemA1'},
                    {key:'keyA2',label:'itemA2'},
                    {key:'keyA3',label:'itemA3'},
                ]},
            ]);
        });
    
        it('test case withoutSection', () => {
            expect(handleFilter(comboBoxGroupsWithoutSection, '1')).toEqual([
                {items:[
                    {key:'keyA1',label:'itemA1'},
                    {key:'keyB1',label:'itemB1'},
                ]},
            ]);
    
            expect(handleFilter(comboBoxGroupsWithoutSection, 'a')).toEqual([
                {items:[
                    {key:'keyA1',label:'itemA1'},
                    {key:'keyA2',label:'itemA2'},
                    {key:'keyA3',label:'itemA3'},
                ]}
            ]);
    
            expect(handleFilter(comboBoxGroupsWithoutSection, 'A')).toEqual([
                {items:[
                    {key:'keyA1',label:'itemA1'},
                    {key:'keyA2',label:'itemA2'},
                    {key:'keyA3',label:'itemA3'},
                ]}
            ]);
        });
    
        it('test case not match any of the item labels', () => {
            expect(handleFilter(comboBoxGroupsWithoutSection, 'c')).toEqual([]);
        });
    });

    describe('searchItem', () => {
        const comboBoxGroupsWithSection = [
            {section:'secitonA',items:[
                {key:'keyA1',label:'itemA1'},
                {key:'keyA2',label:'itemA2'},
                {key:'keyA3',label:'itemA3'},
            ]},
            {section:'seciontB',items:[
                {key:'keyB1',label:'itemB1'},
                {key:'keyB2',label:'itemB2'},
                {key:'keyB3',label:'itemB3'},
            ]}
        ];
        
            const comboBoxGroupsWithoutSection = [
            {items:[
                {key:'keyA1',label:'itemA1'},
                {key:'keyA2',label:'itemA2'},
                {key:'keyA3',label:'itemA3'},
                {key:'keyB1',label:'itemB1'},
                {key:'keyB2',label:'itemB2'},
                {key:'keyB3',label:'itemB3'},
            ]}
        ];

        it('test case withSection', () => {
            expect(searchItem('keyA1',comboBoxGroupsWithSection)).toEqual({key:'keyA1',label:'itemA1'});
        });

        it('test case withoutSection', () => {
            expect(searchItem('keyB1',comboBoxGroupsWithoutSection)).toEqual({key:'keyB1',label:'itemB1'});
        });

        it('test case not match any of the item keys', () => {
            expect(searchItem('key1',comboBoxGroupsWithoutSection)).toEqual({key:undefined,label:undefined});
        });
    });

    describe('getSumScrollTop', () => {
        const sampleElement1 = {
            scrollTop:0,
        };

        const sampleElement2 = {
            scrollTop:NaN,
            parentElement:sampleElement1,
        };

        const sampleElement3 = {
            scrollTop:18.5,
            parentElement:sampleElement2,
        };

        const sampleElement4 = {
            scrollTop:10.5,
            parentElement:sampleElement3,
        };

        it('test case', () => {
            expect(getSumScrollTop(sampleElement4 as Element)).toEqual(18.5);
            expect(getSumScrollTop(sampleElement3 as Element)).toEqual(0);
            expect(getSumScrollTop(sampleElement2 as Element)).toEqual(0);
            expect(getSumScrollTop(sampleElement1 as Element)).toEqual(0);
        });
    });
});
