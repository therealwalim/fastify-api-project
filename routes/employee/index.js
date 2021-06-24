'use strict';

const { EmployeeSchema } = require('./schemas');
const employeeDAL = require('./EmployeeDAL');

module.exports = async function (fastify, opts) {
  //fastify.register(EmployeeDALPlugin);
  const EmployeeDAL = employeeDAL(fastify.db);

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Employee'],
      description: 'Get all Employees',
      response: {
        200: {
          type: 'array',
          items: EmployeeSchema
        }
      }
    },
    handler: async (request, reply) => {
      return await EmployeeDAL.getEmployee();
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Employee'],
      description: 'Create a Employees',
      body: {
        type: 'object',
        required: ['name', 'role'],
        properties: {
          name: { type: 'string' },
          role: { type: 'string', description: 'main content of the Employee' }
        }
      },
      response: {
        200: EmployeeSchema
      }
    },
    handler: async (request, reply) => {
      const { name, role } = request.body;
      const newEmployee = await EmployeeDAL.createEmployee(name, role);
      
      return newEmployee;
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Employee'],
      description: 'Update a Employee by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      body: {
        type: 'object',
        required: ['name', 'role'],
        properties: {
          name: { type: 'string' },
          role: { type: 'string', description: 'main content of the Employee' }
        }
      },
      response: {
        200: EmployeeSchema
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { name, role } = request.body;

      const updatedEmployee = await EmployeeDAL.updateEmployee(id, name, role);
      return updatedEmployee;
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['Employee'],
      description: 'Delete a Employee by id',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        204: {
          type: 'object',
          default: 'No Content'
        }
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      await EmployeeDAL.deleteEmployee(id);
      reply.status(204);
    }
  });

};