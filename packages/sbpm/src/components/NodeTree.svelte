<script>
  import { onMount } from 'svelte';

  let svg;
  let originalLine;

  onMount(() => {
    const parent = document.querySelector('.one');
    const firstChild = document.querySelector('.two');
    const lastChild = document.querySelector('.three');

    const x1 = parent.clientWidth / 2;
    const y1 = parent.offsetTop + parent.clientHeight;
    const x2 = x1;
    const y2 = lastChild.offsetTop + lastChild.clientHeight / 2;

    const newLine = originalLine.cloneNode(true);
    newLine.setAttribute('id', 'newLine');
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    svg.appendChild(newLine);

    const firstChildX1 = x1;
    const firstChildY1 = firstChild.offsetTop + firstChild.clientHeight / 2;
    const firstChildX2 = parent.clientWidth;
    const firstChildY2 = firstChildY1;

    const firstChildLine = originalLine.cloneNode(true);
    firstChildLine.setAttribute('id', 'firstChildLine');
    firstChildLine.setAttribute('x1', firstChildX1);
    firstChildLine.setAttribute('y1', firstChildY1);
    firstChildLine.setAttribute('x2', firstChildX2);
    firstChildLine.setAttribute('y2', firstChildY2);
    svg.appendChild(firstChildLine);

    const lastChildX1 = x1;
    const lastChildY1 = lastChild.offsetTop + lastChild.clientHeight / 2;
    const lastChildX2 = parent.clientWidth;
    const lastChildY2 = lastChildY1;

    const lastChildLine = originalLine.cloneNode(true);
    lastChildLine.setAttribute('id', 'lastChildLine');
    lastChildLine.setAttribute('x1', lastChildX1);
    lastChildLine.setAttribute('y1', lastChildY1);
    lastChildLine.setAttribute('x2', lastChildX2);
    lastChildLine.setAttribute('y2', lastChildY2);
    svg.appendChild(lastChildLine);
  });
</script>

<div>
  <div>
    <div class="one" />
    <div class="two" />
    <div class="three" />
  </div>
  <svg id="svg" bind:this={svg}>
    <line id="line" stroke="black" bind:this={originalLine} />
  </svg>
</div>

<style>
  .one,
  .two,
  .three {
    height: 100px;
    width: 100px;
    background-color: magenta;
  }

  .two,
  .three {
    position: relative;
    left: 100px;
  }

  .two {
    margin: 50px 0;
  }

  #svg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  #line {
    stroke-width: 2px;
    stroke: rgb(0, 0, 0);
  }
</style>
