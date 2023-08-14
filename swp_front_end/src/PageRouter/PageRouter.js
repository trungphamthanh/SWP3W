import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../Components/Guest&Customer/Home/Home';
import Service from '../Components/Guest&Customer/Service/Service';
import FAQs from '../Components/Guest&Customer/FAQs/FAQs';
import BookingForm from '../Components/Guest&Customer/BookingForm/BookingForm';
import Policy from '../Components/Guest&Customer/Policy/Policy';
import Login from '../Components/Guest&Customer/Login/Login';
import SignUp from '../Components/Guest&Customer/SignUp/SignUp';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurTeam from '../Components/Guest&Customer/OurTeam/OurTeam';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'services',
        element: <Service />,
      },
      {
        path: 'faqs',
        element: <FAQs />,
      },
      {
        path: 'booking',
        element: <BookingForm />,
      },
      {
        path: 'policy',
        element: <Policy />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'ourteam',
        element: <OurTeam/>
      }
    ],
  },
]);

const PageRouter = () => {
    return (
        <RouterProvider router={router} />
    );
  };
  
  export default PageRouter;