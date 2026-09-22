/**
 * SCENE.JS - Motor de Renderizado Cinematográfico de Alta Calidad
 * Representa un campo espectacular, frondoso y hermoso de flores amarillas:
 * Girasoles radiantes, rosas doradas silvestres, cosmos de pétalos delicados
 * y flores florecientes con tallos y hojas botánicas detalladas frente al mar.
 */

class RomanticScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.time = 0;
    this.lastTimestamp = 0;

    // Viento orgánico
    this.wind = {
      base: 0.8,
      gust: 0,
      targetGust: 0
    };

    // Parallax
    this.parallax = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0
    };

    // Sprites pre-renderizados de flores de alta fidelidad estética
    this.flowerSprites = [];

    // Colecciones del mundo
    this.flowers = [];
    this.particles = [];
    this.petals = [];
    this.leafClusters = [];

    this.introProgress = 0;
    this.celebrationActive = false;

    this.init();
  }

  init() {
    this.createFlowerSprites();
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // Parallax
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      this.parallax.targetX = normX * 28;
      this.parallax.targetY = normY * 16;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = (touch.clientY / window.innerHeight) * 2 - 1;
        this.parallax.targetX = normX * 18;
        this.parallax.targetY = normY * 10;
      }
    }, { passive: true });

    this.generateWorld();
    requestAnimationFrame((ts) => this.render(ts));
  }

  // -------------------------------------------------------------------
  // GENERADOR DE SPRITES BOTÁNICOS DE ALTA BELLEZA
  // Crea flores con pétalos en capas, sombras, núcleos aterciopelados
  // y reflejos de luz de atardecer.
  // -------------------------------------------------------------------
  createFlowerSprites() {
    this.flowerSprites = [
      this.renderSunflowerSprite(160, '#ffca28', '#ff9800'), // Girasol dorado
      this.renderSunflowerSprite(160, '#fff176', '#f57f17'), // Girasol limón
      this.renderRoseSprite(160, '#ffe082', '#ffb300'),      // Rosa amarilla de jardín
      this.renderRoseSprite(160, '#fff59d', '#ffa000'),      // Peonía crema dorada
      this.renderCosmosSprite(140, '#ffd54f', '#f57c00'),    // Flor silvestre / Cosmos
      this.renderCosmosSprite(140, '#fff9c4', '#e65100'),    // Margarita dorada brillante
      this.renderBloomingTulipSprite(150, '#ffca28', '#e65100'), // Tulipán florecido abierto
      this.renderBloomingTulipSprite(150, '#fff176', '#f57c00')  // Tulipán dorado cálido
    ];
  }

  // SPRITE 1: Girasol Radiante con pétalos dorados en abanico y centro aterciopelado
  renderSunflowerSprite(size, lightColor, deepColor) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.46;

    // 1. Capa de pétalos traseros (18 pétalos más oscuros)
    ctx.save();
    ctx.translate(cx, cy);
    const petalCount = 18;
    for (let i = 0; i < petalCount; i++) {
      ctx.rotate((Math.PI * 2) / petalCount);
      ctx.beginPath();
      ctx.moveTo(0, -radius * 0.28);
      ctx.quadraticCurveTo(radius * 0.18, -radius * 0.65, 0, -radius);
      ctx.quadraticCurveTo(-radius * 0.18, -radius * 0.65, 0, -radius * 0.28);
      const grad = ctx.createLinearGradient(0, -radius * 0.28, 0, -radius);
      grad.addColorStop(0, deepColor);
      grad.addColorStop(0.7, lightColor);
      grad.addColorStop(1, '#fff9c4');
      ctx.fillStyle = grad;
      ctx.fill();
    }
    ctx.restore();

    // 2. Capa de pétalos delanteros (18 pétalos intercalados, más brillantes)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((Math.PI * 2) / (petalCount * 2)); // Desfase
    for (let i = 0; i < petalCount; i++) {
      ctx.rotate((Math.PI * 2) / petalCount);
      ctx.beginPath();
      ctx.moveTo(0, -radius * 0.26);
      ctx.quadraticCurveTo(radius * 0.16, -radius * 0.6, 0, -radius * 0.94);
      ctx.quadraticCurveTo(-radius * 0.16, -radius * 0.6, 0, -radius * 0.26);
      const grad = ctx.createLinearGradient(0, -radius * 0.26, 0, -radius * 0.94);
      grad.addColorStop(0, deepColor);
      grad.addColorStop(0.4, lightColor);
      grad.addColorStop(0.9, '#ffffff');
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 3;
      ctx.fill();

      // Línea de nervadura central sutil en el pétalo
      ctx.beginPath();
      ctx.moveTo(0, -radius * 0.3);
      ctx.lineTo(0, -radius * 0.85);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // 3. Centro aterciopelado (Disco floral con semillas y polen dorado)
    const centerRadius = radius * 0.36;
    const centerGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, centerRadius);
    centerGrad.addColorStop(0, '#241206');
    centerGrad.addColorStop(0.65, '#3e1e07');
    centerGrad.addColorStop(0.85, '#6a3809');
    centerGrad.addColorStop(1.0, '#d97706');

    ctx.beginPath();
    ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = centerGrad;
    ctx.fill();

    // Corona de polen dorado brillante alrededor del centro
    for (let a = 0; a < Math.PI * 2; a += 0.35) {
      const px = cx + Math.cos(a) * (centerRadius * 0.85);
      const py = cy + Math.sin(a) * (centerRadius * 0.85);
      ctx.beginPath();
      ctx.arc(px, py, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ffeb3b';
      ctx.fill();
    }

    return canvas;
  }

  // SPRITE 2: Rosa Amarilla / Peonía Silvestre (Pétalos en espiral envolventes y suaves)
  renderRoseSprite(size, lightColor, deepColor) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.44;

    // Capa exterior de pétalos anchos
    ctx.save();
    ctx.translate(cx, cy);
    for (let layer = 0; layer < 4; layer++) {
      const petalsInLayer = 5 + layer * 2;
      const layerRadius = r * (1 - layer * 0.22);
      for (let i = 0; i < petalsInLayer; i++) {
        ctx.rotate((Math.PI * 2) / petalsInLayer + layer * 0.4);
        ctx.beginPath();
        ctx.arc(0, -layerRadius * 0.5, layerRadius * 0.48, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(0, -layerRadius * 0.5, 0, 0, -layerRadius * 0.5, layerRadius * 0.48);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, lightColor);
        grad.addColorStop(1, deepColor);
        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(100, 50, 0, 0.12)';
        ctx.shadowBlur = 4;
        ctx.fill();
      }
    }
    // Centro cálido cerrado
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
    ctx.fillStyle = '#d97706';
    ctx.fill();
    ctx.restore();

    return canvas;
  }

  // SPRITE 3: Cosmos / Flor Silvestre Dorada (Delicada, romántica, pétalos translúcidos)
  renderCosmosSprite(size, lightColor, deepColor) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.45;

    ctx.save();
    ctx.translate(cx, cy);
    const petals = 8;
    for (let i = 0; i < petals; i++) {
      ctx.rotate((Math.PI * 2) / petals);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(r * 0.28, -r * 0.5, r * 0.15, -r);
      // Borde festoneado / con hendiduras suaves en la punta
      ctx.lineTo(0, -r * 0.92);
      ctx.lineTo(-r * 0.15, -r);
      ctx.quadraticCurveTo(-r * 0.28, -r * 0.5, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, 0, -r);
      grad.addColorStop(0, deepColor);
      grad.addColorStop(0.6, lightColor);
      grad.addColorStop(1, '#ffffff');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Centro abultado de polen
    const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.22);
    cg.addColorStop(0, '#ffb300');
    cg.addColorStop(0.7, '#e65100');
    cg.addColorStop(1, '#5d2b02');
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = cg;
    ctx.fill();
    ctx.restore();

    return canvas;
  }

  // SPRITE 4: Tulipán Florecido Abierto y Majestuoso
  renderBloomingTulipSprite(size, lightColor, deepColor) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size * 0.55;
    const fw = size * 0.38;
    const fh = size * 0.48;

    ctx.save();
    ctx.translate(cx, cy);

    // 1. Pétalo posterior en sombra
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-fw * 0.7, -fh * 0.5, -fw * 0.4, -fh * 1.05, 0, -fh * 1.08);
    ctx.bezierCurveTo(fw * 0.4, -fh * 1.05, fw * 0.7, -fh * 0.5, 0, 0);
    ctx.fillStyle = deepColor;
    ctx.fill();

    // 2. Pétalo lateral izquierdo curvado
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-fw * 1.25, -fh * 0.4, -fw * 0.9, -fh * 0.95, -fw * 0.15, -fh * 0.98);
    ctx.bezierCurveTo(-fw * 0.3, -fh * 0.5, 0, -fh * 0.2, 0, 0);
    const leftGrad = ctx.createLinearGradient(-fw, 0, 0, -fh);
    leftGrad.addColorStop(0, deepColor);
    leftGrad.addColorStop(0.5, lightColor);
    leftGrad.addColorStop(1, '#fffde7');
    ctx.fillStyle = leftGrad;
    ctx.fill();

    // 3. Pétalo lateral derecho curvado
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(fw * 1.25, -fh * 0.4, fw * 0.9, -fh * 0.95, fw * 0.15, -fh * 0.98);
    ctx.bezierCurveTo(fw * 0.3, -fh * 0.5, 0, -fh * 0.2, 0, 0);
    const rightGrad = ctx.createLinearGradient(fw, 0, 0, -fh);
    rightGrad.addColorStop(0, deepColor);
    rightGrad.addColorStop(0.5, lightColor);
    rightGrad.addColorStop(1, '#fffde7');
    ctx.fillStyle = rightGrad;
    ctx.fill();

    // 4. Pétalo central frontal redondeado y luminoso
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-fw * 0.75, -fh * 0.35, -fw * 0.6, -fh * 0.95, 0, -fh * 1.02);
    ctx.bezierCurveTo(fw * 0.6, -fh * 0.95, fw * 0.75, -fh * 0.35, 0, 0);
    const frontGrad = ctx.createLinearGradient(0, 0, 0, -fh);
    frontGrad.addColorStop(0, deepColor);
    frontGrad.addColorStop(0.4, lightColor);
    frontGrad.addColorStop(0.85, '#fff9c4');
    frontGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = frontGrad;
    ctx.fill();

    ctx.restore();
    return canvas;
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.generateWorld();
  }

  // -------------------------------------------------------------------
  // POBLAR EL CAMPO CON ABUNDANCIA DE FLORES HERMOSAS
  // -------------------------------------------------------------------
  generateWorld() {
    this.flowers = [];
    this.particles = [];
    this.petals = [];
    this.leafClusters = [];

    const isMobile = this.width < 768;
    const fieldStartY = this.height * 0.46; // El campo inicia a ~46% de la pantalla

    // 1. CAPA LEJANA (Cientos de flores pequeñas que crean la alfombra dorada)
    const farCount = isMobile ? 180 : 340;
    const pad = 100;
    for (let i = 0; i < farCount; i++) {
      const x = (i / farCount) * (this.width + pad * 2) - pad + (Math.random() * 24 - 12);
      const y = fieldStartY + Math.random() * (this.height * 0.16);
      const spriteIdx = Math.floor(Math.random() * this.flowerSprites.length);

      this.flowers.push({
        layer: 3,
        baseX: x,
        baseY: y,
        stemHeight: 18 + Math.random() * 22,
        flowerSize: 14 + Math.random() * 16,
        spriteIdx: spriteIdx,
        swaySpeed: 1.1 + Math.random() * 0.6,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.4 + Math.random() * 0.3,
        stemCurve: (Math.random() - 0.5) * 8,
        stemColor: Math.random() > 0.5 ? '#2e7d32' : '#388e3c'
      });
    }

    // 2. CAPA MEDIA (Flores medianas con tallos y hojas frondosas)
    const midCount = isMobile ? 110 : 200;
    for (let i = 0; i < midCount; i++) {
      const x = (i / midCount) * (this.width + pad * 2) - pad + (Math.random() * 28 - 14);
      const y = fieldStartY + (this.height * 0.12) + Math.random() * (this.height * 0.22);
      const spriteIdx = Math.floor(Math.random() * this.flowerSprites.length);

      this.flowers.push({
        layer: 4,
        baseX: x,
        baseY: y,
        stemHeight: 55 + Math.random() * 50,
        flowerSize: 32 + Math.random() * 28,
        spriteIdx: spriteIdx,
        swaySpeed: 0.85 + Math.random() * 0.4,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.7 + Math.random() * 0.4,
        stemCurve: (Math.random() - 0.5) * 16,
        stemColor: Math.random() > 0.5 ? '#2e7d32' : '#388e3c',
        leafLength: 28 + Math.random() * 24
      });
    }

    // 3. CAPA PRIMER PLANO (Grandes flores protagonistas y detalladas)
    const fgCount = isMobile ? 55 : 105;
    for (let i = 0; i < fgCount; i++) {
      const x = (i / fgCount) * (this.width + pad * 2) - pad + (Math.random() * 34 - 17);
      const y = this.height * 0.72 + Math.random() * (this.height * 0.32);
      const spriteIdx = Math.floor(Math.random() * this.flowerSprites.length);

      this.flowers.push({
        layer: 5,
        baseX: x,
        baseY: y,
        stemHeight: 130 + Math.random() * 110,
        flowerSize: 68 + Math.random() * 45,
        spriteIdx: spriteIdx,
        swaySpeed: 0.65 + Math.random() * 0.3,
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 1.0 + Math.random() * 0.5,
        stemCurve: (Math.random() - 0.5) * 26,
        stemColor: '#2e7d32',
        leafLength: 60 + Math.random() * 45
      });
    }

    // Ordenar rigurosamente por baseY para un solapamiento botánico natural
    this.flowers.sort((a, b) => a.baseY - b.baseY);

    // 4. Racimos de hojas basales en el suelo
    const clusterCount = isMobile ? 24 : 50;
    for (let c = 0; c < clusterCount; c++) {
      this.leafClusters.push({
        x: (c / clusterCount) * (this.width + 120) - 60 + (Math.random() * 20 - 10),
        y: this.height - (c % 4) * (this.height * 0.07) - Math.random() * 15,
        size: 40 + Math.random() * 35
      });
    }

    // 5. Partículas de luz dorada
    const particleCount = isMobile ? 35 : 70;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6,
        speedY: -(0.25 + Math.random() * 0.5),
        speedX: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 1 + Math.random() * 2.2
      });
    }

    // 6. Pétalos flotantes
    const petalCount = isMobile ? 12 : 22;
    for (let i = 0; i < petalCount; i++) {
      this.petals.push(this.createPetal(false));
    }
  }

  createPetal(isBurst = false) {
    return {
      x: isBurst ? (Math.random() * this.width) : (Math.random() * (this.width + 100) - 50),
      y: isBurst ? (this.height + 20) : (Math.random() * this.height),
      size: 9 + Math.random() * 12,
      speedY: isBurst ? -(2.0 + Math.random() * 2.8) : (0.35 + Math.random() * 0.8),
      speedX: 0.7 + Math.random() * 1.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      flipAngle: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.04,
      alpha: 0.5 + Math.random() * 0.45,
      isBurst: isBurst
    };
  }

  triggerCelebration() {
    this.celebrationActive = true;
    const burstCount = this.width < 768 ? 45 : 85;
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        this.petals.push(this.createPetal(true));
      }, i * 28);
    }
  }

  render(timestamp) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    const delta = Math.min((timestamp - this.lastTimestamp) / 1000, 0.1);
    this.lastTimestamp = timestamp;
    this.time += delta;

    // Parallax suave
    this.parallax.currentX += (this.parallax.targetX - this.parallax.currentX) * 0.05;
    this.parallax.currentY += (this.parallax.targetY - this.parallax.currentY) * 0.05;

    // Viento dinámico suave
    if (Math.random() < 0.02) {
      this.wind.targetGust = (Math.random() - 0.2) * 1.5;
    }
    this.wind.gust += (this.wind.targetGust - this.wind.gust) * 0.025;
    const currentWind = this.wind.base + this.wind.gust;

    if (this.introProgress < 1) {
      this.introProgress = Math.min(1, this.introProgress + delta * 0.45);
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    const horizonY = this.height * 0.38 + this.parallax.currentY * 0.12;
    const sunX = this.width * 0.5 + this.parallax.currentX * 0.1;
    const sunY = horizonY - 4;
    const fieldEdgeY = this.height * 0.46 + this.parallax.currentY * 0.18;

    // CAPA 1: CIELO Y SOL
    this.drawSky(horizonY);
    this.drawSun(sunX, sunY);

    // CAPA 2: MAR DETRÁS DEL CAMPO
    this.drawOcean(horizonY, fieldEdgeY, sunX);

    // CAPAS 3, 4, 5: ENORME CAMPO DE FLORES HERMOSAS
    this.drawFlowerField(currentWind, fieldEdgeY);

    // ATMÓSFERA
    this.drawParticles(delta, currentWind);
    this.drawPetals(delta, currentWind);

    requestAnimationFrame((ts) => this.render(ts));
  }

  drawSky(horizonY) {
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0.0, '#0c1122');
    skyGrad.addColorStop(0.24, '#241433');
    skyGrad.addColorStop(0.48, '#682544');
    skyGrad.addColorStop(0.70, '#b8493d');
    skyGrad.addColorStop(0.88, '#ea7635');
    skyGrad.addColorStop(1.0, '#ffd868');

    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.width, horizonY + 2);
  }

  drawSun(sunX, sunY) {
    this.ctx.save();
    const coronaRadius = Math.min(this.width, this.height) * 0.55;
    const coronaGrad = this.ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, coronaRadius);
    coronaGrad.addColorStop(0, 'rgba(255, 220, 120, 0.45)');
    coronaGrad.addColorStop(0.3, 'rgba(245, 140, 60, 0.22)');
    coronaGrad.addColorStop(0.7, 'rgba(210, 70, 45, 0.06)');
    coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = coronaGrad;
    this.ctx.fillRect(0, 0, this.width, sunY + 60);

    const sunRadius = Math.max(38, this.width * 0.042);
    const sunDiscGrad = this.ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
    sunDiscGrad.addColorStop(0, '#ffffff');
    sunDiscGrad.addColorStop(0.3, '#fff6b8');
    sunDiscGrad.addColorStop(0.75, '#ffc73b');
    sunDiscGrad.addColorStop(1, 'rgba(255, 145, 30, 0.9)');

    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = sunDiscGrad;
    this.ctx.shadowColor = 'rgba(255, 215, 80, 0.9)';
    this.ctx.shadowBlur = 35;
    this.ctx.fill();
    this.ctx.restore();
  }

  drawOcean(horizonY, fieldEdgeY, sunX) {
    const seaHeight = fieldEdgeY - horizonY;
    if (seaHeight <= 0) return;

    const seaGrad = this.ctx.createLinearGradient(0, horizonY, 0, fieldEdgeY);
    seaGrad.addColorStop(0, '#2b1d3d');
    seaGrad.addColorStop(0.35, '#1e1c3e');
    seaGrad.addColorStop(0.75, '#131b38');
    seaGrad.addColorStop(1.0, '#0c152a');

    this.ctx.fillStyle = seaGrad;
    this.ctx.fillRect(0, horizonY, this.width, seaHeight + 4);

    this.ctx.save();
    const shimmerWidth = Math.max(80, this.width * 0.24);
    const shimmerGrad = this.ctx.createLinearGradient(sunX - shimmerWidth, 0, sunX + shimmerWidth, 0);
    shimmerGrad.addColorStop(0, 'rgba(255, 190, 70, 0)');
    shimmerGrad.addColorStop(0.5, 'rgba(255, 225, 120, 0.42)');
    shimmerGrad.addColorStop(1, 'rgba(255, 190, 70, 0)');

    this.ctx.fillStyle = shimmerGrad;
    this.ctx.beginPath();
    this.ctx.moveTo(sunX - 25, horizonY);
    this.ctx.lineTo(sunX + 25, horizonY);
    this.ctx.lineTo(sunX + shimmerWidth * 1.3, fieldEdgeY);
    this.ctx.lineTo(sunX - shimmerWidth * 1.3, fieldEdgeY);
    this.ctx.closePath();
    this.ctx.fill();

    const waveCount = 18;
    for (let i = 0; i < waveCount; i++) {
      const prog = i / waveCount;
      const y = horizonY + Math.pow(prog, 1.6) * seaHeight;
      const waveSpan = 40 + prog * shimmerWidth * 2.2;
      const waveOffset = Math.sin(this.time * 1.8 + i * 0.8) * (10 + prog * 20);
      const waveCenterX = sunX + waveOffset;

      this.ctx.beginPath();
      this.ctx.moveTo(waveCenterX - waveSpan, y);
      this.ctx.quadraticCurveTo(waveCenterX, y + Math.sin(this.time * 2.2 + i) * 1.8, waveCenterX + waveSpan, y);
      this.ctx.strokeStyle = `rgba(255, 230, 140, ${0.15 + (1 - prog) * 0.45})`;
      this.ctx.lineWidth = 1 + prog * 2.5;
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  drawFlowerField(wind, fieldEdgeY) {
    // 1. Suelo fértil orgánico
    this.ctx.save();
    const groundGrad = this.ctx.createLinearGradient(0, fieldEdgeY, 0, this.height);
    groundGrad.addColorStop(0, '#1c2813');
    groundGrad.addColorStop(0.25, '#15240f');
    groundGrad.addColorStop(0.7, '#0f1a0b');
    groundGrad.addColorStop(1.0, '#080d05');

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);
    this.ctx.lineTo(0, fieldEdgeY + 8);
    this.ctx.bezierCurveTo(
      this.width * 0.35, fieldEdgeY - 4,
      this.width * 0.7, fieldEdgeY + 12,
      this.width, fieldEdgeY
    );
    this.ctx.lineTo(this.width, this.height);
    this.ctx.closePath();
    this.ctx.fillStyle = groundGrad;
    this.ctx.fill();
    this.ctx.restore();

    const layerParallax = {
      3: 0.05,
      4: 0.12,
      5: 0.22
    };

    const introOffset = (1 - this.introProgress) * 90;

    // 2. Follaje de base y hojas silvestres
    for (let i = 0; i < this.leafClusters.length; i++) {
      const lc = this.leafClusters[i];
      this.drawLeafCluster(lc.x, lc.y + introOffset, lc.size);
    }

    // 3. Dibujar todas las flores hermosas por capas
    for (let i = 0; i < this.flowers.length; i++) {
      const f = this.flowers[i];
      const pOffset = this.parallax.currentX * layerParallax[f.layer];
      const posX = f.baseX + pOffset;
      const posY = f.baseY + introOffset;

      const sway = Math.sin(this.time * f.swaySpeed + f.swayPhase) * (8 * f.swayAmp) + (wind * 10 * f.swayAmp);

      this.drawSingleFlower(posX, posY, f, sway);
    }
  }

  drawLeafCluster(x, y, size) {
    this.ctx.save();
    this.ctx.translate(x, y);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.quadraticCurveTo(-size * 0.6, -size * 0.5, -size * 0.9, -size);
    this.ctx.quadraticCurveTo(-size * 0.3, -size * 0.5, 0, 0);
    this.ctx.fillStyle = '#1c4212';
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.quadraticCurveTo(size * 0.7, -size * 0.55, size * 1.0, -size * 1.1);
    this.ctx.quadraticCurveTo(size * 0.35, -size * 0.5, 0, 0);
    this.ctx.fillStyle = '#26591a';
    this.ctx.fill();

    this.ctx.restore();
  }

  drawSingleFlower(x, y, f, sway) {
    this.ctx.save();
    this.ctx.translate(x, y);

    const tipX = sway + f.stemCurve;
    const tipY = -f.stemHeight;

    // 1. TALLO BOTÁNICO ORGÁNICO
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.quadraticCurveTo(tipX * 0.35, tipY * 0.5, tipX, tipY);

    const stemWidth = f.layer === 3 ? 2 : (f.layer === 4 ? 3.5 : 5.5);
    this.ctx.lineWidth = stemWidth;
    const stemGrad = this.ctx.createLinearGradient(0, 0, tipX, tipY);
    stemGrad.addColorStop(0, '#1b3b12');
    stemGrad.addColorStop(0.6, f.stemColor);
    stemGrad.addColorStop(1, '#5ca63e');
    this.ctx.strokeStyle = stemGrad;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();

    // 2. HOJAS VERDES FRONDOSAS (Capas 4 y 5)
    if (f.layer >= 4 && f.leafLength) {
      const leafSway = sway * 0.4;
      const ll = f.leafLength;

      // Hoja Izquierda
      this.ctx.beginPath();
      this.ctx.moveTo(0, -f.stemHeight * 0.18);
      this.ctx.quadraticCurveTo(-ll * 0.85 + leafSway, -f.stemHeight * 0.45, -ll * 0.6 + leafSway, -f.stemHeight * 0.75);
      this.ctx.quadraticCurveTo(-ll * 0.25 + leafSway, -f.stemHeight * 0.38, 0, -f.stemHeight * 0.32);
      this.ctx.fillStyle = '#255719';
      this.ctx.fill();

      // Hoja Derecha Erguida
      this.ctx.beginPath();
      this.ctx.moveTo(0, -f.stemHeight * 0.25);
      this.ctx.quadraticCurveTo(ll * 0.9 + leafSway, -f.stemHeight * 0.52, ll * 0.65 + leafSway, -f.stemHeight * 0.85);
      this.ctx.quadraticCurveTo(ll * 0.3 + leafSway, -f.stemHeight * 0.45, 0, -f.stemHeight * 0.38);
      this.ctx.fillStyle = '#316e21';
      this.ctx.fill();
    }

    // 3. FLOR PROTAGONISTA HERMOSA (Estampado del Sprite Botánico de Alta Calidad)
    this.ctx.translate(tipX, tipY);
    // Inclinación orgánica acompañando el tallo
    this.ctx.rotate((sway / f.stemHeight) * 0.55);

    const sprite = this.flowerSprites[f.spriteIdx % this.flowerSprites.length];
    const s = f.flowerSize;

    // Dibujar el sprite floral centrado con aceleración por hardware
    this.ctx.drawImage(sprite, -s / 2, -s / 2, s, s);

    this.ctx.restore();
  }

  drawParticles(delta, wind) {
    this.ctx.save();
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y += p.speedY;
      p.x += p.speedX * (wind * 0.8);
      p.phase += delta * p.twinkleSpeed;

      if (p.y < -10) p.y = this.height + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.x < -10) p.x = this.width + 10;

      const alpha = p.alpha * (0.6 + Math.sin(p.phase) * 0.4);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 225, 120, ${alpha})`;
      this.ctx.shadowColor = 'rgba(255, 215, 80, 0.8)';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  drawPetals(delta, wind) {
    this.ctx.save();
    for (let i = this.petals.length - 1; i >= 0; i--) {
      const pt = this.petals[i];
      pt.y += pt.speedY;
      pt.x += pt.speedX * (wind * 0.7);
      pt.rotation += pt.rotSpeed;
      pt.flipAngle += pt.flipSpeed;

      if (pt.isBurst && pt.y < -30) {
        this.petals.splice(i, 1);
        continue;
      } else if (!pt.isBurst && pt.y > this.height + 30) {
        pt.y = -20;
        pt.x = Math.random() * this.width;
      }

      this.ctx.save();
      this.ctx.translate(pt.x, pt.y);
      this.ctx.rotate(pt.rotation);
      this.ctx.scale(1, Math.cos(pt.flipAngle));

      this.ctx.beginPath();
      this.ctx.moveTo(0, -pt.size);
      this.ctx.quadraticCurveTo(pt.size * 0.8, 0, 0, pt.size);
      this.ctx.quadraticCurveTo(-pt.size * 0.8, 0, 0, -pt.size);

      const petalGrad = this.ctx.createLinearGradient(0, -pt.size, 0, pt.size);
      petalGrad.addColorStop(0, `rgba(255, 245, 150, ${pt.alpha})`);
      petalGrad.addColorStop(0.6, `rgba(255, 205, 40, ${pt.alpha})`);
      petalGrad.addColorStop(1, `rgba(235, 140, 10, ${pt.alpha})`);

      this.ctx.fillStyle = petalGrad;
      this.ctx.fill();
      this.ctx.restore();
    }
    this.ctx.restore();
  }
}

window.RomanticScene = RomanticScene;
