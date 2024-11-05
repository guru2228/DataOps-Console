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

import {
  update,
  fetch,
} from '../../stores/integration_spec/integration_specSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditIntegration_spec = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {};
  const [initialValues, setInitialValues] = useState(initVals);

  const { integration_spec } = useAppSelector(
    (state) => state.integration_spec,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { integration_specId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: integration_specId }));
  }, [integration_specId]);

  useEffect(() => {
    if (typeof integration_spec === 'object') {
      setInitialValues(integration_spec);
    }
  }, [integration_spec]);

  useEffect(() => {
    if (typeof integration_spec === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = integration_spec[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [integration_spec]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: integration_specId, data }));
    await router.push('/integration_spec/integration_spec-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit integration_spec')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit integration_spec'}
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
                    router.push('/integration_spec/integration_spec-list')
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

EditIntegration_spec.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_INTEGRATION_SPEC'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditIntegration_spec;
