class GeneradorDeFrases extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(plantilla.content.cloneNode(true));

    this.frases = [
      { texto: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", autor: "Robert Collier" },
      { texto: "No cuentes los días, haz que los días cuenten.", autor: "Muhammad Ali" },
      { texto: "Cree que puedes y ya estás a medio camino.", autor: "Theodore Roosevelt" },
      { texto: "La vida es 10% lo que te ocurre y 90% cómo respondes a ello.", autor: "Charles R. Swindoll" },
      { texto: "El único modo de hacer un gran trabajo es amar lo que haces.", autor: "Steve Jobs" },
    ];

    this.elementoFrase = this.shadowRoot.getElementById('frase');
    this.elementoAutor = this.shadowRoot.getElementById('autor');
    this.boton = this.shadowRoot.getElementById('botonNuevaFrase');
  }

  connectedCallback() {
    this.mostrarFrase();
    this.boton.addEventListener('click', () => this.mostrarFrase());
  }

  mostrarFrase() {
    const aleatorio = this.frases[Math.floor(Math.random() * this.frases.length)];
    this.elementoFrase.textContent = `"${aleatorio.texto}"`;
    this.elementoAutor.textContent = `– ${aleatorio.autor}`;
  }
}

const plantilla = document.createElement('template');
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      max-width: 400px;
      margin: auto;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #ece9e6, #ffffff);
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      padding: 2em;
      box-sizing: border-box;
      transition: all 0.3s ease-in-out;
    }

    :host([tema="oscuro"]) {
      background: linear-gradient(135deg, #1e1e2f, #2a2a3d);
      color: #f0f0f0;
    }

    ::slotted(span) {
      font-size: 1.4em;
      font-weight: bold;
      color: #444;
    }

    :host([tema="oscuro"]) ::slotted(span) {
      color: #ffc107;
    }

    blockquote {
      font-style: italic;
      font-size: 1.2em;
      margin: 1em 0;
      color: inherit;
    }

    cite {
      display: block;
      text-align: right;
      font-size: 0.9em;
      color: inherit;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.6em 1.2em;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      margin-top: 1em;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    :host([tema="oscuro"]) button {
      background-color: #ffc107;
      color: #333;
    }

    :host([tema="oscuro"]) button:hover {
      background-color: #e0a800;
    }
  </style>

  <slot name="titulo"></slot>
  <blockquote id="frase">"Aquí aparecerá una frase motivacional."</blockquote>
  <cite id="autor">– Autor</cite>
  <button id="botonNuevaFrase">Nueva frase</button>
`;


customElements.define('generador-de-frases', GeneradorDeFrases);
