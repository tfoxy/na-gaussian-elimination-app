import MatrixUtil from './matrixUtil.js';

class MatrixUtilMock extends MatrixUtil {

  static toLatex(leftMatrix, rightMatrix) {
    if (rightMatrix) {
      // [[1, 2], [4, 5] | [3], [6]]
      let leftContent = MatrixUtilMock._getLatexContent(leftMatrix);
      let rightContent = MatrixUtilMock._getLatexContent(rightMatrix);

      return `[${leftContent} | ${rightContent}]`;
    } else {
      // [[1, 2, 3], [4, 5, 6], [7, ,8, 9]]
      return '[' + MatrixUtilMock._getLatexContent(leftMatrix) + ']';
    }
  }

  static _getLatexContent(matrix) {
    return '[' + matrix.map(row => row.join(', ')).join('], [') + ']';
  }

  toLatex() {
    return MatrixUtilMock.toLatex(this.matrix);
  }

}

export default MatrixUtilMock;
