import TileEntity from './TileEntity';
export default class Player extends TileEntity {
   constructor(name, startX, startY) {
       super('P');
       this.name = name;
       this.y = startY;
       this.x = startX;
    }
}