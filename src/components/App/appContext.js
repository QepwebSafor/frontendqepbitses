import React, { useState } from "react";

export const AppContext = React.createContext({
  isModalOpen: true,
  toggleModal: () => {},
});

const AppContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        toggleModal: toggleModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppContextConsumer = AppContext.Consumer;
export default AppContextProvider;
