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
    items.forEach((item) => {
      itemsDisplay.appendChild(itemCard(item, type));
    });
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
