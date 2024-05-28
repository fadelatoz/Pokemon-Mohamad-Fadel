// jest.setup.js

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';


global.fetch = require('jest-fetch-mock');

global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
  
    disconnect() {}
  
    observe() {}
  
    unobserve() {}
  };

  configure({ testIdAttribute: 'data-testid' });

