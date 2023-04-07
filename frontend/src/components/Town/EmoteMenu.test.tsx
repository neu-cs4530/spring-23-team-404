import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { mock, MockProxy } from 'jest-mock-extended';
import React from 'react';
import { act } from 'react-dom/test-utils';
import EmoteMenu from './EmoteMenu';
import TownController from '../../classes/TownController';
import TownControllerContext from '../../contexts/TownControllerContext';

function renderEmoteMenu(townController: TownController) {
  return (
    <ChakraProvider>
      <TownControllerContext.Provider value={townController}>
        <EmoteMenu />
      </TownControllerContext.Provider>
    </ChakraProvider>
  );
}

describe('Create Emote Menu', () => {
  let emoteMenuButton: HTMLElement;

  let townController: MockProxy<TownController>;

  let renderData: RenderResult;
  beforeEach(() => {
    townController = mock<TownController>();

    renderData = render(renderEmoteMenu(townController));

    emoteMenuButton = renderData.getByRole('button', { name: /Emote Menu/i });
  });
  describe('Selecting an Emote', () => {
    it('Emote change event is not emitted if menu is opened or closed', async () => {
      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(0);

      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(0);

      // close menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(0);
    });
    it('Emote change event is emitted if an individual emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the first emote
      const emote1Button = renderData.getByTestId(1);

      act(() => {
        fireEvent.click(emote1Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });
  });
});
