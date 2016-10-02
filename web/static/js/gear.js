class Gear {
  constructor(f, id, direction, angle) {
    this.element = f.select(`#${id}`);
    this.id = id;
    this.direction = direction;
    this.angle = angle;
    this.angleTurn = this.angle * this.direction;
    this.bbox = this.element.getBBox();
    this.rotate = false;
  }

  rotateGear() {
    if (!this.rotate) {
      return;
    }

    this.element.transform(`r0,${this.bbox.cx},${this.bbox.cy}`);
    this.element.animate({ transform: `r${this.angleTurn},${this.bbox.cx},${this.bbox.cy}` }, 8000, mina.linear, this.rotateGear.bind(this));
  }

  start() {
    this.rotate = true;
    this.rotateGear();

    return this;
  }

  stop() {
    this.rotate = false;
  }
}

export default Gear;
