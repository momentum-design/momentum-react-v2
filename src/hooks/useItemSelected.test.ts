import { renderHook } from '@testing-library/react-hooks';
import { useItemSelected } from './useItemSelected';
import { act } from 'react-test-renderer';

describe('useItemSelected', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
      /**/
    });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('when mode is none', () => {
    describe('init', () => {
      it('should return with itemSelection API', () => {
        const hook = renderHook(() => useItemSelected<string>({ selectionMode: 'none' }));

        expect(hook.result.current).toEqual({
          selectionMode: 'none',
          selectedItems: [],
          isSelected: expect.any(Function),
          toggle: expect.any(Function),
          update: expect.any(Function),
          clear: expect.any(Function),
        });
      });

      it.each`
        selectedByDefault | expected
        ${undefined}      | ${[]}
        ${['1']}          | ${[]}
        ${['1', '2']}     | ${[]}
      `(
        'should select $expected when default selection set to $selectedByDefault',
        ({ selectedByDefault, expected }) => {
          const onSelectionChange = jest.fn();
          const hook = renderHook(() =>
            useItemSelected<string>({ selectionMode: 'none', selectedByDefault, onSelectionChange })
          );

          expect(hook.result.current.selectedItems).toEqual(expected);
          expect(onSelectionChange).not.toHaveBeenCalled();
        }
      );
    });

    describe('isSelected', () => {
      it.each`
        selectedByDefault | expected
        ${undefined}      | ${false}
        ${['1']}          | ${false}
        ${['1', '2']}     | ${false}
      `(
        'should return with $expected when $selectedByDefault selected',
        ({ selectedByDefault, expected }) => {
          const hook = renderHook(() =>
            useItemSelected<string>({ selectionMode: 'none', selectedByDefault })
          );

          expect(hook.result.current.isSelected('1')).toEqual(expected);
        }
      );
    });

    describe('toggle', () => {
      it.each`
        selectedByDefault | value        | selected
        ${undefined}      | ${undefined} | ${[]}
        ${['1']}          | ${undefined} | ${[]}
        ${undefined}      | ${true}      | ${[]}
        ${['1']}          | ${true}      | ${[]}
        ${undefined}      | ${false}     | ${[]}
        ${['1']}          | ${false}     | ${[]}
      `(
        'should select $selected when default is $selectedByDefault and value is $value',
        ({ selectedByDefault, value, selected }) => {
          const onSelectionChange = jest.fn();
          const hook = renderHook(() =>
            useItemSelected<string>({ selectionMode: 'none', selectedByDefault, onSelectionChange })
          );

          hook.result.current.toggle('1', value);
          expect(hook.result.current.selectedItems).toEqual(selected);
          expect(onSelectionChange).not.toHaveBeenCalled();
        }
      );
    });

    describe('update', () => {
      it.each`
        selections    | expected
        ${['1']}      | ${[]}
        ${['1', '2']} | ${[]}
      `('should select $expected when $selections selected', ({ selections, expected }) => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({ selectionMode: 'none', onSelectionChange })
        );
        act(() => {
          hook.result.current.update(selections);
        });
        expect(hook.result.current.selectedItems).toEqual(expected);
        expect(onSelectionChange).not.toHaveBeenCalled();
      });
    });

    describe('clear', () => {
      it('should does nothing', () => {
        const onSelectionChange = jest.fn();
        const hook = renderHook(() =>
          useItemSelected<string>({ selectionMode: 'none', onSelectionChange })
        );

        const firstSelection = hook.result.current.selectedItems;
        hook.result.current.clear();
        const secondSelection = hook.result.current.selectedItems;
        expect(secondSelection).toEqual([]);
        expect(firstSelection).toBe(firstSelection);
        expect(onSelectionChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('when mode is single', () => {
    describe('init', () => {
      it.each`
        selectedByDefault | expected
        ${undefined}      | ${[]}
        ${['1']}          | ${['1']}
        ${['1', '2']}     | ${['1']}
      `(
        'should select $expected when default selection set to $selectedByDefault',
        ({ selectedByDefault, expected }) => {
          const onSelectionChange = jest.fn();

          const hook = renderHook(() =>
            useItemSelected<string>({
              selectionMode: 'single',
              selectedByDefault,
              onSelectionChange,
            })
          );

          expect(hook.result.current.selectedItems).toEqual(expected);
          expect(onSelectionChange).not.toHaveBeenCalled();
        }
      );
    });

    describe('isSelected', () => {
      it.each`
        selectedByDefault | expected
        ${undefined}      | ${false}
        ${['1']}          | ${true}
        ${['1', '2']}     | ${true}
      `(
        'should return with $expected when $selectedByDefault selected',
        ({ selectedByDefault, expected }) => {
          const hook = renderHook(() =>
            useItemSelected<string>({ selectionMode: 'single', selectedByDefault })
          );

          expect(hook.result.current.isSelected('1')).toEqual(expected);
        }
      );
    });

    describe('toggle', () => {
      it.each`
        isRequired | selectedByDefault | value        | selected | changed
        ${false}   | ${undefined}      | ${undefined} | ${['1']} | ${true}
        ${false}   | ${['1']}          | ${undefined} | ${[]}    | ${true}
        ${false}   | ${undefined}      | ${true}      | ${['1']} | ${true}
        ${false}   | ${['1']}          | ${true}      | ${['1']} | ${false}
        ${false}   | ${undefined}      | ${false}     | ${[]}    | ${false}
        ${false}   | ${['1']}          | ${false}     | ${[]}    | ${true}
        ${true}    | ${undefined}      | ${undefined} | ${['1']} | ${true}
        ${true}    | ${['1']}          | ${undefined} | ${['1']} | ${false}
        ${true}    | ${undefined}      | ${true}      | ${['1']} | ${true}
        ${true}    | ${['1']}          | ${true}      | ${['1']} | ${false}
        ${true}    | ${undefined}      | ${false}     | ${[]}    | ${false}
        ${true}    | ${['1']}          | ${false}     | ${['1']} | ${false}
      `(
        'should select $selected when isRequired is $isRequired default is $selectedByDefault and value is $value',
        ({ isRequired, selectedByDefault, value, selected, changed }) => {
          const onSelectionChange = jest.fn();

          const hook = renderHook(() =>
            useItemSelected<string>({
              selectionMode: 'single',
              selectedByDefault,
              onSelectionChange,
              isRequired,
            })
          );

          act(() => {
            hook.result.current.toggle('1', value);
          });

          expect(hook.result.current.selectedItems).toEqual(selected);
          if (changed) {
            expect(onSelectionChange).toHaveBeenNthCalledWith(1, selected);
          } else {
            expect(onSelectionChange).not.toHaveBeenCalled();
          }
        }
      );
    });

    describe('update', () => {
      it.each`
        selections    | expected
        ${['1']}      | ${['1']}
        ${['1', '2']} | ${['1']}
      `('should select $expected when $selections selected', ({ selections, expected }) => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({ selectionMode: 'single', onSelectionChange })
        );
        act(() => {
          hook.result.current.update(selections);
        });
        expect(hook.result.current.selectedItems).toEqual(expected);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, expected);
      });

      it('should overwrite all selection', () => {
        const hook = renderHook(() =>
          useItemSelected<string>({ selectionMode: 'single', selectedByDefault: ['1', '2'] })
        );
        act(() => {
          hook.result.current.update(['3', '4']);
        });
        expect(hook.result.current.selectedItems).toEqual(['3']);
      });

      it('should not call onSelectionChange when there is no change in the selection', () => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({
            selectionMode: 'single',
            selectedByDefault: ['1'],
            onSelectionChange,
          })
        );
        act(() => {
          hook.result.current.update(['1']);
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
      });
    });

    describe('clear', () => {
      it.each`
        selectedByDefault
        ${undefined}
        ${['1']}
        ${['1', '2']}
      `(
        'should clear all selection when default selection set to $selectedByDefault',
        ({ selectedByDefault }) => {
          const onSelectionChange = jest.fn();

          const hook = renderHook(() =>
            useItemSelected<string>({
              selectionMode: 'single',
              selectedByDefault,
              onSelectionChange,
            })
          );

          act(() => {
            hook.result.current.clear();
          });
          expect(hook.result.current.selectedItems).toEqual([]);
          if (selectedByDefault) {
            expect(onSelectionChange).toHaveBeenNthCalledWith(1, []);
          } else {
            expect(onSelectionChange).not.toHaveBeenCalled();
          }
        }
      );

      it('should not call onSelectionChange when when the selection was empty', () => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({
            selectionMode: 'single',
            selectedByDefault: [],
            onSelectionChange,
          })
        );
        act(() => {
          hook.result.current.clear();
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('when mode is multiple', () => {
    describe('init', () => {
      it.each`
        selectedByDefault | expected
        ${undefined}      | ${[]}
        ${['1']}          | ${['1']}
        ${['1', '2']}     | ${['1', '2']}
      `(
        'should select $expected when default selection set to $selectedByDefault',
        ({ selectedByDefault, expected }) => {
          const onSelectionChange = jest.fn();

          const hook = renderHook(() =>
            useItemSelected<string>({
              selectionMode: 'multiple',
              selectedByDefault,
              onSelectionChange,
            })
          );

          expect(hook.result.current.selectedItems).toEqual(expected);
          expect(onSelectionChange).not.toHaveBeenCalled();
        }
      );
    });

    describe('isSelected', () => {
      it.each`
        selectedByDefault | expected
        ${undefined}      | ${false}
        ${['1']}          | ${true}
        ${['1', '2']}     | ${true}
      `(
        'should return with $expected when $selectedByDefault selected',
        ({ selectedByDefault, expected }) => {
          const hook = renderHook(() =>
            useItemSelected<string>({ selectionMode: 'multiple', selectedByDefault })
          );

          expect(hook.result.current.isSelected('1')).toEqual(expected);
        }
      );
    });

    describe('toggle', () => {
      it.each`
        isRequired | selectedByDefault | value        | selected      | changed
        ${false}   | ${undefined}      | ${undefined} | ${['1']}      | ${true}
        ${false}   | ${['2']}          | ${undefined} | ${['2', '1']} | ${true}
        ${false}   | ${['1']}          | ${undefined} | ${[]}         | ${true}
        ${false}   | ${['1', '2']}     | ${undefined} | ${['2']}      | ${true}
        ${false}   | ${undefined}      | ${true}      | ${['1']}      | ${true}
        ${false}   | ${['2']}          | ${true}      | ${['2', '1']} | ${true}
        ${false}   | ${['1']}          | ${true}      | ${['1']}      | ${false}
        ${false}   | ${['1', '2']}     | ${true}      | ${['1', '2']} | ${false}
        ${false}   | ${undefined}      | ${false}     | ${[]}         | ${false}
        ${false}   | ${['2']}          | ${false}     | ${['2']}      | ${false}
        ${false}   | ${['1']}          | ${false}     | ${[]}         | ${true}
        ${false}   | ${['1', '2']}     | ${false}     | ${['2']}      | ${true}
        ${true}    | ${undefined}      | ${undefined} | ${['1']}      | ${true}
        ${true}    | ${['2']}          | ${undefined} | ${['2', '1']} | ${true}
        ${true}    | ${['1']}          | ${undefined} | ${['1']}      | ${false}
        ${true}    | ${['1', '2']}     | ${undefined} | ${['2']}      | ${true}
        ${true}    | ${undefined}      | ${true}      | ${['1']}      | ${true}
        ${true}    | ${['2']}          | ${true}      | ${['2', '1']} | ${true}
        ${true}    | ${['1']}          | ${true}      | ${['1']}      | ${false}
        ${true}    | ${['1', '2']}     | ${true}      | ${['1', '2']} | ${false}
        ${true}    | ${undefined}      | ${false}     | ${[]}         | ${false}
        ${true}    | ${['2']}          | ${false}     | ${['2']}      | ${false}
        ${true}    | ${['1']}          | ${false}     | ${['1']}      | ${false}
        ${true}    | ${['1', '2']}     | ${false}     | ${['2']}      | ${true}
      `(
        'should select $selected when isRequired is $isRequired default is $selectedByDefault and value is $value',
        ({ isRequired, selectedByDefault, value, selected, changed }) => {
          const onSelectionChange = jest.fn();

          const hook = renderHook(() =>
            useItemSelected<string>({
              selectionMode: 'multiple',
              selectedByDefault,
              onSelectionChange,
              isRequired,
            })
          );

          act(() => {
            hook.result.current.toggle('1', value);
          });
          expect(hook.result.current.selectedItems).toEqual(selected);
          if (changed) {
            expect(onSelectionChange).toHaveBeenNthCalledWith(1, selected);
          } else {
            expect(onSelectionChange).not.toHaveBeenCalled;
          }
        }
      );
    });

    describe('update', () => {
      it.each`
        selections    | expected
        ${['1']}      | ${['1']}
        ${['1', '2']} | ${['1', '2']}
      `('should select $expected when $selections selected', ({ selections, expected }) => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({ selectionMode: 'multiple', onSelectionChange })
        );
        act(() => {
          hook.result.current.update(selections);
        });
        expect(hook.result.current.selectedItems).toEqual(expected);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, expected);
      });

      it('should overwrite all selection', () => {
        const hook = renderHook(() =>
          useItemSelected<string>({ selectionMode: 'multiple', selectedByDefault: ['1', '2'] })
        );
        act(() => {
          hook.result.current.update(['3', '4']);
        });
        expect(hook.result.current.selectedItems).toEqual(['3', '4']);
      });

      it('should not call onSelectionChange when there is no change in the selection', () => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({
            selectionMode: 'multiple',
            selectedByDefault: ['1', '2'],
            onSelectionChange,
          })
        );
        act(() => {
          hook.result.current.update(['1', '2']);
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
      });
    });

    describe('clear', () => {
      it.each`
        selectedByDefault
        ${undefined}
        ${['1', '2']}
      `(
        'should clear all selection when default selection set to $selectedByDefault',
        ({ selectedByDefault }) => {
          const onSelectionChange = jest.fn();

          const hook = renderHook(() =>
            useItemSelected<string>({
              selectionMode: 'multiple',
              selectedByDefault,
              onSelectionChange,
            })
          );

          act(() => {
            hook.result.current.clear();
          });
          expect(hook.result.current.selectedItems).toEqual([]);
          if (selectedByDefault) {
            expect(onSelectionChange).toHaveBeenNthCalledWith(1, []);
          } else {
            expect(onSelectionChange).not.toHaveBeenCalled();
          }
        }
      );

      it('should not call onSelectionChange when when the selection was empty', () => {
        const onSelectionChange = jest.fn();

        const hook = renderHook(() =>
          useItemSelected<string>({
            selectionMode: 'multiple',
            selectedByDefault: [],
            onSelectionChange,
          })
        );
        act(() => {
          hook.result.current.clear();
        });
        expect(onSelectionChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('controlled mode', () => {
    it('should use selectedItems from props', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(() =>
        useItemSelected<string>({
          selectionMode: 'multiple',
          selectedItems: ['1', '2'],
          onSelectionChange,
        })
      );

      expect(hook.result.current.selectedItems).toEqual(['1', '2']);
      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it('should not call onSelectionChange when selection changed from props', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({ selectionMode: 'multiple', selectedItems, onSelectionChange }),
        { initialProps: { selectedItems: ['1', '2'] } }
      );
      expect(onSelectionChange).not.toHaveBeenCalled();

      hook.rerender({ selectedItems: ['3', '4'] });

      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it('should call onSelectionChange when selection changed via toggle', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({ selectionMode: 'multiple', selectedItems, onSelectionChange }),
        { initialProps: { selectedItems: ['1', '2'] } }
      );
      act(() => hook.result.current.toggle('3', true));

      expect(onSelectionChange).toHaveBeenNthCalledWith(1, ['1', '2', '3']);
    });

    it('should call onSelectionChange when selection changed via update', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({ selectionMode: 'multiple', selectedItems, onSelectionChange }),
        { initialProps: { selectedItems: ['1', '2'] } }
      );
      act(() => hook.result.current.update(['2', '3']));

      expect(onSelectionChange).toHaveBeenNthCalledWith(1, ['2', '3']);
    });
    it('should call onSelectionChange when selection changed via clear', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({ selectionMode: 'multiple', selectedItems, onSelectionChange }),
        { initialProps: { selectedItems: ['1', '2'] } }
      );
      act(() => hook.result.current.clear());

      expect(onSelectionChange).toHaveBeenNthCalledWith(1, []);
    });

    it('should update selectedItems when selectedItems prop changed', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({
            selectionMode: 'multiple',
            selectedItems,
            onSelectionChange,
          }),
        {
          initialProps: { selectedItems: ['1', '2'] },
        }
      );

      expect(hook.result.current.selectedItems).toEqual(['1', '2']);
      expect(onSelectionChange).not.toHaveBeenCalled();

      hook.rerender({ selectedItems: ['3', '4'] });

      expect(hook.result.current.selectedItems).toEqual(['3', '4']);
      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it('should not update selectedItems when selectedItems prop is not changed', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({
            selectionMode: 'multiple',
            selectedItems,
            onSelectionChange,
          }),
        {
          initialProps: { selectedItems: ['1', '2'] },
        }
      );

      expect(hook.result.current.selectedItems).toEqual(['1', '2']);
      expect(onSelectionChange).not.toHaveBeenCalled();

      hook.rerender({ selectedItems: ['1', '2'] });

      expect(hook.result.current.selectedItems).toEqual(['1', '2']);
      expect(onSelectionChange).not.toHaveBeenCalled();
    });

    it('should not update selectedItems when selectedItems prop is undefined', () => {
      const onSelectionChange = jest.fn();

      const hook = renderHook(
        ({ selectedItems }) =>
          useItemSelected<string>({
            selectionMode: 'multiple',
            selectedItems,
            onSelectionChange,
          }),
        {
          initialProps: { selectedItems: ['1', '2'] },
        }
      );

      expect(hook.result.current.selectedItems).toEqual(['1', '2']);
      expect(onSelectionChange).not.toHaveBeenCalled();
    });
  });
});
