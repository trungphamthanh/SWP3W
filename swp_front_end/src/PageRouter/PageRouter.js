import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../Components/Guest&Customer/Home/Home';
import Service from '../Components/Guest&Customer/Service/Service';
import FAQs from '../Components/Guest&Customer/FAQs/FAQs';
import BookingForm from '../Components/Guest&Customer/BookingForm/BookingForm';
import Policy from '../Components/Guest&Customer/Policy/Policy';
import Login from '../Components/Guest&Customer/Login/Login';
import SignUp from '../Components/Guest&Customer/SignUp/SignUp';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurTeam from '../Components/Guest&Customer/OurTeam/OurTeam';
import BookingManagement from '../Components/Manager/BookingManagement/BookingManagement';
import ScheduleManagement from '../Components/Manager/ScheduleManagement/ScheduleManagement';
import ServiceManagement from '../Components/Manager/ServiceManagement/ServiceManagement';
import DoctorManagement from '../Components/Manager/DoctorManagment/DoctorManagement';
import AccountManagement from '../Components/Admin/AccountManagement/AccountManagement';
import BookingDetail from '../Components/Manager/BookingDetail/BookingDetail';
import BookingHistory from '../Components/Guest&Customer/BookingHistory/BookingHistory';
import 'react-toastify/dist/ReactToastify.css';

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
      },
      {
        path: 'history',
        element: <BookingHistory/>
      }
    ],
  },
  {
    path: '/manager/',
    element: <App />,
    children: [
      {
        path: 'booking',
        element: <BookingManagement/>,
      },
      {
        path: 'services',
        element: <ServiceManagement/>
      },
      {
        path: 'doctor',
        element: <DoctorManagement/>
      },
      // {
      //   path: 'schedule',
      //   element: <ScheduleManagement/>
      // },
      {
      path: 'booking/detail',
      element: <BookingDetail/>
      },
    ]
  },
  {
    path: "/admin/",
    element: <App/>,
    children: [
      {
        path: 'account',
        element: <AccountManagement/>
      }
    ]
  }
]);

const PageRouter = () => {
    return (
      <>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    );
  };
  
  export default PageRouter;