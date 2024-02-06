import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      
        <div>
          
          <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/'>back home</Link>
        </div>
     
    );
  }
  return (
    
      <div>
        <h3>something went wrong</h3>
      </div>
    
  );
};
export default Error;
