const EmployeeDAL = (db) => {
    const createEmployee = async (name, role) => {
      const { id } = await db.one('INSERT INTO employees (name, role) VALUES($1, $2) RETURNING id', [name, role]);
  
      return { id, name, role };
    };
  
    const getEmployee = async () => {
      const employees = await db.manyOrNone('SELECT * FROM employees');
  
      return employees;
    }
  
    const updateEmployee = async (employeeId, name, role) => {
      const { id } = await db.one(`UPDATE employees SET name=$1, role=$2 WHERE id=$3 RETURNING id`, [name, role, employeeId]);
  
      return { id, name, role };
    }
  
    const deleteEmployee = async (id) => {
      return await db.query('DELETE FROM employees WHERE id=$1', [id]);
    }
  
    return { createEmployee, getEmployee, updateEmployee, deleteEmployee };
  }
  
  module.exports = EmployeeDAL;