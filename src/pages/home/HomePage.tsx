import { Box, Heading, Flex, Text, Image, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { moduleCardData } from '../../utils/modules-card-data';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { HomeMember, Plan } from '../../types/organizational-models';
import { modulesFeatIcons } from '../../utils/modules-card-data';

import { LinkCard } from './components/LinkCard';
import { MemberCard } from './components/MemberCard';
import { SubscriptionPlanCard } from './components/SubscriptionPlanCard';

const plans: Plan[] = [
  {
    id: 1,
    title: 'Prueba',
    price: 10,
    benefits: [
      'Acceso a cursos gratuitos',
      'Colada morada en el dia de los difuntos',
      'Funda de caramelos en navidad',
    ],
  },
  {
    id: 2,
    title: 'Gratis',
    price: 15,
    benefits: [
      'Acceso a cursos gratuitos',
      'Colada morada en el dia de los difuntos',
      'Funda de caramelos en navidad',
    ],
  },
  {
    id: 3,
    title: 'Premium',
    price: 20,
    benefits: [
      'Acceso a cursos gratuitos',
      'Colada morada en el dia de los difuntos',
      'Funda de caramelos en navidad',
      'Acceso a cursos gratuitos',
      'Colada morada en el dia de los difuntos',
      'Funda de caramelos en navidad',
    ],
  },
];

const members: HomeMember[] = [
  {
    id: 1,
    name: 'Valery Vallejo',
    position: 'Presidente',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    telf: '0983885744',
  },
  {
    id: 2,
    name: 'Valery Vallejo',
    position: 'Vicepresidente Cultural',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    telf: '0983885744',
  },
  {
    id: 3,
    name: 'Valery Vallejo',
    position: 'Vicepresidente Financiero',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    telf: '0983885744',
  },
  {
    id: 4,
    name: 'Valery Vallejo',
    position: 'Vicepresidente Académico',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    telf: '0983885744',
  },
];

export const Home = () => {
  const moduleCardList = moduleCardData.map((m, i) => {
    const iconIndex = i % modulesFeatIcons.length;
    const icon = modulesFeatIcons[iconIndex];

    return (
      <LinkCard
        key={i}
        to={m.to}
        icon={icon}
        title={m.title}
        description={m.description}
      />
    );
  });

  const planList = plans.map((plan) => {
    {
      return <SubscriptionPlanCard plan={plan} />;
    }
  });

  const memberList = members.map((member, i) => {
    return <MemberCard key={i} member={member} />;
  });

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        minHeight: '100vh',
        gap: 'xl',
      }}
    >
      <Navbar />
      <Box flex="1" sx={{ px: { base: 'md', lg: '3xl' } }}>
        <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
          <Heading>Sistema Cloud ERP de FEPON</Heading>
          <Flex
            sx={{
              flexDirection: { sm: 'column', lg: 'row' },
              gap: '3xl',
              my: '3xl',
            }}
          >
            <Image
              src="/img/logo.png"
              alt="ERP Fepon"
              sx={{
                maxWidth: { sm: 'sm', xl: 'xl' },
                height: 'auto',
                mx: 'auto',
              }}
            />
            <Flex>
              <Flex
                sx={{
                  flexDirection: 'column',
                  gap: 'lg',
                  borderLeft: { sm: 'none', lg: '1px solid' },
                  borderColor: { sm: 'none', lg: 'surface.default' },
                  pl: { sm: 'none', lg: '3xl' },
                }}
              >
                <Heading
                  sx={{
                    fontSize: 'heading.desktop.subtitle',
                  }}
                >
                  Federación de Estudiantes de la Escuela Politécnica Nacional
                </Heading>
                <Text sx={{ textColor: 'text.default', textAlign: 'justify' }}>
                  ¡Bienvenidos al Sistema Cloud ERP de la FEPON! Gestiona tus
                  actividades y recursos de manera eficiente con nuestra
                  plataforma integral.
                </Text>
                <Text sx={{ textColor: 'text.default' }}>
                  Si tienes dudas, consulta nuestra página de ayuda.
                </Text>
                <Button as={Link} to="/ayuda">
                  Ayuda
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Flex sx={{ flexDirection: 'column', gap: 'xl', pb: 'xl' }}>
            <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
              Conoce más acerca de nuestra gestión
            </Heading>
            <Flex
              sx={{
                flexWrap: 'wrap',
                flexDirection: { base: 'column', md: 'row' },
                gap: 'md',
              }}
            >
              {moduleCardList}
            </Flex>
          </Flex>
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 'xl', pb: 'xl' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Planes de Aportación
          </Heading>
          <Flex
            sx={{
              flexDirection: { sm: 'column', lg: 'row' },
              gap: 'md',
              flexWrap: 'wrap',
            }}
          >
            {planList}
          </Flex>
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 'xl', pb: 'xl' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Nuestro equipo
          </Heading>
          <Flex
            sx={{
              flexWrap: 'wrap',
              flexDirection: { sm: 'column', md: 'row' },
              gap: 'md',
            }}
          >
            {memberList}
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </Flex>
  );
};
