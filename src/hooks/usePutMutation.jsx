import { useMutation, useQueryClient } from 'react-query';

function usePutMutation(key, mutationFn) {
  const queryClient = useQueryClient();

  const mutationResult = useMutation(mutationFn, {
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries([key]);
      const previousData = queryClient.getQueryData([key]);
      queryClient.setQueryData([key], (oldData) => {
        const index = oldData.findIndex((item) => item.id === updatedData.id);
        if (index === -1) return oldData;

        // Crea una copia del estado anterior y actualiza el elemento con los nuevos datos
        const newData = [...oldData];
        newData[index] = { ...newData[index], ...updatedData };
        return newData;
      });
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

export default usePutMutation;
