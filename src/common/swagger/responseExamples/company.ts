export const swaggerPostCompanyExample = {
  id: 1,
  companyName: 'companyName',
  cuit: 'cuit',
  adhesionDate: 'adhesionDate',
};

export const swaggerPostCompanyBadRequestExample = {
  message: ['cuit must be 11 characters long'],
  error: 'Bad Request',
  statusCode: 400,
};

export const swaggerPostCompanyConflictExample = {
  message: 'Company already exists',
  error: 'Conflict',
  statusCode: 409,
};
