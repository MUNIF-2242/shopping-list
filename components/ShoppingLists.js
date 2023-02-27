import React, { useEffect, useState } from 'react';
import ShoppingListsItem from './ShoppingListsItem';
import classes from '../styles/ShoppingLists.module.css';

function ShoppingLists() {
  const [data, setData] = useState();

  const sendRequest = () => {
    fetch('/api/shopping-lists')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <div>
      <ul className={classes.listContainer}>
        {data &&
          data.map((item, index) => (
            <ShoppingListsItem key={index} title={item.title} />
          ))}
      </ul>
    </div>
  );
}

export default ShoppingLists;
