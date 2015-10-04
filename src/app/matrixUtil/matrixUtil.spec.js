import MatrixUtil from './matrixUtil.js';

describe('MatrixUtil', () => {

  describe('.constructor', () => {

    it('returns an object with a matrix property', () => {
      let matrix = [[1, 2], [3, 4]];
      let matrixUtil = new MatrixUtil(matrix);
      expect(matrixUtil).to.have.property('matrix', matrix);
    });

    it('returns a chainable object', () => {
      let matrix = [[1, 2], [3, 4]];
      let matrixUtil = new MatrixUtil(matrix);
      expect(matrixUtil.transpose().transpose())
        .to.have.property('matrix')
        .that.deep.equal(matrix);
    });

  });

  describe('.toLatex(matrix [, rightMatrix])', () => {

    it('transforms a matrix to its latex representation', () => {
      let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, new DummyNumber(8), 9]
      ];

      let latex = MatrixUtil.toLatex(matrix);
      let expectedLatex = '\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{pmatrix}';

      expect(latex).to.equal(expectedLatex);
    });

    it('transforms an augmented matrix to its latex representation', () => {
      let leftMatrix = [[1, 2], [3, 4]];
      let rightMatrix = [[5], [6]];

      let latex = MatrixUtil.toLatex(leftMatrix, rightMatrix);
      let expectedLatex = '\\left( \\begin{array}{} ' +
        '1 & 2 \\\\ 3 & 4' +
        ' \\end{array} \\right| \\left. \\begin{array}{} ' +
        '5 \\\\ 6' +
        ' \\end{array} \\right)';

      expect(latex).to.equal(expectedLatex);
    });

  });

  describe('.transpose(matrix)', () => {

    it('converts a row to a column', () => {
      let matrix = [[1, 2, 3]];
      let transposedMatrix = MatrixUtil.transpose(matrix);

      expect(transposedMatrix).to.deep.equal([[1], [2], [3]]);
    });

  });

  describe('.splitColumns(matrix, position)', () => {

    it('splits a row of a matrix', () => {
      let matrix = [[1, 2, 3, 4, 5]];
      let expectedMatrices = [[[1, 2]], [[3, 4, 5]]];

      let matrices = MatrixUtil.splitColumns(matrix, 2);

      expect(matrices).to.deep.equal(expectedMatrices);
    });

    it('accepts a negative position, that starts from the end', () => {
      let matrix = [[1, 2, 3, 4, 5]];
      let expectedMatrices = [[[1, 2, 3]], [[4, 5]]];

      let matrices = MatrixUtil.splitColumns(matrix, -2);

      expect(matrices).to.deep.equal(expectedMatrices);
    });

    it('splits multiple rows with negative position', () => {
      let matrix = [[1, 2, 3, 4], [5, 6, 7, 8]];
      let expectedMatrices = [[[1, 2, 3], [5, 6, 7]], [[4], [8]]];

      let matrices = MatrixUtil.splitColumns(matrix, -1);

      expect(matrices).to.deep.equal(expectedMatrices);
    });

  });

});

class DummyNumber {
  constructor(num) {
    this.num = num;
  }

  toString() {
    return this.num + '';
  }
}
