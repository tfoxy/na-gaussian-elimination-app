class MatrixUtil {

  constructor(matrix) {
    this.matrix = matrix;
  }

  static toLatex(leftMatrix, rightMatrix) {
    if (rightMatrix) {
      return MatrixUtil._toAugmentedLatex(leftMatrix, rightMatrix);
    } else {
      return MatrixUtil._toSingleLatex(leftMatrix);
    }
  }

  static _toSingleLatex(matrix) {
    let start = '\\begin{pmatrix}';
    let end = '\\end{pmatrix}';

    let content = MatrixUtil._getLatexContent(matrix);

    return `${start} ${content} ${end}`;
  }

  static _toAugmentedLatex(leftMatrix, rightMatrix) {
    let start = '\\left( \\begin{array}{}';
    let end = '\\end{array} \\right)';
    let middle = '\\end{array} \\right| \\left. \\begin{array}{}';

    let leftContent = MatrixUtil._getLatexContent(leftMatrix);
    let rightContent = MatrixUtil._getLatexContent(rightMatrix);

    return `${start} ${leftContent} ${middle} ${rightContent} ${end}`;
  }

  static transpose(matrix) {
    let transposedMatrix = matrix[0].map(() => []);

    matrix.forEach((row) => {
      row.forEach((cell, j) => {
        transposedMatrix[j].push(cell);
      });
    });

    return transposedMatrix;
  }

  static _getLatexContent(matrix) {
    return matrix.map(row => row.join(' & ')).join(' \\\\ ');
  }

  static splitColumns(matrix, position) {
    let matrices = [
      MatrixUtil.sliceColumns(matrix, 0, position),
      MatrixUtil.sliceColumns(matrix, position)
    ];

    return matrices;
  }

  static sliceColumns(matrix, start, end) {
    let slicedMatrix = [];

    matrix.forEach(matrixRow => {
      let slicedRow = matrixRow.slice(start, end);
      slicedMatrix.push(slicedRow);
    });

    return slicedMatrix;
  }


  toLatex(rightMatrix) {
    return MatrixUtil.toLatex(this.matrix, rightMatrix);
  }

  transpose() {
    this.matrix = MatrixUtil.transpose(this.matrix);
    return this;
  }

  splitColumns(position) {
    return MatrixUtil.splitColumns(this.matrix, position);
  }

  sliceColumns(start, end) {
    this.matrix = MatrixUtil.sliceColumns(this.matrix, start, end);
    return this;
  }

}

export default MatrixUtil;
