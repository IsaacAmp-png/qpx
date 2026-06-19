// Variables para los elementos del DOM
let emailInput, passwordInput, loginBtn;
let state = "login"; // Estados: "login" o "denied"

// Paleta de colores (demostracion)
const fbBlue = '#1877f2';
const bgColor = '#f0f2f5';
const fbGreen = '#42b72a';

// Glitch del error 403
let glitchOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Formulario
  let formX = width / 2 + 100;
  let formY = height / 2 - 150;
  
  // AjustE
  if (width < 850) {
    formX = width / 2 - 180;
    formY = height / 2;
  }

  // Email
  emailInput = createInput('');
  emailInput.attribute('placeholder', 'Correo electrónico o número de teléfono');
  emailInput.size(330, 45);
  emailInput.position(formX + 15, formY + 20);
  emailInput.style('font-size', '16px');
  emailInput.style('padding', '10px 15px');
  emailInput.style('border', '1px solid #ddd');
  emailInput.style('border-radius', '6px');
  emailInput.style('outline', 'none');

  // Contraseña
  passwordInput = createInput('');
  passwordInput.attribute('type', 'password');
  passwordInput.attribute('placeholder', 'Contraseña');
  passwordInput.size(330, 45);
  passwordInput.position(formX + 15, formY + 80);
  passwordInput.style('font-size', '16px');
  passwordInput.style('padding', '10px 15px');
  passwordInput.style('border', '1px solid #ddd');
  passwordInput.style('border-radius', '6px');
  passwordInput.style('outline', 'none');

  // Iniciar Sesión
  loginBtn = createButton('Iniciar sesión');
  loginBtn.size(360, 50);
  loginBtn.position(formX + 15, formY + 145);
  loginBtn.style('background-color', fbBlue);
  loginBtn.style('color', 'white');
  loginBtn.style('font-size', '20px');
  loginBtn.style('font-weight', 'bold');
  loginBtn.style('border', 'none');
  loginBtn.style('border-radius', '6px');
  loginBtn.style('cursor', 'pointer');
  
  // Efecto
  loginBtn.mouseOver(() => loginBtn.style('background-color', '#166fe5'));
  loginBtn.mouseOut(() => loginBtn.style('background-color', fbBlue));
  
  // Asignar evento al clic
  loginBtn.mousePressed(triggerAccessDenied);
}

function draw() {
  if (state === "login") {
    drawLoginScreen();
  } else if (state === "denied") {
    drawErrorScreen();
  }
}

function drawLoginScreen() {
  background(bgColor);
  textFont('Helvetica, Arial, sans-serif');

  let formX = width / 2 + 100;
  let formY = height / 2 - 150;
  let formW = 390;
  let formH = 340;
  
  let logoX = width / 2 - 400;
  let logoY = height / 2 - 50;

  // Ajustes para pantallas pequeñas
  if (width < 850) {
    formX = width / 2 - formW / 2;
    formY = height / 2;
    logoX = width / 2;
    logoY = height / 2 - 120;
    textAlign(CENTER, CENTER);
  } else {
    textAlign(LEFT, CENTER);
  }

  //LOGO
  textSize(80);
  textStyle(BOLD);
  fill(fbBlue);
  // Replicamos el estilo visual con el nombre de tu obra
  text("Qpx", logoX, logoY);

  // SUBTÍTU
  if (width >= 850) {
    textSize(28);
    fill(0);
    textStyle(NORMAL);
    textLeading(32);
    text("Ponte en onda y enterate de todo en QPX.", logoX, logoY + 65);
  }

  //FORMULARIO
  fill(255);
  stroke(221, 223, 226); // Color del borde de FB
  strokeWeight(1);
  rect(formX, formY, formW, formH, 8); // Radio de borde de 8px

  // Línea divisoria
  stroke(221, 223, 226);
  line(formX + 15, formY + 230, formX + formW - 15, formY + 230);

  //TEXTOS ADICIONALES (FAKE BUTTONS)
  noStroke();
  
  //Olvidaste tu contraseña
  fill(fbBlue);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("¿Olvidaste tu contraseña?", formX + formW / 2, formY + 210);

  // Crear cuenta nueva
  fill(fbGreen);
  rectMode(CENTER);
  rect(formX + formW / 2, formY + 285, 190, 45, 6);
  
  fill(255);
  textStyle(BOLD);
  textSize(17);
  text("Crear cuenta nueva", formX + formW / 2, formY + 285);
  
  // rectMode (no afectar otros dibujos)
  rectMode(CORNER);
}

function drawErrorScreen() {
  // Fondoparpadea 
  background(random(100, 255), 0, 0);  
  
  // estático
  loadPixels();
  for (let i = 0; i < pixels.length; i += 16) {
    let noiseVal = random(255);
    pixels[i] = noiseVal;     // R
    pixels[i+1] = 0;          // G
    pixels[i+2] = 0;          // B
    pixels[i+3] = random(150); // Alpha
  }
  updatePixels();

  // Texto Glitch principal
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  
  glitchOffset = random(-10, 10);
  
  textSize(100);
  fill(255);
  text("ERROR 403", (width / 2) + glitchOffset, (height / 2) - 50);
  
  textSize(40);
  fill(0);
  text("ACCESO DENEGADO", (width / 2) - glitchOffset, (height / 2) + 20);
  
  textSize(20);
  fill(255);
  text("ESTO ES UNA PRUEBA JIJIJI", width / 2, height / 2 + 100);
}

// inicio DE LA OBRA
function triggerAccessDenied() {
  // Ocultamos los inputs de HTML
  emailInput.hide();
  passwordInput.hide();
  loginBtn.hide();
  
  // bucle TEST
  state = "denied";
  
  //AQUI VA LA OBRA
  // SOLICITAR la webcam y solicitan permisos de micrófono.
}

// Para asegurar que los elementos se mantengan alineados si se cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (state === "login") {
    // Recargar para reposicionar los elementos DOM 
    window.location.reload(); 
  }
}