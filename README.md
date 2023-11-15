# Color Palette Extractor

Color Palette Extractor is a React single page application that allows users to upload an image and extract the color palette from it. It displays a grid of HEX color codes corresponding to the extracted colors.

## Installation and Usage

To run the Color Palette Extractor locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/CireWire/stunning-octo-telegram.git
   ```

2. Navigate to the project directory:

   ```bash
   cd color-palette-extractor
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to access the Color Palette Extractor.

## Using Docker

Alternatively, you can use Docker to containerize and run the Color Palette Extractor:

1. Build the Docker image:

   ```bash
   docker build -t color-palette-extractor .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 80:80 color-palette-extractor
   ```

3. Open your browser and visit `http://localhost` to access the Color Palette Extractor.

## Dependencies

The Color Palette Extractor project relies on the following dependencies:

- react
- react-dom
- react-scripts
- colorthief
- ...

Please refer to the `package.json` file for a complete list of dependencies.

## License

This project is licensed under the [MIT License](LICENSE).
