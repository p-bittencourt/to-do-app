import {
  displayCard,
  completedItemCard,
  displayNoteCard,
} from '../util/displayCard';

// Creates the itemsDisplay div
export default function displayItems(items, type) {
  const itemsDisplay = document.createElement('div');
  itemsDisplay.classList.add('items-display');
  const h3 = document.createElement('h3');
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  h3.textContent = title;
  itemsDisplay.appendChild(h3);

  // If there are no items to display
  if (items.length == 0) {
    const p = document.createElement('p');
    p.textContent = `No ${type} to display`;
    itemsDisplay.appendChild(p);
  } else {
    // Display not completed items
    const notCompletedItems = items.filter((item) => item.completed == false);
    notCompletedItems.forEach((item) => {
      itemsDisplay.appendChild(itemCard(item, type));
    });
  }

  // Create completed items display if there are any
  const completedItems = items.filter((item) => item.completed == true);
  if (completedItems.length > 0) {
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-primary');
    toggleButton.textContent = 'Show Completed';
    itemsDisplay.appendChild(toggleButton);
    itemsDisplay.appendChild(displayCompletedItems(completedItems, type));
    toggleButton.addEventListener('click', () => {
      const completedItemsDisplay = document.getElementById(
        'completedItemsDisplay'
      );
      completedItemsDisplay.classList.toggle('hide');
    });
  }

  return itemsDisplay;
}

// Item card creates the outer div for each item
const itemCard = (item, type) => {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('card');
  itemDiv.id = item.id;

  // Appends the displayCard to the outer div
  if (type == 'notes') {
    itemDiv.appendChild(displayNoteCard(item));
  } else {
    itemDiv.appendChild(displayCard(item, type));
  }
  return itemDiv;
};

// Creates the display for created items
// It starts hidden
const displayCompletedItems = (items, type) => {
  const completedItemsDisplay = document.createElement('div');
  completedItemsDisplay.id = 'completedItemsDisplay';
  completedItemsDisplay.classList.add(
    'completed-items-display',
    'text-center',
    'hide'
  );
  const h3 = document.createElement('h3', 'mb-2');
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  h3.textContent = `Completed ${title}`;
  completedItemsDisplay.appendChild(h3);
  const completedItemsDiv = document.createElement('div');
  completedItemsDiv.classList.add('completed-items');
  completedItemsDisplay.appendChild(completedItemsDiv);

  // Adds each completed item to the display
  items.forEach((item) => {
    completedItemsDiv.appendChild(completedItemCard(item));
  });

  return completedItemsDisplay;
};
