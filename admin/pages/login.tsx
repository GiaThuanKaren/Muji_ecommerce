// pages/login.tsx
import { useRouter } from "next/router";
import React from "react";
import { LoginEmployee } from "src/services/api/employee";
import { routingLink } from 'src/utils/routingLink'

const Login: React.FC = () => {

  const { push } = useRouter()
  const [isLoading, setIsLoading] = React.useState(false);
  const [employeeInfo, setEmployeeInfo] = React.useState({
    employeeEmail: "",
    employeePassword: ""
  });

  const handleLogin = async function () {
    
    try {
      
      setIsLoading(true)
      let result = await LoginEmployee(employeeInfo);
        
        if (result == true) {
          push(routingLink.dashboard)
        }
    } catch (error) {
        console.error('Error fetching ', error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmployeeInfo({
                ...employeeInfo,
                employeeEmail: e.target.value
              })
            }}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => {
              setEmployeeInfo({
                ...employeeInfo,
                employeePassword: e.target.value
              })
            }}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;