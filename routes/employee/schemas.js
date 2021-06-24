const EmployeeSchema = {
    type: 'object',
    required: ['id', 'name', 'role'],
    properties: {
      id: {
        type: 'number',
        description: 'unique identifier for each Employee'
      },
      name: { type: 'string' },
      role: { type: 'string', description: 'main content of the Employee' }
    }
  };
  
  module.exports = {
    EmployeeSchema
  }