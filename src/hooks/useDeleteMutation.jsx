import { useMutation, useQueryClient } from 'react-query';

function useDeleteMutation(key, mutationFn) {
  const queryClient = useQueryClient();

  const mutationResult = useMutation(mutationFn, {
    onMutate: async (idToDelete) => {
      await queryClient.cancelQueries([key]);
      const previousData = queryClient.getQueryData([key]);
      queryClient.setQueryData([key], (old) =>
        old.filter((item) => item.id !== idToDelete)
      );
      return { previousData };
    },
    onError: (err, idToDelete, context) => {
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

export default useDeleteMutation;
