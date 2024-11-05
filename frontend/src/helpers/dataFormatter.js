import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.firstName };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.firstName, id: val.id };
  },

  connectorsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.connector_spec);
  },
  connectorsOneListFormatter(val) {
    if (!val) return '';
    return val.connector_spec;
  },
  connectorsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.connector_spec };
    });
  },
  connectorsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.connector_spec, id: val.id };
  },

  pipeline_stepsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.step_name);
  },
  pipeline_stepsOneListFormatter(val) {
    if (!val) return '';
    return val.step_name;
  },
  pipeline_stepsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.step_name };
    });
  },
  pipeline_stepsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.step_name, id: val.id };
  },

  pipelinesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.pipeline_spec);
  },
  pipelinesOneListFormatter(val) {
    if (!val) return '';
    return val.pipeline_spec;
  },
  pipelinesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.pipeline_spec };
    });
  },
  pipelinesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.pipeline_spec, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  client_orgsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  client_orgsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  client_orgsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  client_orgsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
