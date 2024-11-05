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
  FeaturesDesigns,
  PricingDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

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

  const features_points = [
    {
      name: 'Dynamic Data Asset Management',
      description:
        'Organize and manage your data assets with ease. Our platform provides tools to ensure data is accessible and well-structured for all team members.',
      icon: 'mdiDatabaseCog',
    },
    {
      name: 'Seamless Integration Solutions',
      description:
        'Facilitate smooth data flow between systems with our integration tools. Create and manage connectors and pipelines to automate processes efficiently.',
      icon: 'mdiLink',
    },
    {
      name: 'Comprehensive Role Management',
      description:
        'Assign roles and permissions to team members to maintain data security. Our role management feature ensures that only authorized users can access sensitive data.',
      icon: 'mdiAccountKey',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Basic data asset management',
        'Access to integration tools',
        'Role-based access control',
      ],
      limited_features: ['Limited data storage', 'Basic support'],
    },
    premium: {
      features: [
        'Advanced data asset management',
        'Full access to integration tools',
        'Enhanced role management',
      ],
      also_included: [
        'Increased data storage',
        'Priority support',
        'Customizable dashboards',
      ],
    },
    business: {
      features: [
        'Comprehensive data asset management',
        'Unlimited integration capabilities',
        'Advanced security features',
        'Dedicated account manager',
        '24/7 premium support',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is ideal for individuals or small teams looking to manage data assets and basic integrations efficiently.',
    premium:
      'The Premium plan is perfect for small businesses or startups that require advanced data management and integration capabilities with additional support.',
    business:
      'The Business plan is designed for large enterprises needing comprehensive data solutions, unlimited integrations, and dedicated support.',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - DataOps Management`}</title>
        <meta
          name='description'
          content={`Explore the comprehensive services offered by our DataOps management platform, including data asset management, integration solutions, and more.`}
        />
      </Head>
      <WebSiteHeader projectName={'DataOps Console'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'DataOps Console'}
          image={['DataOps services overview']}
          mainText={`Unlock Data Potential with ${projectName}`}
          subTitle={`Discover our range of services designed to optimize your DataOps processes. From asset management to seamless integrations, ${projectName} empowers your team to achieve more.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'DataOps Console'}
          image={['Data integration tools display']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Service Features`}
          subTitle={`Our platform offers a suite of features to enhance your DataOps capabilities. Discover how ${projectName} can transform your data management and integration processes.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'DataOps Console'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <ContactFormSection
          projectName={'DataOps Console'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact support team image']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you and will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'DataOps Console'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
