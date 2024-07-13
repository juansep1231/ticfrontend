import { useState } from 'react';
import { SubscriptionPlan } from '../../types/subscription-models';
import { CreateUpdateContributionPlanDTO } from './updateContributorPlan';


export const usePostContributionPlan = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<Error | null>(null);
  const [postedContributionPlan, setPostedContributionPlan] = useState<SubscriptionPlan | null>(null);
  const endpoint = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTRIBUTION_PLANS_ENDPOINT}`;

  const postContributionPlan = async (contributionPlanDTO: CreateUpdateContributionPlanDTO) => {
    setIsPosting(true);
    setPostError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contributionPlanDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${response.status} ${response.statusText} - ${errorData.message}`
        );
      }

      const data: SubscriptionPlan = await response.json();
      setPostedContributionPlan(data);
      console.log('Posted contribution plan:', data);
    } catch (error: any) {
      if (error instanceof Error) {
        setPostError(error);
      } else {
        setPostError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsPosting(false);
    }
  };

  return { isPosting, postError, postedContributionPlan, postContributionPlan };
};

export default usePostContributionPlan;
