import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import connectorsSlice from './connectors/connectorsSlice';
import data_assetsSlice from './data_assets/data_assetsSlice';
import integrationsSlice from './integrations/integrationsSlice';
import pipeline_stepsSlice from './pipeline_steps/pipeline_stepsSlice';
import pipelinesSlice from './pipelines/pipelinesSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import client_orgsSlice from './client_orgs/client_orgsSlice';
import usersSlice from './users/usersSlice';
import cli_orgSlice from './cli_org/cli_orgSlice';
import cli_org_adminsSlice from './cli_org_admins/cli_org_adminsSlice';
import cli_org_entity_infoSlice from './cli_org_entity_info/cli_org_entity_infoSlice';
import cli_org_grpSlice from './cli_org_grp/cli_org_grpSlice';
import connection_specSlice from './connection_spec/connection_specSlice';
import contact_infoSlice from './contact_info/contact_infoSlice';
import data_asset_entity_mapSlice from './data_asset_entity_map/data_asset_entity_mapSlice';
import data_asset_infoSlice from './data_asset_info/data_asset_infoSlice';
import data_asset_typeSlice from './data_asset_type/data_asset_typeSlice';
import data_extract_dagSlice from './data_extract_dag/data_extract_dagSlice';
import data_extract_requestSlice from './data_extract_request/data_extract_requestSlice';
import data_extract_templateSlice from './data_extract_template/data_extract_templateSlice';
import entity_infoSlice from './entity_info/entity_infoSlice';
import integration_specSlice from './integration_spec/integration_specSlice';
import payload_field_specSlice from './payload_field_spec/payload_field_specSlice';
import payload_layout_specSlice from './payload_layout_spec/payload_layout_specSlice';
import payload_record_specSlice from './payload_record_spec/payload_record_specSlice';
import pipeline_specSlice from './pipeline_spec/pipeline_specSlice';
import pipeline_stepSlice from './pipeline_step/pipeline_stepSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    connectors: connectorsSlice,
    data_assets: data_assetsSlice,
    integrations: integrationsSlice,
    pipeline_steps: pipeline_stepsSlice,
    pipelines: pipelinesSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    client_orgs: client_orgsSlice,
    users: usersSlice,
    cli_org: cli_orgSlice,
    cli_org_admins: cli_org_adminsSlice,
    cli_org_entity_info: cli_org_entity_infoSlice,
    cli_org_grp: cli_org_grpSlice,
    connection_spec: connection_specSlice,
    contact_info: contact_infoSlice,
    data_asset_entity_map: data_asset_entity_mapSlice,
    data_asset_info: data_asset_infoSlice,
    data_asset_type: data_asset_typeSlice,
    data_extract_dag: data_extract_dagSlice,
    data_extract_request: data_extract_requestSlice,
    data_extract_template: data_extract_templateSlice,
    entity_info: entity_infoSlice,
    integration_spec: integration_specSlice,
    payload_field_spec: payload_field_specSlice,
    payload_layout_spec: payload_layout_specSlice,
    payload_record_spec: payload_record_specSlice,
    pipeline_spec: pipeline_specSlice,
    pipeline_step: pipeline_stepSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
