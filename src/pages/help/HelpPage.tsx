import React from 'react';
import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';

import { questionsBank, glosaryBank } from '../../utils/help-data';
import { TypeFi } from '../../components/MyIcon';

import { GlosaryCard } from './components/GlossaryCard';
import { Questions } from './components/Questions';

export const HelpPage: React.FC = () => {
  const questionList = questionsBank.map((q, i) => {
    return (
      <Questions
        key={i}
        question={q.question}
        text={q.text}
        image={q.image}
        video={q.video}
      />
    );
  });

  const FeatIcons: TypeFi[] = [
    'FiMessageCircle',
    'FiX',
    'FiCheckSquare',
    'FiCalendar',
    'FiFile',
    'FiTag',
    'FiCreditCard',
    'FiMic',
    'FiSmile',
  ];

  const glosaryList = glosaryBank.map((g, i) => {
    const iconIndex = i % FeatIcons.length;
    const icon = FeatIcons[iconIndex];

    return (
      <GlosaryCard key={i} word={g.word} meaning={g.meaning} icon={icon} />
    );
  });

  return (
    <Flex
      flex="1"
      sx={{ flexDirection: 'column', px: { base: 'md', lg: '3xl' } }}
    >
      <Flex sx={{ flexDirection: 'column', gap: 'md', pb: 'xl' }}>
        <Heading>Ayuda</Heading>
        <Box>
          <Text sx={{ textColor: 'text.default', textAlign: 'justify' }}>
            Recuerda cambiar tu contraseña la primera vez que ingreses al
            sistema. Si tienes dudas de cómo hacerlo, aquí tienes un video
            tutorial del proceso. Recuerda cambiar tu contraseña la primera vez
            que ingreses al sistema. Si tienes dudas de cómo hacerlo, aquí
            tienes un video tutorial del proceso. Recuerda cambiar tu contraseña
            la primera vez que ingreses al sistema. Si tienes dudas de cómo
            hacerlo, aquí tienes un video tutorial del proceso.
          </Text>
        </Box>
        <Box sx={{ mx: 'auto' }}>
          <video controls autoPlay muted src=""></video>
        </Box>
      </Flex>

      <Box>
        <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Glosario
          </Heading>
          <Flex sx={{ mx: { sm: 'none', md: 'lg' } }}>
            <VStack sx={{ gap: 'md' }}>{glosaryList}</VStack>
          </Flex>
        </Flex>
      </Box>

      <Box sx={{ pt: 'lg' }}>
        <Flex sx={{ flexDirection: 'column', gap: 'md' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Preguntas Frecuentes
          </Heading>
          <Flex>
            <VStack sx={{ gap: 'md' }}>{questionList}</VStack>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
