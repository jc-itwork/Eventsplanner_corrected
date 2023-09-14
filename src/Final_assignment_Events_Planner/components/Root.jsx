import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';
import { getEvents } from '../pages/events';


export async function loader() {
  const events = await getEvents();
  return { events };
}

export const Root = () => {
  return (
    <Box >
      <Navigation/>
      <Outlet />
    </Box>
  );
};
