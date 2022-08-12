import './styles/App.scss';
import { Routes, Route } from 'react-router-dom';

import PageContainer from './components/Containers/PageContainer';
import Navbar from './components/Navbar/Navbar';
import MobileNavbar from './components/Navbar/MobileNavbar';
import MainContainer from './components/Containers/MainContainer';
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthProvider';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';

import { QueryClientProvider } from 'react-query';
import { queryClient } from './constants/config';

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PageContainer optionClass={'pageContainer'}>
            <Navbar />
            <div className="mobileMenu">
              <MobileNavbar />
            </div>
            <Routes>
              {/* AUTH PAGE */}
              <Route path="/auth" element={<Auth />} />
              {/* PROTECTED ROUTES */}
              <Route element={<ProtectedRoutes />}>
                {/* HOME */}
                <Route path="/" element={<Home />} />
                {/* SETTINGS */}
                <Route path="/settings" element={<Settings />} />
                {/* PROFILE */}
                <Route path="/profile" element={<Profile />} />
                {/* EXPENSES */}
                <Route path="/expenses" element={<Expenses />} />
                {/* CATEGORIES */}
                <Route path="/categories" element={<Categories />} />

                {/* 404 */}
                <Route
                  path="/*"
                  element={
                    <MainContainer>
                      <span style={{ fontSize: '1.2rem' }}>
                        404 Page Not Found
                      </span>
                    </MainContainer>
                  }
                />
              </Route>
            </Routes>
          </PageContainer>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
