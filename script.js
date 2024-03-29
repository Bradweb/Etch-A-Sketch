
		// Get the container element
		const container = document.getElementById('container');

		// Get the new grid button element
		const newGridBtn = document.getElementById('new-grid-btn');

		// Add event listener to the new grid button
		newGridBtn.addEventListener('click', createNewGrid);

		// Create initial 16x16 grid of square divs
		createGrid(16);

		// Function to create a new grid with user specified number of squares per side
		function createNewGrid() {
			// Prompt user for number of squares per side, limit to 100
			let numSquaresPerSide = prompt('Enter the number of squares per side for the new grid (maximum 100):');
			numSquaresPerSide = Math.min(100, parseInt(numSquaresPerSide));

			// Remove existing grid
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}

			// Create new grid with user specified number of squares per side
			createGrid(numSquaresPerSide);
		}

		// Function to create grid with specified number of squares per side
		function createGrid(numSquaresPerSide) {
			// Set grid dimensions based on number of squares per side
			container.style.gridTemplateColumns = `repeat(${numSquaresPerSide}, 1fr)`;
			container.style.gridTemplateRows = `repeat(${numSquaresPerSide}, 1fr)`;

			// Create new grid of square divs
			for (let i = 0; i < numSquaresPerSide; i++) {
				for (let j = 0; j < numSquaresPerSide; j++) {
					// Create a new div element
					const div = document.createElement('div');

					// Set the class name of the div to "square"
					div.className = 'square';

					function getRandomRgb() {
						const r = Math.floor(Math.random() * 256);
						const g = Math.floor(Math.random() * 256);
						const b = Math.floor(Math.random() * 256);
						return { r, g, b };
					}

					// Variables para hacer seguimiento del número de pases y la cantidad de negro añadida
					let numPasses = 0;
					let blackPercentage = 0;

					// Función para calcular el nuevo color basado en el número de pases y la cantidad de negro añadida
					function getNewColor() {
						const color = getRandomRgb();
						const black = Math.floor(blackPercentage / 10 * 255);
						const r = Math.floor(color.r * (1 - blackPercentage / 10) + black);
						const g = Math.floor(color.g * (1 - blackPercentage / 10) + black);
						const b = Math.floor(color.b * (1 - blackPercentage / 10) + black);
						return `rgb(${r}, ${g}, ${b})`;
					}



					// Evento para cambiar el color del cuadrado a un valor RGB aleatorio en cada pasada del mouse
					div.addEventListener('mouseover', () => {
						const color = getNewColor();
						div.style.backgroundColor = color;
						numPasses++;
						blackPercentage = Math.min(10, numPasses);
					});

					// Evento para volver el color del cuadrado a RGB aleatorio cuando el mouse sale del mismo
					div.addEventListener('mouseout', () => {
						const color = getNewColor();
						div.style.backgroundColor = color;
						numPasses++;
						blackPercentage = Math.min(10, numPasses);
					});
					// Append the div to the container element
					container.appendChild(div);
				}
			}
		}


