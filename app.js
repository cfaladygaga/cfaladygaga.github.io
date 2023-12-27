$(document).ready(function() {
  const canvas = document.getElementById('whiteboard');
  const ctx = canvas.getContext('2d');
  const colorPicker = document.getElementById('colorPicker');
  const alphaSlider = document.getElementById('alphaSlider'); // Added alpha slider
  const clearCanvasBtn = document.getElementById('clearCanvas');
  const saveImageBtn = document.getElementById('saveImage');
  const rainbowModeBtn = document.getElementById('rainbowModeBtn');
  
  let painting = false;
  let rainbowMode = false;
  let isDragging = false;
  const undoStack = [];
  
  // Load the background image
  const backgroundImage = new Image();
  backgroundImage.src = 'Resources/bw.jpg';
  backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  };

  function startPosition(e) {
    painting = true;
    draw(e);
  }
  
  function endPosition() {
    painting = false;
    ctx.beginPath();
    if (!isDragging) {
      undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
    isDragging = false;
  }
  
  function draw(e) {
    if (!painting) return;
  
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
  
    if (rainbowMode) {
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else {
      // Get RGBA color values from the color picker and alpha slider
      const rgbaColor = hexToRGBA(colorPicker.value, alphaSlider.value / 100);
      ctx.strokeStyle = rgbaColor;
    }
  
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  
    isDragging = true;
  }
  
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack.length = 0;
    // Redraw the background image when clearing the canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }
  
  function saveImage() {
    // Save the current canvas content
    const drawingImage = new Image();
    drawingImage.src = canvas.toDataURL('image/png');

    // Create a new canvas to merge the background and drawing
    const mergedCanvas = document.createElement('canvas');
    const mergedCtx = mergedCanvas.getContext('2d');

    // Set the merged canvas size to match the original canvas
    mergedCanvas.width = canvas.width;
    mergedCanvas.height = canvas.height;

    // Draw the background on the merged canvas
    mergedCtx.drawImage(backgroundImage, 0, 0, mergedCanvas.width, mergedCanvas.height);

    // Draw the saved drawing on the merged canvas
    drawingImage.onload = function() {
      mergedCtx.drawImage(drawingImage, 0, 0);
      
      // Save the merged image
      const mergedImage = mergedCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = mergedImage;
      link.download = 'merged_drawing.png';
      link.click();
    };
  }
  
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);
  
  clearCanvasBtn.addEventListener('click', clearCanvas);
  saveImageBtn.addEventListener('click', saveImage);
  
  // Function to toggle rainbow mode
  function toggleRainbowMode() {
    rainbowMode = !rainbowMode;
  
    if (rainbowMode) {
      rainbowModeBtn.classList.add('active');
    } else {
      rainbowModeBtn.classList.remove('active');
    }
  }
  
  rainbowModeBtn.addEventListener('click', toggleRainbowMode);

  // Helper function to convert HEX to RGBA
  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
});
