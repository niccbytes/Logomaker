export function generateSVG({ text, textColor, shape, shapeColor }) {
  // Generate the SVG content based on user inputs
  let svgContent = '';

  if (shape === 'circle') {
    // Generate circle SVG content
    svgContent = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="50%" fill="${shapeColor}" />
        <text x="50%" y="50%" font-size="48" text-anchor="middle" dy=".3em" fill="${textColor}">${text}</text>
      </svg>
    `;
  } else if (shape === 'triangle') {
    // Generate triangle SVG content
    svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,50 100,150 200,150" fill="${shapeColor}" />
        <text x="50%" y="60%" font-size="36" text-anchor="middle" dy=".3em" fill="${textColor}">${text}</text>
      </svg>
    `;
  } else if (shape === 'square') {
    // Generate square SVG content
    svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${shapeColor}" />
        <text x="50%" y="50%" font-size="48" text-anchor="middle" dy=".3em" fill="${textColor}">${text}</text>
      </svg>
    `;
  }

  return svgContent;
}