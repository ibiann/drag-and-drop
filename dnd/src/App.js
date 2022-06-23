import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "./utils";

import "./styles.css";

const useStyles = makeStyles((theme) => ({
  child: {},

  container: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 0)
  },

  dragHandle: {
    cursor: "move"
  },

  item: {},

  tree: {}
}));

const Child = ({ item }) => {
  const [items, setItems] = useState(
    item && item.children ? item.children : []
  );
  const classes = useStyles();

  const handleDrop = (dropResult) => {
    // console.log(item.id, dropResult);
    setItems(applyDrag(items, dropResult));
  };

  return (
    <Draggable key={item.id}>
      <div className={classes.child}>
        <Box
          className={classes.item}
          display="flex"
          justifyContent="space-between"
        >
          <Typography>{item.name}</Typography>
          <Box className={classes.dragHandle}>
            <MenuIcon />
          </Box>
        </Box>

        {items.length > 0 && (
          <div className={clsx(classes.tree, classes.container)}>
            <Container
              dragHandleSelector={`.${classes.dragHandle}`}
              getChildPayload={(i) => items[i]}
              getGhostParent={() => document.body}
              groupName="topics"
              // lockAxis="y"
              onDrop={handleDrop}
            >
              {items.map((item) => (
                <Child item={item} key={`ch-${item.id}`} />
              ))}
            </Container>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default function App() {
  const [items, setItems] = useState([
    { name: "Foo", id: 1 },
    { name: "B", id: 4 },
    { name: "C", id: 5 },
    {
      name: "Bar",
      id: 2,
      children: [
        { name: "Bar #1", id: 11 },
        { name: "Bar #2", id: 12 }
      ]
    },
    { name: "Baz", id: 3 },
    { name: "X", id: 6 },
    { name: "Y", id: 7 },
    { name: "Z", id: 8 }
  ]);
  const classes = useStyles();

  const handleDrop = (dropResult) => {
    // console.log("master", dropResult);
    // const { removedIndex, addedIndex, payload, element } = dropResult;
    setItems(applyDrag(items, dropResult));
  };

  useEffect(() => {
    console.log("Items changed", items);
  }, [items]);

  return (
    <div
      className={clsx(classes.tree, classes.container)}
      style={{ width: 250 }}
    >
      <Container
        dragHandleSelector={`.${classes.dragHandle}`}
        getChildPayload={(i) => items[i]}
        getGhostParent={() => document.body}
        groupName="topics"
        // lockAxis="y"
        onDrop={handleDrop}
      >
        {items.map((item) => (
          <Child item={item} key={`ch-${item.id}`} />
        ))}
      </Container>
    </div>
  );
}
