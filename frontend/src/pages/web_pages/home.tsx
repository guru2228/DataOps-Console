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
  AboutUsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const features_points = [
    {
      name: 'Comprehensive Data Asset Management',
      description:
        'Easily manage and organize your data assets with intuitive tools. Ensure seamless integration and accessibility for all team members.',
      icon: 'mdiDatabase',
    },
    {
      name: 'Advanced Integration Capabilities',
      description:
        'Define and manage complex integrations with ease. Utilize connectors and pipelines to automate data flow between systems.',
      icon: 'mdiLinkVariant',
    },
    {
      name: 'Role-Based Access Control',
      description:
        'Secure your data operations with role-based permissions. Assign specific roles to team members to ensure data integrity and security.',
      icon: 'mdiShieldAccount',
    },
  ];

  const faqs = [
    {
      question: 'What is ${projectName} and who is it for?',
      answer:
        '${projectName} is a comprehensive platform designed for DataOps teams to manage data assets and integrations. It is ideal for roles such as Admins, Data Ops Managers, Integration Specialists, and more.',
    },
    {
      question: 'How does ${projectName} handle data integrations?',
      answer:
        '${projectName} allows Integration Specialists to define and manage integrations using connectors and pipelines. These can be configured to automate data flow between various systems efficiently.',
    },
    {
      question: 'Can I control user access within ${projectName}?',
      answer:
        'Yes, ${projectName} offers role-based access control, allowing you to assign specific permissions to different user roles, ensuring data security and integrity.',
    },
    {
      question: 'Is there a way to test integrations before deployment?',
      answer:
        'Absolutely. Integration Specialists can submit integration details to Quality Engineers for simulation and testing, ensuring everything works perfectly before going live.',
    },
    {
      question:
        'What support does ${projectName} offer for client organizations?',
      answer:
        '${projectName} provides tools for setting up and managing client organizations and their specific data integrations, with approvals required from Data Procurement Ops and Finance Ops.',
    },
    {
      question: 'How can external users interact with ${projectName}?',
      answer:
        'External users, such as Data Vendor Ops, have read-only access to view their connections, pipelines, and daily metrics, ensuring transparency and collaboration.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`DataOps Management Platform`}</title>
        <meta
          name='description'
          content={`Manage data assets, integrations, and client-specific operations efficiently with our comprehensive DataOps management platform.`}
        />
      </Head>
      <WebSiteHeader projectName={'DataOps Console'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'DataOps Console'}
          image={['DataOps team collaborating efficiently']}
          mainText={`Empower Your DataOps with ${projectName}`}
          subTitle={`Streamline data asset management and integrations with our robust platform. Enhance efficiency and collaboration across your DataOps team.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'DataOps Console'}
          image={['Data management tools overview']}
          withBg={0}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Enhance your DataOps efficiency with ${projectName}. Explore our powerful features designed to streamline data management and integration processes.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'DataOps Console'}
          image={['Team collaborating on data solutions']}
          mainText={`Transforming DataOps with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to revolutionizing data operations. Our platform empowers teams to manage data assets and integrations efficiently, fostering innovation and collaboration.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <FaqSection
          projectName={'DataOps Console'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'DataOps Console'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
