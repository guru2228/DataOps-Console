const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const pexelsRoutes = require('./routes/pexels');

const organizationForAuthRoutes = require('./routes/organizationLogin');

const openaiRoutes = require('./routes/openai');

const contactFormRoutes = require('./routes/contactForm');

const usersRoutes = require('./routes/users');

const connectorsRoutes = require('./routes/connectors');

const data_assetsRoutes = require('./routes/data_assets');

const integrationsRoutes = require('./routes/integrations');

const pipeline_stepsRoutes = require('./routes/pipeline_steps');

const pipelinesRoutes = require('./routes/pipelines');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const client_orgsRoutes = require('./routes/client_orgs');

const usersRoutes = require('./routes/users');

const cli_orgRoutes = require('./routes/cli_org');

const cli_org_adminsRoutes = require('./routes/cli_org_admins');

const cli_org_entity_infoRoutes = require('./routes/cli_org_entity_info');

const cli_org_grpRoutes = require('./routes/cli_org_grp');

const connection_specRoutes = require('./routes/connection_spec');

const contact_infoRoutes = require('./routes/contact_info');

const data_asset_entity_mapRoutes = require('./routes/data_asset_entity_map');

const data_asset_infoRoutes = require('./routes/data_asset_info');

const data_asset_typeRoutes = require('./routes/data_asset_type');

const data_extract_dagRoutes = require('./routes/data_extract_dag');

const data_extract_requestRoutes = require('./routes/data_extract_request');

const data_extract_templateRoutes = require('./routes/data_extract_template');

const entity_infoRoutes = require('./routes/entity_info');

const integration_specRoutes = require('./routes/integration_spec');

const payload_field_specRoutes = require('./routes/payload_field_spec');

const payload_layout_specRoutes = require('./routes/payload_layout_spec');

const payload_record_specRoutes = require('./routes/payload_record_spec');

const pipeline_specRoutes = require('./routes/pipeline_spec');

const pipeline_stepRoutes = require('./routes/pipeline_step');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'DataOps Console',
      description:
        'DataOps Console Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/connectors',
  passport.authenticate('jwt', { session: false }),
  connectorsRoutes,
);

app.use(
  '/api/data_assets',
  passport.authenticate('jwt', { session: false }),
  data_assetsRoutes,
);

app.use(
  '/api/integrations',
  passport.authenticate('jwt', { session: false }),
  integrationsRoutes,
);

app.use(
  '/api/pipeline_steps',
  passport.authenticate('jwt', { session: false }),
  pipeline_stepsRoutes,
);

app.use(
  '/api/pipelines',
  passport.authenticate('jwt', { session: false }),
  pipelinesRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/client_orgs',
  passport.authenticate('jwt', { session: false }),
  client_orgsRoutes,
);

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/cli_org',
  passport.authenticate('jwt', { session: false }),
  cli_orgRoutes,
);

app.use(
  '/api/cli_org_admins',
  passport.authenticate('jwt', { session: false }),
  cli_org_adminsRoutes,
);

app.use(
  '/api/cli_org_entity_info',
  passport.authenticate('jwt', { session: false }),
  cli_org_entity_infoRoutes,
);

app.use(
  '/api/cli_org_grp',
  passport.authenticate('jwt', { session: false }),
  cli_org_grpRoutes,
);

app.use(
  '/api/connection_spec',
  passport.authenticate('jwt', { session: false }),
  connection_specRoutes,
);

app.use(
  '/api/contact_info',
  passport.authenticate('jwt', { session: false }),
  contact_infoRoutes,
);

app.use(
  '/api/data_asset_entity_map',
  passport.authenticate('jwt', { session: false }),
  data_asset_entity_mapRoutes,
);

app.use(
  '/api/data_asset_info',
  passport.authenticate('jwt', { session: false }),
  data_asset_infoRoutes,
);

app.use(
  '/api/data_asset_type',
  passport.authenticate('jwt', { session: false }),
  data_asset_typeRoutes,
);

app.use(
  '/api/data_extract_dag',
  passport.authenticate('jwt', { session: false }),
  data_extract_dagRoutes,
);

app.use(
  '/api/data_extract_request',
  passport.authenticate('jwt', { session: false }),
  data_extract_requestRoutes,
);

app.use(
  '/api/data_extract_template',
  passport.authenticate('jwt', { session: false }),
  data_extract_templateRoutes,
);

app.use(
  '/api/entity_info',
  passport.authenticate('jwt', { session: false }),
  entity_infoRoutes,
);

app.use(
  '/api/integration_spec',
  passport.authenticate('jwt', { session: false }),
  integration_specRoutes,
);

app.use(
  '/api/payload_field_spec',
  passport.authenticate('jwt', { session: false }),
  payload_field_specRoutes,
);

app.use(
  '/api/payload_layout_spec',
  passport.authenticate('jwt', { session: false }),
  payload_layout_specRoutes,
);

app.use(
  '/api/payload_record_spec',
  passport.authenticate('jwt', { session: false }),
  payload_record_specRoutes,
);

app.use(
  '/api/pipeline_spec',
  passport.authenticate('jwt', { session: false }),
  pipeline_specRoutes,
);

app.use(
  '/api/pipeline_step',
  passport.authenticate('jwt', { session: false }),
  pipeline_stepRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use('/api/contact-form', contactFormRoutes);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
