class Fondo {
    constructor() {
      this.colores = [
        [188, 18, 50],   // Rojo
        [88,145,30],   // Verde
        [39, 107, 123],   // celeste
        [	188, 88, 18], // naranja
        [147,154,47],
        [121,75,73],
        [24,48,81],
        // Agrega más colores si lo deseas
      ];
      this.colorSeleccionado = null; // Color seleccionado
    }
  
    seleccionarColorAleatorio() {
      if (!this.colorSeleccionado) {
        const indice = Math.floor(Math.random() * this.colores.length);
        this.colorSeleccionado = this.colores[indice];
      }
      return this.colorSeleccionado;
    }
  }