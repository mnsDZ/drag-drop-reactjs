import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from 'react';


const myData = [
  {
    city: "Paris",
    data: [
      { brand: "Ikéa", staff: 100 },
      { brand: "Castoroma", staff: 200 }
    ]
  },
  {
    city: "Londres",
    data: [
      { brand: "Castorama", staff: 250 },
      { brand: "Ikéa", staff: 10 },
      { brand: "Conforama", staff: 300 }
    ]
  },
  {
    city: "Washington DC",
    data: [
      { brand: "Castorama", staff: 20 },
      { brand: "Ikéa", staff: 20 },
      { brand: "Conforama", staff: 360 }
    ]
  }
];


  function App () {
    const [mydata, updatemydata] = useState(myData);

    function handleOnDragEnd(result) {

      if (!result.destination) return;
      if(result.source.index > result.destination.index) return; // handle direction

      const items = Array.from(mydata);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
     
      updatemydata(items);
    }

    return (
      <div className="App">
          <header className="App-header">
            <h1>SustainEcho Technical Test</h1>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="mydata">
                {(provided) => (
                  <ul
                    className="mydata"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {mydata.map(({ city, data }, index) => {
                      return (
                        <Draggable
                          key={city}
                          draggableId={city}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="capitol">{city}</div>
                              <div className="childs">
                                {data.map((d) => (
                                  <div className="data">
                                    <div className="singleChild"> <p>{d.brand}</p> </div>
                                    <div className="singleChild"> <p>{d.staff}</p>  </div>
                                  </div>
                                ))}
                              </div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </header>
      </div>
    )

   }

 
export default App;
