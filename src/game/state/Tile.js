export default class Tile {
  static TERRAIN_MOUNTAINS = {
    icon: 'icons/lorc/originals/svg/mountains.svg',
    description: 'Mountains'
  };
  static TERRAIN_PLAINS = {
    icon: 'icons/delapouite/originals/svg/forest.svg',
    description: 'Forest'
  };
  static TERRAIN_WATER = {
    icon: 'icons/sbed/originals/svg/water-drop.svg',
    description: 'Water'
  };
  static TERRAIN_VALLEY = {
    icon: 'icons/lorc/originals/svg/valley.svg',
    description: 'Valley'
  };

  static TERRAIN_ENUM = [
    Tile.TERRAIN_MOUNTAINS,
    Tile.TERRAIN_PLAINS,
    Tile.TERRAIN_WATER,
    Tile.TERRAIN_VALLEY
  ];

  constructor(x, y, type, contents) {
    this.x = x;
    this.y = y;

    // randomized terrain
    this.terrain = type ? Tile.TERRAIN_ENUM[type] : Tile.TERRAIN_ENUM[Math.floor(Math.random() * 4)];
    if (contents) {
      this.contents = contents;
    }

    this.revealed = false;
  }

  nearby(x, y) {
    if (Math.abs(this.x - x) < 2 &&
        Math.abs(this.y - y) < 2) {
      this.revealed = true;
    }
  }

  display() {
    if (this.contents) {
      return this.contents.display();
    } else {
      return this.terrain.icon;
    }
  }

  describe() {
    return this.terrain.description;
  }

}