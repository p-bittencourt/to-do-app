import { displayCard, completedItemCard } from '../util/displayCard';

export default function displayItems(items, type) {
  const itemsDisplay = document.createElement('div');
  itemsDisplay.classList.add('items-display');
  const h3 = document.createElement('h3');
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  h3.textContent = title;
  itemsDisplay.appendChild(h3);

  if (items.length == 0) {
    const p = document.createElement('p');
    p.textContent = `No ${type} to display`;
    itemsDisplay.appendChild(p);
  } else {
    const notCompletedItems = items.filter((item) => item.completed == false);
    notCompletedItems.forEach((item) => {
      itemsDisplay.appendChild(itemCard(item, type));
    });
  }

  const completedItems = items.filter((item) => item.completed == true);
  if (completedItems.length > 0) {
    itemsDisplay.appendChild(displayCompletedItems(completedItems, type));
  }

  return itemsDisplay;
}

const itemCard = (item, type) => {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('card');
  itemDiv.id = item.id;

  itemDiv.appendChild(displayCard(item, type));
  return itemDiv;
};

const displayCompletedItems = (items, type) => {
  const completedItemsDisplay = document.createElement('div');
  completedItemsDisplay.classList.add(
    'completed-items-display',
    'text-center',
    'mt-5'
  );
  const h3 = document.createElement('h3', 'mb-2');
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  h3.textContent = `Completed ${title}`;
  completedItemsDisplay.appendChild(h3);
  const completedItemsDiv = document.createElement('div');
  completedItemsDiv.classList.add('completed-items');
  completedItemsDisplay.appendChild(completedItemsDiv);

  items.forEach((item) => {
    completedItemsDiv.appendChild(completedItemCard(item));
  });

  return completedItemsDisplay;
};
