import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { mock, MockProxy } from 'jest-mock-extended';
import React from 'react';
import { act } from 'react-dom/test-utils';
import StatusUpdateModal from './StatusUpdateModal';
import TownController from '../../classes/TownController';
import TownControllerContext from '../../contexts/TownControllerContext';

function renderUpdateStatusModal(townController: TownController) {
  return (
    <ChakraProvider>
      <TownControllerContext.Provider value={townController}>
        <StatusUpdateModal />
      </TownControllerContext.Provider>
    </ChakraProvider>
  );
}

describe('Create Emote Menu', () => {
  let updateStatusButton: HTMLElement;

  let townController: MockProxy<TownController>;

  let renderData: RenderResult;
  beforeEach(() => {
    townController = mock<TownController>();

    renderData = render(renderUpdateStatusModal(townController));

    updateStatusButton = renderData.getByRole('button', { name: /Status Update/i });
  });
  describe('Selecting an Emote', () => {
    it('Status update event is not emitted if menu is opened or closed', async () => {
      expect(townController.emitStatusUpdateChange).toHaveBeenCalledTimes(0);

      // open modal
      act(() => {
        fireEvent.click(updateStatusButton);
      });

      expect(townController.emitStatusUpdateChange).toHaveBeenCalledTimes(0);
      const closeButton = renderData.getByTestId('cancel');

      // close modal
      act(() => {
        fireEvent.click(closeButton);
      });

      expect(townController.emitStatusUpdateChange).toHaveBeenCalledTimes(0);
    });
    it('Update status event is successfully emitted on submit', async () => {
      // open menu
      act(() => {
        fireEvent.click(updateStatusButton);
      });

      const createButton = renderData.getByTestId('create');

      act(() => {
        fireEvent.click(createButton);
      });

      expect(townController.emitStatusUpdateChange).toHaveBeenCalledTimes(1);
    });
  });
});
