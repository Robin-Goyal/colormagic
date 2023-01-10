import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface Properties {
  type?: "success" | "error" | "info" | "warning";
  title: string;
  content: string;
  autoClose?: boolean;
  time?: number;
}

interface IState {
  show: () => void;
  setProperties: (properties: Properties) => void;
}

const NotificationContext = createContext<IState | null>(null);

const NotificationProvider = (props: any) => {
  const [properties, setProperties] = useState<Properties>({
    type: "success",
    title: "",
    content: "",
    autoClose: true,
  });
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Snackbar
        open={show}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setShow(false)}
      >
        <Alert severity={properties.type} onClose={() => setShow(false)}>
          {properties.content}
        </Alert>
      </Snackbar>
      <NotificationContext.Provider
        value={{
          show: () => setShow(true),
          setProperties: (newProperties: Properties) =>
            setProperties({
              ...properties,
              ...newProperties,
              type: newProperties.type || "success",
            }),
        }}
        {...props}
      />
    </>
  );
};

function useNotification() {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error("useNotification must be used within a CountProvider");
  }
  return context;
}

export { NotificationProvider, useNotification };
