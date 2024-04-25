import { useMutation, useQueryClient } from 'react-query';

function usePostMutation(key, mutationFn = {}) {
  const queryClient = useQueryClient();

  const mutationResult = useMutation(mutationFn, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries([key]);
      const previousData = queryClient.getQueryData([key]);
      queryClient.setQueryData([key], (old) => [...(old || []), newData]);
      return { previousData };
    },
    onError: (err, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([key], context.previousData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });

  return mutationResult;
}

export default usePostMutation;
