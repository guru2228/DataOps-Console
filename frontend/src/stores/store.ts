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
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
