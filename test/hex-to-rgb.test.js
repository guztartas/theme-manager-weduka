import { hexToRgb } from '../src/js/functions/hex-to-rgb.js';

QUnit.test('hexToRgb function', function (assert) {
  assert.strictEqual(hexToRgb('#ff0000'), '255, 0, 0', 'Conversão correta para vermelho');

  assert.strictEqual(hexToRgb('#00ff00'), '0, 255, 0', 'Conversão correta para verde');

  assert.strictEqual(hexToRgb('#zzzzzz'), 'NaN, NaN, NaN', 'Cor inválida retorna NaN');
});