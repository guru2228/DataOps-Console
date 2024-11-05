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

import { update, fetch } from '../../stores/pipeline_steps/pipeline_stepsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPipeline_stepsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    step_name: '',

    step_type: '',

    client_org: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { pipeline_steps } = useAppSelector((state) => state.pipeline_steps);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof pipeline_steps === 'object') {
      setInitialValues(pipeline_steps);
    }
  }, [pipeline_steps]);

  useEffect(() => {
    if (typeof pipeline_steps === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = pipeline_steps[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [pipeline_steps]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/pipeline_steps/pipeline_steps-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit pipeline_steps')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit pipeline_steps'}
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
              <FormField label='StepName'>
                <Field name='step_name' placeholder='StepName' />
              </FormField>

              <FormField label='StepType' labelFor='step_type'>
                <Field name='step_type' id='step_type' component='select'>
                  <option value='Extract'>Extract</option>

                  <option value='Transform'>Transform</option>

                  <option value='Enrich'>Enrich</option>

                  <option value='Load'>Load</option>
                </Field>
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
                  onClick={() =>
                    router.push('/pipeline_steps/pipeline_steps-list')
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

EditPipeline_stepsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PIPELINE_STEPS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPipeline_stepsPage;
