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

import { create } from '../../stores/data_extract_template/data_extract_templateSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  asset_aide: '',

  entity_aide: '',

  integratio_spec_id: '',

  form_template_id: '',

  form_template: '',

  modified_at: '',

  modified_by: '',
};

const Data_extract_templateNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/data_extract_template/data_extract_template-list');
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
              <FormField label='asset_aide'>
                <Field name='asset_aide' placeholder='asset_aide' />
              </FormField>

              <FormField label='entity_aide'>
                <Field name='entity_aide' placeholder='entity_aide' />
              </FormField>

              <FormField
                label='integratio_spec_id'
                labelFor='integratio_spec_id'
              >
                <Field
                  name='integratio_spec_id'
                  id='integratio_spec_id'
                  component={SelectField}
                  options={[]}
                  itemRef={'data_extract_dag'}
                ></Field>
              </FormField>

              <FormField label='form_template_id'>
                <Field
                  type='number'
                  name='form_template_id'
                  placeholder='form_template_id'
                />
              </FormField>

              <FormField label='form_template'>
                <Field name='form_template' placeholder='form_template' />
              </FormField>

              <FormField label='modified_at'>
                <Field
                  type='datetime-local'
                  name='modified_at'
                  placeholder='modified_at'
                />
              </FormField>

              <FormField label='modified_by'>
                <Field name='modified_by' placeholder='modified_by' />
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
                  onClick={() =>
                    router.push(
                      '/data_extract_template/data_extract_template-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Data_extract_templateNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_DATA_EXTRACT_TEMPLATE'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Data_extract_templateNew;
