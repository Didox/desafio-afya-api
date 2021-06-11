const specialistsRepository = require('../../../../services/Specialists');

module.exports = {
  name: {
    isLength: {
      errorMessage: 'Nome deve ter entre 3 e 255 caracteres.',
      options: { min: 3, max: 255 },
    },
  },
  register: {
    isLength: {
      errorMessage: 'Registro deve ter entre 6 e 14 dígitos.',
      options: { min: 6, max: 14 },
    },
  },
  phone: {
    isLength: {
      errorMessage: 'Telefone deve ter no mínimo 9 dígitos! (Incluindo DDD)',
      options: { min: 9, max: 14 },
    },
  },
  cellphone: {
    notEmpty: false,
    isLength: {
      errorMessage: 'Celular deve ter no mínimo 9 dígitos! (Incluindo DDD)',
      options: { min: 9, max: 14 },
    },
  },
  mail: {
    notEmpty: true,
    isEmail: {
      errorMessage: 'Email inválido!',
    },
    errorMessage: 'E-mail é obrigatório!',
  },
  'address.cep': {
    notEmpty: true,
    isLength: {
      options: { min: 8, max: 8 },
      errorMessage: 'CEP inválido!',
    },
    errorMessage: 'CEP é um campo obrigatório.',
  },
  'address.street': {
    notEmpty: true,
    errorMessage: 'Rua é um campo obrigatório.',
  },
  'address.neighborhood': {
    notEmpty: true,
    errorMessage: 'Bairro é um campo obrigatório.',
  },
  'address.locality': {
    notEmpty: true,
    errorMessage: 'Cidade é um campo obrigatório.',
  },
  'address.state': {
    notEmpty: true,
    errorMessage: 'Estado é um campo obrigatório.',
  },
  profession: {
    notEmpty: true,
    errorMessage: 'Id da Profissão é um campo obrigatório.',
  },
  dontExist: {
    custom: {
      errorMessage: ['Já existe um Especialista com este Registro cadastrado no sistema.', 'Já existe um Especialista com este e-mail cadastrado no sistema.'],
      options: async (value, { req }) => {
        const existRegister = await specialistsRepository.getOne({ register: req.body.register });
        const existEmail = await specialistsRepository.getOne({ mail: req.body.mail });
        if (existRegister !== 0) {
          return Promise.reject(Error(this.errorMessage[0]));
        }
        if (existEmail !== 0) {
          return Promise.reject(Error(this.errorMessage[1]));
        }
        return true;
      },
    },
  },

};
