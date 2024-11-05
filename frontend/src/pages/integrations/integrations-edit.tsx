import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/integrations/integrationsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditIntegrationsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    integration_name: '',

    connectors: [],

    pipelines: [],

    client_org: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { integrations } = useAppSelector((state) => state.integrations);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof integrations === 'object') {
      setInitialValues(integrations);
    }
  }, [integrations]);

  useEffect(() => {
    if (typeof integrations === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = integrations[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [integrations]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/integrations/integrations-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit integrations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit integrations'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='IntegrationName'>
                <Field name='integration_name' placeholder='IntegrationName' />
              </FormField>

              <FormField label='Connectors' labelFor='connectors'>
                <Field
                  name='connectors'
                  id='connectors'
                  component={SelectFieldMany}
                  options={initialValues.connectors}
                  itemRef={'connectors'}
                  showField={'connector_spec'}
                ></Field>
              </FormField>

              <FormField label='Pipelines' labelFor='pipelines'>
                <Field
                  name='pipelines'
                  id='pipelines'
                  component={SelectFieldMany}
                  options={initialValues.pipelines}
                  itemRef={'pipelines'}
                  showField={'pipeline_spec'}
                ></Field>
              </FormField>

              <FormField label='client_org' labelFor='client_org'>
                <Field
                  name='client_org'
                  id='client_org'
                  component={SelectField}
                  options={initialValues.client_org}
                  itemRef={'client_orgs'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/integrations/integrations-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditIntegrationsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_INTEGRATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditIntegrationsPage;
