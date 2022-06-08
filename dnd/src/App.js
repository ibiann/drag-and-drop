import React, { useEffect } from 'react'
import { useState } from 'react'
import { arrayMoveMutable } from 'array-move'
import { List } from 'antd'
import { Container, Draggable } from 'react-smooth-dnd'
import ListItemText from "@material-ui/core/ListItemText";
import { ListItem } from '@material-ui/core'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const App = () => {
  const [cards, setCards] = useState([
    { id: "1", name: "card 1" },
    { id: "2", name: "card 2" },
    { id: "3", name: "card 3" },
    { id: "4", name: "card 4" },
  ])

  const onDrop = ({
    removeIndex,
    addedIndex
  }) => {
    setCards((cards) => arrayMoveMutable(cards, removeIndex, addedIndex))
  }

  useEffect(() => {
    console.log(cards)
  }, [cards])

  return (
    <List>
    <Container dragHandleSelector='.drag-handle' lockAxis="y" onDrop={onDrop}>
        {cards.map((id, name) => (
          <Draggable key={id}>
            <ListItem>
              <ListItemText primary={name} />
              <ListItemSecondaryAction>
                <ListItemIcon className="drag-handle">
                  <DragHandleIcon />
                </ListItemIcon>
              </ListItemSecondaryAction>
            </ListItem>
          </Draggable>
        ))}
      </Container>
      </List>
  )
}

export default App