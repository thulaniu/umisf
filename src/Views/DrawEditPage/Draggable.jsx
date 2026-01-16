import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { Card } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

export default function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    height: '30px',
    width: '100px',
    margin: '2px',
    zIndex: 2,
    cursor: 'grabbing',
    border: '2px solid #dadada',
    borderRadius: '7px'
  } : {
    height: '30px',
    width: '100px',
    margin: '2px',
  };

  
  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes} variant= 'elevation' elevation={3}>
      {props.children}
    </Card>
  );
}