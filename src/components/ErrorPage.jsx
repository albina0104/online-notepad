import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error.toString());
  let errorMessage = '';

  switch (error?.code) {
    case 'permission-denied':
      errorMessage = "Sorry, you don't have access to this page";
      break;
    default:
      errorMessage = 'Oops, something went wrong';
  }

  return <h1 className='mt-5 text-center'>{errorMessage}</h1>;
}

export default ErrorPage;
