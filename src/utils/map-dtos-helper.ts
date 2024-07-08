import { CreateUpdateAssociationDTO } from "../hooks/AdminHooks/updateInformationTableHook";
import { OrganizationalInfo } from "../types/organizational-models";


export const mapOrganizationalInfoToAsdociationDTO = (organizationalInfor:  OrganizationalInfo): CreateUpdateAssociationDTO => {
    return {
      mission: `${organizationalInfor.mission}`, 
      vision: `${organizationalInfor.vision}`, 
    };
  };
  