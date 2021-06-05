const { createConnection, getRepository } = require('typeorm');

module.exports = {
  async create(attendance) {
    const connection = await createConnection();
    try {
      const medRecordHistories = getRepository('MedicalRecordHistoryHistory');
      const result = await medRecordHistories.save(attendance);
      return result;
    } finally {
      connection.close();
    }
  },

  async list() {
    const connection = await createConnection();

    try {
      const medRecordHistories = getRepository('MedicalRecordHistory');
      const result = await medRecordHistories.find({ relations: ['specialist', 'medicalRecord'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async getOne(param) {
    const connection = await createConnection();

    try {
      const medRecordHistories = getRepository('MedicalRecordHistory');
      const result = await medRecordHistories.findOne(param, { relations: ['specialist', 'medicalRecord'] });
      return result;
    } finally {
      connection.close();
    }
  },

  async update(id, data) {
    const connection = await createConnection();
    try {
      const medRecordHistories = getRepository('MedicalRecordHistory');
      const attendance = await medRecordHistories.findOne(id, { relations: ['specialist', 'medicalRecord'] });
      medRecordHistories.merge(attendance, data);
      const result = await medRecordHistories.save(attendance);
      return result;
    } finally {
      connection.close();
    }
  },

  async delete(id) {
    const connection = await createConnection();
    try {
      const medRecordHistories = getRepository('MedicalRecordHistory');
      const result = await medRecordHistories.delete(id);
      return result;
    } finally {
      connection.close();
    }
  },
};