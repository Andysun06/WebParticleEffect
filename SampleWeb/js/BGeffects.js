﻿document.addEventListener('DOMContentLoaded', function () {
    class ParticleBackground {
        constructor() {
            this.config = {
                baseDensity: 35,
                maxParticles: 150,
                particleSpeed: 0.4,
                lineMaxDistance: 120,
                lineOpacity: 0.4,
                mouseRadius: 180,
                maxConnections: 4,
                mobileFactor: 1.8
            };

            this.canvas = document.getElementById('particleCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.mouse = { x: null, y: null };
            this.animationFrame = null;

            this.init();
        }

        init() {
            this.resizeCanvas();
            this.createParticles();
            this.bindEvents();
            this.animate();
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resizeCanvas());
            window.addEventListener('mousemove', e => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });
            window.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.createParticles(true);
        }

        createParticles(reset = false) {
            if (reset) this.particles = [];

            let particleCount = Math.floor(window.innerWidth / this.config.baseDensity);
            particleCount = Math.min(particleCount, this.config.maxParticles);

            if (window.innerWidth < 768) {
                particleCount = Math.floor(particleCount / this.config.mobileFactor);
            }

            const colors = ['#4CAF50', '#2196F3', '#E91E63', '#FFC107'];
            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * this.config.particleSpeed,
                    vy: (Math.random() - 0.5) * this.config.particleSpeed,
                    radius: Math.random() * 1.5 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }

        drawParticle(particle) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        }

        updateParticle(particle) {
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            if (this.mouse.x && this.mouse.y) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRadius) {
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    particle.x -= dx * force * 0.01;
                    particle.y -= dy * force * 0.01;
                }
            }

            particle.x += particle.vx;
            particle.y += particle.vy;
        }

        drawConnection(particleA, particleB, distance) {  // 新增distance参数
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const baseColor = isDark ? '255,255,255' : '0,0,0';
            const opacity = (1 - (distance / this.config.lineMaxDistance)) * this.config.lineOpacity;

            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(particleA.x, particleA.y);
            this.ctx.lineTo(particleB.x, particleB.y);
            this.ctx.stroke();
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const connectionCount = new Map();
            this.particles.forEach(p => connectionCount.set(p, 0));

            // 修复部分：正确传递distance参数
            this.particles.forEach((particle, index) => {
                const neighbors = [];

                for (let i = index + 1; i < this.particles.length; i++) {
                    const other = this.particles[i];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.config.lineMaxDistance) {
                        neighbors.push({ other, distance });
                    }
                }

                neighbors.sort((a, b) => a.distance - b.distance)
                    .slice(0, this.config.maxConnections)
                    .forEach(({ other, distance }) => {  // 正确解构distance
                        if (connectionCount.get(particle) < this.config.maxConnections &&
                            connectionCount.get(other) < this.config.maxConnections) {
                            this.drawConnection(particle, other, distance);  // 传递distance
                            connectionCount.set(particle, connectionCount.get(particle) + 1);
                            connectionCount.set(other, connectionCount.get(other) + 1);
                        }
                    });
            });

            this.particles.forEach(particle => {
                this.updateParticle(particle);
                this.drawParticle(particle);
            });

            if (this.mouse.x && this.mouse.y) {
                this.particles.forEach(particle => {
                    const dx = particle.x - this.mouse.x;
                    const dy = particle.y - this.mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150 && connectionCount.get(particle) < this.config.maxConnections) {
                        this.drawConnection(particle,
                            { x: this.mouse.x, y: this.mouse.y },
                            distance  // 明确传递distance参数
                        );
                    }
                });
            }

            this.animationFrame = requestAnimationFrame(() => this.animate());
        }
    }

    const particleSystem = new ParticleBackground();
    window.particleBackground = particleSystem;
});