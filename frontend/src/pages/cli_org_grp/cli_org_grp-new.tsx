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

import { create } from '../../stores/cli_org_grp/cli_org_grpSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  cli_org_grp_id: '',

  cli_org_id: '',

  start_dttm: '',

  end_dttm: '',
};

const Cli_org_grpNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/cli_org_grp/cli_org_grp-list');
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
              <FormField label='cli_org_grp_id' labelFor='cli_org_grp_id'>
                <Field
                  name='cli_org_grp_id'
                  id='cli_org_grp_id'
                  component={SelectField}
                  options={[]}
                  itemRef={'cli_org'}
                ></Field>
              </FormField>

              <FormField label='cli_org_id' labelFor='cli_org_id'>
                <Field
                  name='cli_org_id'
                  id='cli_org_id'
                  component={SelectField}
                  options={[]}
                  itemRef={'cli_org'}
                ></Field>
              </FormField>

              <FormField label='start_dttm'>
                <Field
                  type='datetime-local'
                  name='start_dttm'
                  placeholder='start_dttm'
                />
              </FormField>

              <FormField label='end_dttm'>
                <Field
                  type='datetime-local'
                  name='end_dttm'
                  placeholder='end_dttm'
                />
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
                  onClick={() => router.push('/cli_org_grp/cli_org_grp-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Cli_org_grpNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_CLI_ORG_GRP'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Cli_org_grpNew;
