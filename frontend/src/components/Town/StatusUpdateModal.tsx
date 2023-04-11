import React, { useEffect } from 'react';
import { useState } from 'react';
import useTownController from '../../hooks/useTownController';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function StatusUpdateModal(): JSX.Element {
  const townController = useTownController();

  const [statusText, setStatusText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      townController.pause();
    } else {
      townController.unPause();
    }
  }, [townController, isOpen]);

  const handleStatusUpdate = () => {
    setIsOpen(false);
    townController.emitStatusUpdateChange(statusText);
  };

  const handleStatusDelete = () => {
    setIsOpen(false);
    setStatusText('');
    townController.emitStatusUpdateChange(undefined);
  };

  return (
    <div style={{ marginLeft: 200 }}>
      <Button onClick={() => setIsOpen(true)}>Status Update</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your status!</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={ev => {
              ev.preventDefault();
            }}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor='status'>Status Label</FormLabel>
                <Input
                  data-testid='status-form'
                  id='status'
                  placeholder='How are you feeling?'
                  name='status'
                  maxLength={20}
                  value={statusText}
                  onChange={e => setStatusText(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button data-testid='create' colorScheme='blue' mr={3} onClick={handleStatusUpdate}>
                Create
              </Button>
              <Button data-testid='cancel' mr={3} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleStatusDelete}>
                Delete status
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
