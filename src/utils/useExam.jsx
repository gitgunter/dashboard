import { useQuery } from 'react-query';
import { getAllExams } from '../services/examService';

function useExam() {
  const query = useQuery(['exams'], getAllExams);

  return query;
}
export default useExam