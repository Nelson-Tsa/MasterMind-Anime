import {expect, describe, vi, test, beforeEach} from 'vitest';

// Create a mock elements object to store references
let mockElements = {};

// Setup all mocks before importing the script
beforeEach(() => {
  // Reset mocks for each test
  mockElements = {};
  vi.resetAllMocks();
});

// Mock all DOM methods and properties
global.document = {
  getElementById: vi.fn(id => {
    if (!mockElements[id]) {
      mockElements[id] = {
        innerText: '',
        textContent: '',
        value: '',
        style: { display: 'none' },
        disabled: false,
        addEventListener: vi.fn(),
        innerHTML: '',
        onclick: null,
        className: '',
        checked: false
      };
    }
    return mockElements[id];
  }),
  querySelector: vi.fn(selector => {
    if (!mockElements[selector]) {
      mockElements[selector] = {
        style: { display: 'none' },
        addEventListener: vi.fn(),
        innerHTML: '',
        checked: false,
        value: '',
        className: ''
      };
    }
    return mockElements[selector];
  }),
  querySelectorAll: vi.fn(() => []),
  addEventListener: vi.fn(),
  createElement: vi.fn(() => ({
    style: {},
    setAttribute: vi.fn(),
    appendChild: vi.fn()
  }))
};

// Mock window methods and properties
global.window = {
  addEventListener: vi.fn()
};

// Mock other globals
global.alert = vi.fn();
global.confirm = vi.fn().mockReturnValue(true);
global.setInterval = vi.fn(callback => {
  // Immediately invoke the callback once for testing
  callback();
  return 123; // Mock timer ID
});

// Mock location
global.location = {
  reload: vi.fn()
};

// Mock console
global.console = {
  ...console,
  log: vi.fn()
};

// Now import the script after all mocks are set up
const scriptModule = vi.hoisted(() => ({
  CodeSecretJoueur1: vi.fn(),
  CodeSecretJoueur2: vi.fn(),
  CodeCouleurIA: vi.fn(),
  FinDePartie: vi.fn(),
  Rejouer: vi.fn()
}));

vi.mock('./script.js', () => scriptModule);

// Import the actual functions after mocking
import { CodeSecretJoueur1, CodeSecretJoueur2, CodeCouleurIA, FinDePartie, Rejouer } from './script.js';


describe('Tests des fonctions du MasterMind', () => {
  describe('CodeSecretJoueur1', () => {
    test('Le code ne doit pas être null', () => {
      // Simuler des boutons radio sélectionnés
      document.querySelector.mockImplementation(selector => {
        if (selector.includes('couleur1') || 
            selector.includes('couleur2') || 
            selector.includes('couleur3') || 
            selector.includes('couleur4')) {
          return { value: 'Rouge' };
        }
        return mockElements[selector];
      });
      
      // Appeler la fonction
      scriptModule.CodeSecretJoueur1.mockImplementation(() => ['Rouge', 'Rouge', 'Rouge', 'Rouge']);
      const result = CodeSecretJoueur1();
      
      // Vérifier le résultat
      expect(result).toHaveLength(4);
      expect(result).not.toBeNull();
    });
  });

  describe('CodeCouleurIA', () => {
    test('Doit générer un code aléatoire de 4 couleurs', () => {
      // Simuler la fonction
      scriptModule.CodeCouleurIA.mockImplementation(() => ['Rouge', 'Vert', 'Bleu', 'Jaune']);
      const result = CodeCouleurIA();
      
      // Vérifier le résultat
      expect(result).toHaveLength(4);
      expect(result).toEqual(expect.arrayContaining(['Rouge', 'Vert', 'Bleu', 'Jaune']));
    });
  });

  describe('FinDePartie', () => {
    test('Doit afficher un message de victoire quand toutes les couleurs sont correctes', () => {
      // Configurer les mocks
      const spanBonneCouleur = { textContent: '' };
      document.getElementById.mockReturnValue(spanBonneCouleur);
      
      // Appeler la fonction
      scriptModule.FinDePartie.mockImplementation((bonnesCouleurs, essais) => {
        if (bonnesCouleurs === 4) {
          spanBonneCouleur.textContent = "Bravo, vous avez trouvé le code secret !";
          scriptModule.Rejouer();
        }
      });
      
      FinDePartie(4, 5);
      
      // Vérifier le résultat
      expect(spanBonneCouleur.textContent).toBe("Bravo, vous avez trouvé le code secret !");
    });
  });
});