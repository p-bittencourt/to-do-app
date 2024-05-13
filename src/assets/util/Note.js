import { v4 } from 'uuid';

export default class Note {
  constructor(title, description) {
    this.id = v4();
    this.title = title;
    this.description = description;
    this.completed = false;
  }
}
