import { useContext, createContext, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const ServiceContext = createContext()

const initSelectedService = [
    // {
    //   id: uuidv4(),
    //   serviceId: null,
    // },
  ];

export const ServiceContextProvider = ({children}) => {
    const [selectedBookingService, setSelectedBookingService] = useState(initSelectedService)
    const combine = (serviceData) => {
        const combinedArray = serviceData?.map(obj1 => {
            const matchingObj2 = selectedBookingService.find(obj2 => obj2.serviceId === obj1.id);
            return { ...obj1, ...matchingObj2 };
          });
          console.log(combinedArray)
          setSelectedBookingService(combinedArray)
    }
    const AddServices = (id) => {
        let index = selectedBookingService.findIndex((item) => item.serviceId === id)

        if(index === -1){
            let service = {
            id:uuidv4(),
            serviceId: id,
            serviceType: "Low",
          }
      
          setSelectedBookingService([...selectedBookingService, service])
        }
    }
    const DeleteService = (id) => {
        let serviceListCLone = _.cloneDeep(selectedBookingService)
        serviceListCLone = serviceListCLone.filter((service) => service.serviceId !== id)
        setSelectedBookingService(serviceListCLone)
    }

    const UpdateService = (id, value) => {
        let serviceListCLone = _.cloneDeep(selectedBookingService)
        let index = serviceListCLone.findIndex((service) => service.serviceId === id)
        if (index > -1){
            serviceListCLone[index].serviceType=value
            setSelectedBookingService(serviceListCLone)
        }
    }

    const Clear = () => {
        setSelectedBookingService([])
    }

    return (
        <ServiceContext.Provider value={{selectedBookingService, AddServices, DeleteService, UpdateService, combine, Clear}}>
            {children}
        </ServiceContext.Provider>
    );
}

export const UseServices = () => {
    return useContext(ServiceContext);
}