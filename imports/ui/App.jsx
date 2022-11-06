import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import DrawerAppBar from './components/Toolbar'
import Home from './screens/Home/Home';
import NotFound from './screens/NotFound/NotFound';

export const App = () => (
  <BrowserRouter >
    <Routes>
      <Route element={<DrawerAppBar />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter >
);
