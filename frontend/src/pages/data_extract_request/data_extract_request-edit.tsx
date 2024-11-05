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
} from '../../stores/data_extract_request/data_extract_requestSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditData_extract_requestPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    form_template_id: '',

    form_values: '',

    modified_at: new Date(),

    modified_by: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { data_extract_request } = useAppSelector(
    (state) => state.data_extract_request,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof data_extract_request === 'object') {
      setInitialValues(data_extract_request);
    }
  }, [data_extract_request]);

  useEffect(() => {
    if (typeof data_extract_request === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = data_extract_request[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [data_extract_request]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/data_extract_request/data_extract_request-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit data_extract_request')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit data_extract_request'}
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
              <FormField label='form_template_id' labelFor='form_template_id'>
                <Field
                  name='form_template_id'
                  id='form_template_id'
                  component={SelectField}
                  options={initialValues.form_template_id}
                  itemRef={'data_extract_template'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='form_values'>
                <Field name='form_values' placeholder='form_values' />
              </FormField>

              <FormField label='modified_at'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.modified_at
                      ? new Date(
                          dayjs(initialValues.modified_at).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, modified_at: date })
                  }
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
                      '/data_extract_request/data_extract_request-list',
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

EditData_extract_requestPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DATA_EXTRACT_REQUEST'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditData_extract_requestPage;
