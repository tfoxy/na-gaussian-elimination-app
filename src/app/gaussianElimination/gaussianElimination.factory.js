function GaussianEliminationFactory(GaussianElimination, $log) {
  'ngInject';

  let gaussianElimination = new GaussianElimination();

  gaussianElimination.on('error', err => {
    $log.error(err);
  });

  return gaussianElimination;
}

export default GaussianEliminationFactory;
