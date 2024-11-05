import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/pipelines/pipelinesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  pipeline_spec: '',

  steps: [],

  client_org: '',
};

const PipelinesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/pipelines/pipelines-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='PipelineSpec' hasTextareaHeight>
                <Field
                  name='pipeline_spec'
                  as='textarea'
                  placeholder='PipelineSpec'
                />
              </FormField>

              <FormField label='Steps' labelFor='steps'>
                <Field
                  name='steps'
                  id='steps'
                  itemRef={'pipeline_steps'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='client_org' labelFor='client_org'>
                <Field
                  name='client_org'
                  id='client_org'
                  component={SelectField}
                  options={[]}
                  itemRef={'client_orgs'}
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
                  onClick={() => router.push('/pipelines/pipelines-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

PipelinesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PIPELINES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PipelinesNew;
