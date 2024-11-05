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

import { update, fetch } from '../../stores/contact_info/contact_infoSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditContact_infoPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    aide: '',

    type: '',

    role: '',

    val: '',

    modified_at: new Date(),

    modified_by: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { contact_info } = useAppSelector((state) => state.contact_info);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof contact_info === 'object') {
      setInitialValues(contact_info);
    }
  }, [contact_info]);

  useEffect(() => {
    if (typeof contact_info === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = contact_info[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [contact_info]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/contact_info/contact_info-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit contact_info')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit contact_info'}
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
              <FormField label='aide' labelFor='aide'>
                <Field
                  name='aide'
                  id='aide'
                  component={SelectField}
                  options={initialValues.aide}
                  itemRef={'data_asset_info'}
                  showField={'id'}
                ></Field>
              </FormField>

              <FormField label='type'>
                <Field name='type' placeholder='type' />
              </FormField>

              <FormField label='role'>
                <Field name='role' placeholder='role' />
              </FormField>

              <FormField label='val'>
                <Field name='val' placeholder='val' />
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
                  onClick={() => router.push('/contact_info/contact_info-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditContact_infoPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CONTACT_INFO'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditContact_infoPage;
