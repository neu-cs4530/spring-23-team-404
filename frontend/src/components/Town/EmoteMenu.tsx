import React from 'react';
import { Planet } from 'react-planet';
import { useState, useEffect } from 'react';
import useTownController from '../../hooks/useTownController';
import { Button } from '@chakra-ui/react';

export default function EmoteMenu(): JSX.Element {
  const controller = useTownController();
  const emoteIDs = [1, 2, 3, 4, 5, 6, 7, 8];

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (menuOpen) {
      controller.pause();
    } else {
      controller.unPause();
    }
  }, [menuOpen, controller]);

  const handleChangeEmote = (emoteID: number) => {
    setMenuOpen(false);
    controller.emitEmoteChange(emoteID);
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
        <Button key={emote} onClick={() => handleChangeEmote(emote)}>
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
