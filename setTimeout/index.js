const timer = () => {
  const speed = 50, start = new Date().getTime();
  let counter = 1;
  const idealInput = document.getElementById('ideal');
  const realInput = document.getElementById('real');
  const diffInput = document.getElementById('diff');

  const instance = () => {
    const ideal = counter * speed;
    const real = new Date().getTime() - start;
    const diff = real - ideal;

    counter++;
    idealInput.value = ideal;
    realInput.value = real;
    diffInput.value = diff;
    window.setTimeout(instance, speed)
  }
  window.setTimeout(instance, speed);
}

timer();