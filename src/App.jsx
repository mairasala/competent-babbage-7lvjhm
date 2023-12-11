import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import SortableContainer from "./components/SortableContainer";
import Item from "./components/Item";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";

import "./App.css";
import Context from "./components/Context";
import DraggableContainer from "./components/DraggablesContainer";
import { getNewPosition } from "./utils/getOverId";

function App() {
  const [sequences] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
  ]);
  const [scriptSequences, setScriptsequences] = useState([
    "A0",
    "B1",
    "C2",
    "D3",
  ]);
  const [placeholderScriptsequence, setPlaceholderScriptsequence] =
    useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    let to = setInterval(() => {
      setScriptsequences((scriptSequences) => {
        const randomSequenceIndex =
          Math.round(Math.random() * Object.keys(sequences).length);
        const randomSequence = sequences[randomSequenceIndex];

        return [
          ...scriptSequences,
          `${randomSequence}${scriptSequences.length}`,
        ];
      });
    }, 10000);

    return () => {
      clearInterval(to);
    };
  }, []);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;
    const activeIsSequence = !!active.data.current?.container;

    if (!overId && activeIsSequence && placeholderScriptsequence) {
      setScriptsequences((scriptseqs) =>
        scriptseqs.filter((item) => item !== placeholderScriptsequence.id)
      );
      setPlaceholderScriptsequence(null);
      return 
    }
    let overIndex = getNewPosition(over, scriptSequences);
    overIndex = overIndex !== undefined ? overIndex : scriptSequences.length;

    if (activeIsSequence) {
      if (placeholderScriptsequence?.original === active.id) {
        const currentPlaceholderIndex = scriptSequences.indexOf(
          placeholderScriptsequence.id
        );

        setScriptsequences((elements) => {
          console.log(
            `move ${placeholderScriptsequence.id} from ${currentPlaceholderIndex} to ${overIndex} (replace ${over.id})`
          );
          return arrayMove(elements, currentPlaceholderIndex, overIndex);
        });
      } else {
        console.log(placeholderScriptsequence);
        const scriptsequencePlaceholder = `${active.id}${-1}`;
        setPlaceholderScriptsequence({
          original: active.id,
          id: scriptsequencePlaceholder,
        });
        setScriptsequences((elements) => {
          const items = [...elements];
          items.splice(overIndex, 0, scriptsequencePlaceholder);
          return items;
        });
      }
    }

    //const activeContainer = active.data.current.sortable.containerId;
    //const overContainer = over.data.current?.sortable.containerId || over.id;

    /*if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }*/
  };

  const handleDragEnd = ({ active, over }) => {
    const activeIsSequence = !!active.data.current?.container;

    if (!over) {
      setActiveId(null);
      if (activeIsSequence && placeholderScriptsequence) {
        console.log("no over");
        setScriptsequences((scriptseqs) =>
          scriptseqs.filter((item) => item !== placeholderScriptsequence.id)
        );
      }
      setPlaceholderScriptsequence(null);
      return;
    } else if (activeIsSequence) {
      console.log("with over");
      setScriptsequences((scriptseqs) => {
        const items = [...scriptseqs];
        items.splice(
          items.indexOf(placeholderScriptsequence.id),
          1,
          `${placeholderScriptsequence.original}${scriptseqs.length - 1}`
        );
        console.log(items);
        return items;
      });
      setPlaceholderScriptsequence(null);
    } else {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current.sortable ? over.data.current.sortable.index : scriptSequences.length
      setScriptsequences(scriptseqs => {
        return arrayMove(scriptseqs, activeIndex, overIndex)
      })
    }

    /* if (active.id !== over.id) {
      console.log(active.id, over.id,  active.data.current)
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      let newItems;
      if (activeContainer === overContainer) {
        newItems = {
          ...itemGroups,
          [overContainer]: arrayMove(
            itemGroups[overContainer],
            activeIndex,
            overIndex
          ),
        };
      } else {
        newItems = moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      }

      setItemGroups((itemGroups) => newItems);
    }*/

    setActiveId(null);
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };

  return (
    <Context.Provider value={{}}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="container">
          <SortableContainer
            id={"scriptSequences"}
            data={scriptSequences}
            activeId={activeId}
          />
        </div>
        <div className="container">
          <DraggableContainer
            id={"sequences"}
            data={sequences}
            activeId={activeId}
          />
        </div>
        <DragOverlay dropAnimation={null}>
          {activeId ? <Item id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </Context.Provider>
  );
}

export default App;
