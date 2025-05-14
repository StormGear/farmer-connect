import { getAllProduceItems } from "@/api/produce_upload";
import  { useState,  createContext, ReactNode, useContext } from "react";

export type MenuContextType = {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    getProduceMenuItems: () => Promise<{ success: boolean; message: string; }>;
};

export type MenuItem = {
    id: string;
    name: string;
    images?: string[];
    description: string;
    price: number;
    };

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const getProduceMenuItems = async () => {
      try {
        const response = await getAllProduceItems();
        console.log('response', response.data)
        if (!response.success) {
          console.error('Error fetching produce items:', response.message);
          return {
            success: false,
            message: `error fetching produce items: ${response.message}`,
          };
        }
  
        
        console.log('produce items', response.data);
        // pack the produce items into an array
        const produceItemsArray = response.data?.map((item: any) => (
          {
            id: item.id,
            name: item.produce_name,
            images: item.images,
            description: item.produce_description,
            price: item.price,
          }
        ));
        setMenuItems(produceItemsArray ?? []);
  
        return {
          success: true,
          message: `produce items fetched successfully`,
        };
      
      }
      catch (error) {
        console.error('Error fetching produce items:', error);
        return {
          success: false,
          message: `error fetching produce items: ${error}`,
        };
      }
    };



  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems, getProduceMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
export default MenuProvider;