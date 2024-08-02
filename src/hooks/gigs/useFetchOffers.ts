import { getClientOffers, getFreelancerOffers } from '@/api/gigs';
import { useToast } from '@/components/ui/use-toast';
import { GigsContentType, User } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useFetchOffers = (
  loggedInUser: User | null,
  gigsContentType: GigsContentType,
  status: string
) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      if (loggedInUser?.accountId) {
        let response: any;

        switch (gigsContentType) {
          case GigsContentType.Sent:
            response = await getClientOffers(loggedInUser?.accountId, status);
            break;
          case GigsContentType.Received:
            response = await getFreelancerOffers(
              loggedInUser?.accountId,
              status
            );
            break;
        }

        if (response.statusText === 'OK') {
          return response.data;
        } else {
          toast({
            title: 'Failed to fetch offers',
            description: 'Try again. If this issue persists, contact support.',
          });
          throw new Error(
            'Fetching offers failed. Server returned a failed response.'
          );
        }
      }
    },
    enabled: !!loggedInUser,
  });
};
