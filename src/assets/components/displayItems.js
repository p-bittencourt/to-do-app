import displayCard from '../util/displayCard';

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
  // const completedItems = items.filter((item) => item.completed == true);
  const completedItemsDisplay = document.createElement('div');
  completedItemsDisplay.classList.add('completed-items-display');
  const h3 = document.createElement('h3');
  const title = type.charAt(0).toUpperCase() + type.slice(1);
  h3.textContent = `Completed ${title}`;
  completedItemsDisplay.appendChild(h3);

  items.forEach((item) => {
    completedItemsDisplay.appendChild(completedItemCard(item));
  });

  return completedItemsDisplay;
};

const completedItemCard = (item) => {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('completed-item-card');
  itemDiv.id = item.id;
  itemDiv.innerHTML = `
  <div class="task-title">
    <h5>${item.title}</h5>
  </div>
  <div class="task-description">
    <p class>${item.description}</p>
  </div>`;

  return itemDiv;
};
