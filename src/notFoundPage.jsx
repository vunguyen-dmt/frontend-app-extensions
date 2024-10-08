import { Container } from '@openedx/paragon';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import React from 'react';

const NotFoundPage = () => (
  <main>
    <Header />
    <Container className="py-5" style={{minHeight: '450px'}}>
      <p className="text-center">There is nothing here.</p>
    </Container>
    <Footer />
  </main>
);

export default NotFoundPage;
