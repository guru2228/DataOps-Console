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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'What is the main purpose of ${projectName}?',
      answer:
        '${projectName} is designed to streamline data operations by managing data assets and integrations efficiently. It supports various roles like Admins, Data Ops Managers, and Integration Specialists.',
    },
    {
      question: 'How does ${projectName} ensure data security?',
      answer:
        'We implement role-based access control and data encryption to protect your information. Only authorized users can access sensitive data, ensuring your operations remain secure.',
    },
    {
      question: 'Can I customize the integrations in ${projectName}?',
      answer:
        'Yes, Integration Specialists can define and customize integrations using connectors and pipelines, allowing for tailored data flow between systems.',
    },
    {
      question: 'What kind of support does ${projectName} offer?',
      answer:
        'We provide comprehensive support including email, live chat, and a detailed knowledge base to assist you with any questions or issues you may encounter.',
    },
    {
      question: 'Is there a trial period available for new users?',
      answer:
        'Yes, we offer a free trial period for new users to explore the features of ${projectName} and see how it can benefit their data operations.',
    },
    {
      question: 'How can I upgrade my plan?',
      answer:
        'You can upgrade your plan at any time by contacting our support team or through the billing section in your account settings.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and support options.`}
        />
      </Head>
      <WebSiteHeader projectName={'DataOps Console'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'DataOps Console'}
          image={['FAQ section illustration']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Get the information you need to make the most of our platform.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'DataOps Console'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'DataOps Console'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support communication']}
          mainText={`Contact ${projectName} Support Team `}
          subTitle={`Reach out to us anytime for assistance or inquiries. Our team at ${projectName} is ready to help and will respond promptly to your messages.`}
        />
      </main>
      <WebSiteFooter projectName={'DataOps Console'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
