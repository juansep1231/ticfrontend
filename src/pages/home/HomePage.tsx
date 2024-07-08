import { Heading, Flex, Text, Image, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { moduleCardData } from '../../utils/modules-card-data';
import { Member } from '../../types/organizational-models';
import { modulesFeatIcons } from '../../utils/modules-card-data';
import { SubscriptionPlan } from '../../types/subscription-models';

import { LinkCard } from './components/LinkCard';
import { MemberCard } from './components/MemberCard';
import { SubscriptionPlanCard } from './components/SubscriptionPlanCard';
import { MisionVisionCard } from './components/MisonVisionCard';

const plans: SubscriptionPlan[] = [
  {
    id: 1,
    planName: 'Prueba',
    price: 10,
    benefits:
      'Acceso a cursos gratuitos, Colada morada en el dia de los difuntos, Funda de caramelos en navidad',
    academicPeriod: '2024-B',
  },
  {
    id: 2,
    planName: 'Basic',
    price: 15,
    benefits:
      'Acceso a cursos gratuitos, Colada morada en el dia de los difuntos, Funda de caramelos en navidad',
    academicPeriod: '2024-B',
  },
  {
    id: 1,
    planName: 'Premium',
    price: 10,
    benefits:
      'Acceso a cursos gratuitos, Colada morada en el dia de los difuntos, Funda de caramelos en navidad',
    academicPeriod: '2024-B',
  },
];

const members: Member[] = [
  {
    id: 1,
    firstName: 'Valery',
    lastName: 'Vallejo',
    birthDate: '1995-01-01',
    cellphone: '0983885744',
    faculty: 'Facultad de Ingeniería Eléctrica y Electrónica',
    career: 'Ingeniería Eléctrica',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    position: 'Presidente',
  },
  {
    id: 2,
    firstName: 'Javier',
    lastName: 'Revelo',
    birthDate: '1995-01-01',
    cellphone: '0983885744',
    faculty: 'Facultad de Ingeniería Eléctrica y Electrónica',
    career: 'Ingeniería Eléctrica',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    position: 'Vicepresidente Financiero',
  },
  {
    id: 3,
    firstName: 'Juan',
    lastName: 'Posso',
    birthDate: '1995-01-01',
    cellphone: '0983885744',
    faculty: 'Facultad de Ingeniería Eléctrica y Electrónica',
    career: 'Ingeniería Eléctrica',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    position: 'Vicepresidente Académico',
  },
  {
    id: 4,
    firstName: 'Cristian',
    lastName: 'Verduga',
    birthDate: '1995-01-01',
    cellphone: '0983885744',
    faculty: 'Facultad de Ingeniería Eléctrica y Electrónica',
    career: 'Ingeniería Eléctrica',
    semester: 'Noveno',
    email: 'valery.vallejo@epn.edu.ec',
    position: 'Vicepresidente Académico',
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
      return <SubscriptionPlanCard key={plan.id} plan={plan} />;
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
      <Flex
        flex="1"
        sx={{
          flexDirection: 'column',
          px: { base: 'md', lg: '3xl' },
          gap: '3xl',
        }}
      >
        <Flex sx={{ flexDirection: 'column', gap: 'xl' }}>
          <Heading>Sistema Cloud ERP de FEPON</Heading>
          <Flex
            sx={{
              flexDirection: { base: 'column', lg: 'row' },
              gap: '3xl',
              width: '100%',
            }}
          >
            <Flex
              sx={{
                justifyContent: 'center',
                width: { sm: '100%', lg: '47%' },
              }}
            >
              <Image
                src="/img/logo.png"
                alt="ERP Fepon"
                sx={{
                  width: { base: 'lg', md: 'auto' },
                }}
              />
            </Flex>
            <Flex
              sx={{
                width: { base: '100%', lg: '51.5%' },
              }}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  pl: { base: 'none', lg: '3xl' },
                  gap: 'lg',
                  borderLeft: { sm: 'none', lg: '1px solid' },
                  borderColor: { sm: 'none', lg: 'surface.default' },
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
        </Flex>

        <Flex sx={{ flexDirection: 'column' }}>
          <MisionVisionCard />
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 'xl' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Conoce más acerca de nuestra gestión
          </Heading>
          <Flex
            sx={{
              flexWrap: 'wrap',
              flexDirection: { base: 'column', lg: 'row' },
              justifyContent: 'space-between',
            }}
          >
            {moduleCardList}
          </Flex>
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 'xl' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Planes de Aportación
          </Heading>
          <Flex
            sx={{
              flexDirection: { base: 'column', lg: 'row' },
              alignContent: { base: 'center', lg: 'none' },
              gap: 'md',
              flexWrap: 'wrap',
            }}
          >
            {planList}
          </Flex>
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 'xl' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Nuestro equipo
          </Heading>
          <Flex
            sx={{
              flexWrap: 'wrap',
              flexDirection: { base: 'column', md: 'row' },
              alignItems: { base: 'center', lg: 'none' },
              gap: { base: 'md', lg: 'lg' },
            }}
          >
            {memberList}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
