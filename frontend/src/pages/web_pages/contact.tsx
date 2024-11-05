import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'DataOps Console';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const faqs = [
    {
      question: 'How can I get started with ${projectName}?',
      answer:
        'To get started, simply sign up on our website and choose the plan that best suits your needs. Our team is available to assist you with the setup process.',
    },
    {
      question: 'What support options are available?',
      answer:
        '${projectName} offers various support options including email support, live chat, and a comprehensive knowledge base to help you resolve any issues quickly.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer:
        'Yes, you can upgrade your plan at any time. Simply contact our support team or navigate to the billing section in your account settings to make changes.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'We offer a free trial for new users to explore the features of ${projectName}. Sign up today to start your trial and see how our platform can benefit your team.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize data security and employ industry-standard measures to protect your information. Our platform includes role-based access control and encryption to ensure your data is safe.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch`}</title>
        <meta
          name='description'
          content={`Reach out to our team for any inquiries or support. We're here to help you with your DataOps management needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'DataOps Console'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'DataOps Console'}
          image={['Customer support team ready']}
          mainText={`Connect with ${projectName} Support Team`}
          subTitle={`We're here to assist you with any questions or support you need. Contact ${projectName} today and let us help you optimize your DataOps experience.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'DataOps Console'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'DataOps Console'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Email communication illustration']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`Feel free to contact us anytime. Our team at ${projectName} is ready to respond to your inquiries and provide the support you need.`}
        />
      </main>
      <WebSiteFooter projectName={'DataOps Console'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
