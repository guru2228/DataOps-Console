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

import { create } from '../../stores/connectors/connectorsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  connector_spec: '',

  client_org: '',
};

const ConnectorsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/connectors/connectors-list');
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
              <FormField label='ConnectorSpec' hasTextareaHeight>
                <Field
                  name='connector_spec'
                  as='textarea'
                  placeholder='ConnectorSpec'
                />
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
                  onClick={() => router.push('/connectors/connectors-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

ConnectorsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_CONNECTORS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ConnectorsNew;
