import { handleFilter } from './combobox';

describe('handleFilter', () => {
  const comboboxGroupsWithSection = [
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

  const comboboxGroupsWithoutSection = [
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
    expect(handleFilter(comboboxGroupsWithSection, '1')).toEqual([
        {section:'secitonA',items:[
            {key:'keyA1',label:'itemA1'},
        ]},
        {section:'seciontB',items:[
            {key:'keyB1',label:'itemB1'},
        ]}
      ]);
    });

    expect(handleFilter(comboboxGroupsWithSection, 'A')).toEqual([
        {section:'secitonA',items:[
            {key:'keyA1',label:'itemA1'},
            {key:'keyA2',label:'itemA2'},
            {key:'keyA3',label:'itemA3'},
        ]},
    ]);

  it('test case withoutSection', () => {
    expect(handleFilter(comboboxGroupsWithoutSection, '1')).toEqual([
        {items:[
            {key:'keyA1',label:'itemA1'},
            {key:'keyB1',label:'itemB1'},
        ]},
      ]);
    });

    expect(handleFilter(comboboxGroupsWithoutSection, 'A')).toEqual([
        {items:[
            {key:'keyA1',label:'itemA1'},
            {key:'keyA2',label:'itemA2'},
            {key:'keyA3',label:'itemA3'},
        ]}
      ]);
});
