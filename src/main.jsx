import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx';
import TodoApp from './components/todolist/todoApp.jsx';
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
import 'nprogress/nprogress.css';

const router = createBrowserRouter([
  {  
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children:[
      {
        index: true,
        element: <TodoApp/>
      },
      {
        path: "/users",
        element: <UserPage />
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        )
        
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
    
  
)
