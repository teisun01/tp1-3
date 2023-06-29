class Cuad {
  constructor() {
    this.size = 60;
    this.color;
    this.colorInicial = color(0, 0, 255);
    this.colorFinal = color(255, 255, 0);
    this.colordiag = 100;
    this.colorPalette = [
      [222, 209, 68],    // #ded144
      [33, 111, 139],    // #216f8b
      [220, 123, 21],    // #dc7b15
      [77, 113, 121],    // #4d7179
      [107, 158, 178],   // #6b9eb2
      [206, 227, 222],   // #cee3de
      [187, 84, 19],     // #bb5413
      [37, 53, 25],      // #253519
      [141, 153, 56],    // #8d9938
      [76, 73, 57],      // #4c4939
      [123, 77, 81],     // #7b4d51
      [113, 20, 21],     // #711415
      [227, 151, 158],   // #e3979e
      [145, 156, 131],   // #919c83
      [36, 156, 207],    // #249ccf
      [126, 121, 50],    // #7e7932
      [143, 55, 17],     // #8f3711
      [181, 26, 13],     // #b51a0d
      [185, 166, 32],    // #b9a620
      [158, 155, 17],    // #9e9b11
      [53, 95, 80],      // #355f50
      [223, 155, 122],   // #df9b7a
      [110, 72, 45],     // #6e482d
      [205, 27, 18],     // #cd1b12
      [96, 72, 82],      // #604852
      [166, 157, 46],    // #a69d2e
      [135, 190, 150],   // #87be96
      [183, 110, 77]     // #b76e4d
      // Agrega más colores si lo deseas
    ];
    
  }

  dibujar() {
    for (let boxW = width; boxW > 0; boxW -= (this.size + 15)) {
      for (let boxH = height; boxH > 0; boxH -= (this.size + 15)) {
        const posX = width - boxW + 8;
        const posY = height - boxH + 8;
        this.dibujarCuadro(posX, posY);
      }
    }
  }

  dibujarCuadro(posX, posY) {
    const randomColor = random(this.colorPalette); // Selecciona un color aleatorio de la paleta

    tint(randomColor[0], randomColor[1], randomColor[2]);
    image(cuadimg, posX, posY, this.size, this.size);

    const inSize = random(15, this.size);

    if (random(0, 1) > 0.7) {
      push();
      const randomColor = random(this.colorPalette); // Selecciona un color aleatorio de la paleta
      tint(randomColor[0], randomColor[1], randomColor[2]);
      translate(posX + this.size / 2, posY + this.size / 2);
      const rotation = random([0, HALF_PI, PI, -HALF_PI]);
      rotate(rotation);
      image(diagimg, -this.size / 2, -this.size / 2, this.size, this.size);
      pop();
    } else {
      push();
      const randomColor = random(this.colorPalette); // Selecciona un color aleatorio de la paleta
      tint(randomColor[0], randomColor[1], randomColor[2]);
      translate(posX + this.size / 2, posY + this.size / 2);
      const rotation = random([0, HALF_PI, PI, -HALF_PI]);
      rotate(rotation);
      image(rectimg, -this.size / 2, -this.size / 2, this.size, this.size);
      pop();
    }

    if (random(0, 1) > 0.9) {
      push();
      const randomColor = random(this.colorPalette);
      tint(randomColor[0], randomColor[1], randomColor[2]);
      image(cuad1, posX, posY, this.size, this.size);
      pop();
    }

    if (random(0, 5) < 0.2) {
      push();
      translate(posX + this.size / 2, posY + this.size / 2);
      const rotation = random([0, HALF_PI, PI, -HALF_PI]);
      rotate(rotation);
      const randomColor = random(this.colorPalette);
      tint(random(256), random(256), random(256, 20));
      image(cuad2, -this.size / 2, -this.size / 2, this.size, this.size);
      pop();
    } else if (random(0, 7) < 0.1) {
      push();
      translate(posX + this.size / 2, posY + this.size / 2);
      const rotation = random([0, HALF_PI, PI, -HALF_PI]);
      rotate(rotation);
      tint(255);
      image(cuad2, -this.size / 2, -this.size / 2, this.size, this.size);
      pop();
    } else if (random(0, 10) < 0.1) {
      push();
      translate(posX + this.size / 2, posY + this.size / 2);
      const rotation = random([0, HALF_PI, PI, -HALF_PI]);
      rotate(rotation);
      const randomColor = random(this.colorPalette);
      const [tintR, tintG, tintB] = randomColor; // Obtén los valores RGB del color aleatorio
      tint(tintR, tintG, tintB);
      image(diagimg, -this.size / 2, -this.size / 2, this.size, this.size);
      pop();
    }

    if (random(0, 8) < 0.3) {
      push();
      const randomColor = random(this.colorPalette);
      tint(randomColor[0], randomColor[1], randomColor[2]);
      image(cuad3, posX, posY, this.size, this.size);
      pop();
    } else if (random(0, 5) < 0.2) {
      push();
      const randomColor = random(this.colorPalette);
      tint(randomColor[0], randomColor[1], randomColor[2]);
      image(cuad4, posX, posY, this.size, this.size);
      pop();
    } else if (random(0, 6) < 0.2) {
      push();
      const randomColor = random(this.colorPalette);
      tint(randomColor[0], randomColor[1], randomColor[2]);
      image(cuad5, posX, posY, this.size, this.size);
      pop();
    }
  }
}