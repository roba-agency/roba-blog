document.addEventListener("DOMContentLoaded", (event) => {
    async function floatingShapeAnimation(duration, className, x1, x2, y1, y2) {
        gsap.to({}, {
            duration: duration,
            repeat: -1,
            ease: "none",
            onUpdate: function() {
                const progress = this.progress();
                const x = x1 * Math.sin(progress * Math.PI * x2);
                const y = y1 * Math.cos(progress * Math.PI * y2);
                gsap.set(className, { x, y });
            }
        });
    }

    floatingShapeAnimation(7, '.home-shape-orange' ,12, 2, 7, 2);
    floatingShapeAnimation(15, '.home-shape-purple', 16, 2 + Math.PI / 1.5, 10, 2 + Math.PI / 1.5);
})