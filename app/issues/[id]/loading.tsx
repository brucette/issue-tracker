import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, Flex, Box } from '@radix-ui/themes';

const LoadingIssueDetailsPage = () => {
  return (
    <Box className= 'max-w-xl'>
      <Skeleton />
      <Flex gap='3' my='2'>
        <Skeleton width='5rem'/>
        <Skeleton width='8rem'/>
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  )
};

export default LoadingIssueDetailsPage;
