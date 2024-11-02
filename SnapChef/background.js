window.onload = function() {
    const canvas = document.getElementById('backgroundCanvas');
    const context = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    let circles = [];
    let num_circles = 100;
    for (let i = 0; i < num_circles; i++) {
        circles.push({ x: Math.random()*(window.innerWidth), y: 40+Math.random()*(window.innerHeight-80), dx: 0.2+Math.random()*4, dy: 2*(Math.random()-0.5) });
    }

    function draw() {
        context.fillStyle = 'rgba(180, 100, 180, 1)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            circle.x += circle.dx;
            circle.y += circle.dy;

            // Bounce the circles off the edges
            if (circle.x - 40 > canvas.width) {
                circle.x = -40;
            }
            if (circle.y + 40 > canvas.height || circle.y - 40 < 0) {
                circle.dy *= -1;
            }

            context.beginPath();
            context.arc(circle.x, circle.y, 30+circle.dx*3, 0, 2 * Math.PI);
            context.fillStyle = `rgba(250, 100, 180, 0.35)`;
            context.fill();
            //context.stroke();
        }
        requestAnimationFrame(draw); // Use requestAnimationFrame for better performance
    }

    draw();
};