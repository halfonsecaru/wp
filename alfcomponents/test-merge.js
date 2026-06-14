const backgroundInitial = {
  backgroundColor: 'transparent',
  backgroundSize: 'auto',
  backgroundPosition: 'top left',
  backgroundRepeat: 'repeat',
  backgroundAttachment: 'scroll',
  backgroundClip: 'border-box',
  backgroundImage: 'none',
};

const _background = {
  default: {
    backgroundColor: 'rgba(128, 128, 128, 0.08)'
  }
};

const deepMergeStates = (...states) => {
  return states.reduce((acc, state) => {
    if (!state) return acc;
    const merged = { ...acc };
    for (const key of Object.keys(state)) {
      if (state[key] !== undefined) {
        if (typeof state[key] === 'object' && state[key] !== null) {
          merged[key] = { ...(merged[key] || {}), ...state[key] };
        } else {
          merged[key] = state[key];
        }
      }
    }
    return merged;
  }, {});
};

const bgMerged = deepMergeStates(backgroundInitial, _background, undefined);
console.log("Merged:", bgMerged);

const resolvedBackground = () => {
  const bg = bgMerged;
  if (!bg) return undefined;
  if ('default' in bg) return bg;
  return { default: bg };
};

const bgResolved = resolvedBackground();
console.log("Resolved:", bgResolved);

console.log("bg-color:", bgResolved.default?.backgroundColor);
console.log("bg-img:", bgResolved.default?.backgroundImage);

