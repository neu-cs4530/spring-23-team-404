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

    it('Emote change event is emitted if the second emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the second emote
      const emote2Button = renderData.getByTestId(2);

      act(() => {
        fireEvent.click(emote2Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });

    it('Emote change event is emitted if the third emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the third emote
      const emote3Button = renderData.getByTestId(3);

      act(() => {
        fireEvent.click(emote3Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });

    it('Emote change event is emitted if the fourth emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the fourth emote
      const emote4Button = renderData.getByTestId(4);

      act(() => {
        fireEvent.click(emote4Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });

    it('Emote change event is emitted if the fifth emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the fifth emote
      const emote5Button = renderData.getByTestId(5);

      act(() => {
        fireEvent.click(emote5Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });

    it('Emote change event is emitted if the sixth emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the sixth emote
      const emote6Button = renderData.getByTestId(6);

      act(() => {
        fireEvent.click(emote6Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });

    it('Emote change event is emitted if the seventh emote button is pressed', async () => {
      // open menu
      act(() => {
        fireEvent.click(emoteMenuButton);
      });

      // button for the seventh emote
      const emote7Button = renderData.getByTestId(7);

      act(() => {
        fireEvent.click(emote7Button);
      });

      expect(townController.emitEmoteChange).toHaveBeenCalledTimes(1);
    });
  });
});
