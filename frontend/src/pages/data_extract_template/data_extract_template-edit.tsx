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
} from '../../stores/data_extract_template/data_extract_templateSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditData_extract_templatePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    asset_aide: '',

    entity_aide: '',

    integratio_spec_id: '',

    form_template_id: '',

    form_template: '',

    modified_at: new Date(),

    modified_by: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { data_extract_template } = useAppSelector(
    (state) => state.data_extract_template,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof data_extract_template === 'object') {
      setInitialValues(data_extract_template);
    }
  }, [data_extract_template]);

  useEffect(() => {
    if (typeof data_extract_template === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = data_extract_template[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [data_extract_template]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/data_extract_template/data_extract_template-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit data_extract_template')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit data_extract_template'}
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
                  options={initialValues.integratio_spec_id}
                  itemRef={'data_extract_dag'}
                  showField={'id'}
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

EditData_extract_templatePage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DATA_EXTRACT_TEMPLATE'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditData_extract_templatePage;
