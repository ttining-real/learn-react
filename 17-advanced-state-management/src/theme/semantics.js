import primitives from './primitives';

const { color } = primitives;

export default {
  light: {
    forground: color.slate[800],
    background: color.white,
    accent: color.purple[500],
  },
  dark: {
    forground: color.white,
    background: color.slate[900],
    accent: color.yellow[500],
  },
};
