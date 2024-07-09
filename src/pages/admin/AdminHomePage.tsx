import { useEffect, useState } from 'react';
import { Heading, Flex, Text, Image, Button } from '@chakra-ui/react';

import { Member, OrganizationalInfo } from '../../types/organizational-models';

import { AddInformationModal } from './components/AddInformationModal';
import { AddMemberModal } from './components/AddMemberModal';
import { AdminMembersTable } from './components/AdminMembersTable';
import { EditMemberModal } from './components/EditMemberModal';
import { InformationTable } from './components/InformationTable';
import { EditInformationModal } from './components/EditInformationModal';
import { AddIcon } from '@chakra-ui/icons';
import { useFetchAdministrativeMembers } from '../../hooks/admin/fetchAdminTableHook';
import { useFetchAssociations } from '../../hooks/admin/fetchInformationTableHook';
import useUpdateAssociation from '../../hooks/admin/updateInformationTableHook';
import usePatchAssociationState from '../../hooks/admin/patchInformationTableHook';

export const AdminHome = () => {
  const [isAddInfoModalOpen, setAddInfoModalOpen] = useState(false);
  const [isEditInfoModalOpen, setIsEditInfoModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<OrganizationalInfo | null>(
    null
  );

  const {
    administrativeMembers,
    isLoadingAdministrativeMembers,
    administrativeMemberErrors,
  } = useFetchAdministrativeMembers();
  const {
    associations,
    isLoadingAssociations,
    associationErrors,
    updateAssociationState,
  } = useFetchAssociations();
  const { updateAssociation, updateError } = useUpdateAssociation();
  const { patchAssociationState, patchError } = usePatchAssociationState();

  const handleAddMember = (newMember: Member) => {
    console.log('Miembro agregado:', newMember);
  };

  const handleEditMember = (data: { member: Member }) => {
    console.log('Miembro actualizado:', data.member);
  };

  const handleDeleteMember = (id: number | undefined) => {
    console.log('Miembro eliminado:', id);
  };

  const openMemberEditModal = (member: Member) => {
    setSelectedMember(member);
    setIsEditMemberModalOpen(true);
  };

  const openInfoEditModal = (info: OrganizationalInfo) => {
    setSelectedInfo(info);
    setIsEditInfoModalOpen(true);
  };

  const handleEditInformation = async (data: { info: OrganizationalInfo }) => {
    try {
      const updatedInfo = {
        mission: data.info.mission,
        vision: data.info.vision,
      };
      await updateAssociation(data.info.id!, updatedInfo);

      updateAssociationState(data.info.id!, { ...data.info, ...updatedInfo });

      console.log('Updated organizational information:', data.info);
      console.log('Informacion organizacional actualizada:', data.info);
    } catch (error) {
      console.error('Failed to update association:', error);
    }
  };

  const handleDeleteInfo = async (id: number | undefined) => {
    try {
      await patchAssociationState(id!);
      updateAssociationState(id!, { state_id: 2 });
      console.log('Informacion organizacional eliminada:', id);
    } catch (error) {
      console.error('Failed to update association state:', error);
    }
  };

  return (
    <Flex
      flex="1"
      sx={{ px: { base: 'md', lg: '3xl' }, flexDirection: 'column' }}
    >
      <Flex sx={{ flexDirection: 'column', gap: '3xl' }}>
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
                width: { sm: 'lg', lg: 'auto' },
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
                ¡Bienvenidos al Sistema Cloud ERP de la FEPON! Para comenzar, no
                olvides añadir a tu equipo de trabajo y la información
                organizacional de la nueva federación.
              </Text>
              <Text sx={{ textColor: 'text.default' }}>
                Para ingresar un nuevo miembro administrativo, la misión, visión
                y objetivo de FEPON, da clic en los siguientes botones.
              </Text>
              <Flex sx={{ gap: 'sm' }}>
                <Button
                  leftIcon={<AddIcon />}
                  onClick={() => setAddInfoModalOpen(true)}
                >
                  Información
                </Button>
                <Button
                  leftIcon={<AddIcon />}
                  onClick={() => setIsAddMemberModalOpen(true)}
                >
                  Miembro
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex sx={{ flexDirection: 'column', gap: 'xl', pb: 'xl' }}>
          <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
            Información Organizacional
          </Heading>
          <Flex
            sx={{
              flexWrap: 'wrap',
              flexDirection: { base: 'column', md: 'row' },
              gap: 'md',
            }}
          >
            <InformationTable
              info={associations}
              isLoading={isLoadingAssociations}
              error={associationErrors}
              onEdit={openInfoEditModal}
              onDelete={handleDeleteInfo}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex sx={{ flexDirection: 'column', gap: 'xl', pb: 'xl' }}>
        <Heading sx={{ fontSize: 'heading.desktop.subtitle' }}>
          Miembros Administrativos
        </Heading>
        <Flex
          sx={{
            flexWrap: 'wrap',
            flexDirection: { sm: 'column', md: 'row' },
            gap: 'md',
          }}
        >
          <AdminMembersTable
            members={administrativeMembers}
            isLoading={isLoadingAdministrativeMembers}
            error={administrativeMemberErrors}
            onEdit={openMemberEditModal}
            onDelete={handleDeleteMember}
          />
        </Flex>
      </Flex>
      <AddInformationModal
        isOpen={isAddInfoModalOpen}
        onClose={() => setAddInfoModalOpen(false)}
      />
      <EditInformationModal
        isOpen={isEditInfoModalOpen}
        onClose={() => setIsEditInfoModalOpen(false)}
        info={selectedInfo}
        onSubmit={handleEditInformation}
      />
      <AddMemberModal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
      />
      <EditMemberModal
        isOpen={isEditMemberModalOpen}
        onClose={() => setIsEditMemberModalOpen(false)}
        member={selectedMember}
        onSubmit={handleEditMember}
      />
    </Flex>
  );
};
