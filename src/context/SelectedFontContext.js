import { createContext } from 'react';

// Font scales
const selectedFontScale = {
  scale: 0
};

const selectedFontContext = createContext([selectedFontScale.scale, () => {}]);

export default selectedFontContext;
