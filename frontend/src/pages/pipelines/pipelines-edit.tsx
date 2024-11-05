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

import { update, fetch } from '../../stores/pipelines/pipelinesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPipelinesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    pipeline_spec: '',

    steps: [],

    client_org: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { pipelines } = useAppSelector((state) => state.pipelines);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof pipelines === 'object') {
      setInitialValues(pipelines);
    }
  }, [pipelines]);

  useEffect(() => {
    if (typeof pipelines === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = pipelines[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [pipelines]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/pipelines/pipelines-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pipelines')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit pipelines'}
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
                  component={SelectFieldMany}
                  options={initialValues.steps}
                  itemRef={'pipeline_steps'}
                  showField={'step_name'}
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

EditPipelinesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PIPELINES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPipelinesPage;
