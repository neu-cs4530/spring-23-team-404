import React from 'react';
import { Planet } from 'react-planet';
import { useState } from 'react';
import useTownController from '../../hooks/useTownController';
import { Button } from '@chakra-ui/react';
import { Emote } from '../../types/CoveyTownSocket';

export default function EmoteMenu(): JSX.Element {
  const controller = useTownController();
  const emoteIDs = [1, 2, 3, 4, 5, 6, 7, 8];

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleChangeEmote = (emoteID: number) => {
    setMenuOpen(false);
    controller.emitEmoteChange({ id: emoteID, timeCreated: new Date() } as Emote);
  };

  return (
    <Planet
      centerContent={<Button>Emote Menu</Button>}
      hideOrbit
      bounce={false}
      onClick={() => {
        setMenuOpen(!menuOpen);
      }}
      open={menuOpen}
      orbitRadius={100}
      rotation={68}>
      {emoteIDs.map(emote => (
        <Button data-testid={emote} key={emote} onClick={() => handleChangeEmote(emote)}>
          {emote}
        </Button>
      ))}
      <div />
      <div />
      <div />
      <div />
      <div />
    </Planet>
  );
}
