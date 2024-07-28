import React from 'react';
import {
  BrowserRouter,
  MemoryRouter,
  MemoryRouterProps,
} from 'react-router-dom';

interface CustomRouterProps extends MemoryRouterProps {
  initialEntries?: string[];
}

const CustomRouter: React.FC<CustomRouterProps> = ({
  initialEntries,
  children,
  ...rest
}) => {
  if (initialEntries) {
    return (
      <MemoryRouter initialEntries={initialEntries} {...rest}>
        {children}
      </MemoryRouter>
    );
  }

  return <BrowserRouter {...rest}>{children}</BrowserRouter>;
};

export default CustomRouter;
