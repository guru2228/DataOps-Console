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
} from '../../stores/payload_layout_spec/payload_layout_specSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPayload_layout_spec = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    payload_layout_spec_id: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { payload_layout_spec } = useAppSelector(
    (state) => state.payload_layout_spec,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { payload_layout_specId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: payload_layout_specId }));
  }, [payload_layout_specId]);

  useEffect(() => {
    if (typeof payload_layout_spec === 'object') {
      setInitialValues(payload_layout_spec);
    }
  }, [payload_layout_spec]);

  useEffect(() => {
    if (typeof payload_layout_spec === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = payload_layout_spec[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [payload_layout_spec]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: payload_layout_specId, data }));
    await router.push('/payload_layout_spec/payload_layout_spec-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit payload_layout_spec')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit payload_layout_spec'}
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
              <FormField label='payload_layout_spec_id'>
                <Field
                  type='number'
                  name='payload_layout_spec_id'
                  placeholder='payload_layout_spec_id'
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
                  onClick={() =>
                    router.push('/payload_layout_spec/payload_layout_spec-list')
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

EditPayload_layout_spec.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PAYLOAD_LAYOUT_SPEC'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPayload_layout_spec;
