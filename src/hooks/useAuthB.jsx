import { AccountsBaseUrl } from "@/utils/GlobalVariables";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null)

export const AuthContextProvider = (props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState(null)

    // let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('AuthTokens') ? JSON.parse(localStorage.getItem('AuthTokens')) : null)
    // let [user, setUser] = useState(()=> localStorage.getItem('AuthTokens') ? jwtDecode(localStorage.getItem('AuthTokens')) : null)

    // const router = useRouter()

    // const loginUser = async (e)=>{
    //     // e.preventDefault()
    //     //   const response = await fetch(AccountsBaseUrl+'/v1/user/login/', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //         // 'Authorization': 'Bearer your-auth-token',
    //     //     },
    //     //     body: JSON.stringify(payload ),
    //     // })
    //     // .then(response => response.json())
    //     // .then(data => {
    //     //   console.log("data===>",data);
    //     //   if (data.status_code === 1000) {
    //     //       console.log('Login successfully!');
    //     //       // ====== Login Success =================
    //     //       toast.success(data.message)
    //     //       if (isAdmin) {
    //     //         router.push('/admin')
    //     //       }else {
    //     //         router.push('/')
    //     //       }
    //     //   }else if(data.status_code === 1001){
    //     //     toast.error(data.message)
    //     //   }
    //     //   setLoading((prev) => ({...prev,login:false}))
        
    //     // })
    //     console.log('e==>',e); 
    //     try{
    //         let response = await fetch(AccountsBaseUrl+'/v1/user/login/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({'username':e.username,'password':e.password})
    //     })
    //     let data = await response.json()
    //     console.log('data==>',data); 
    //     if(data.status_code === 1000){
    //         toast.success(data.message)
    //         // message.success('successfully loggedin.');
    //         // setAuthTokens(data)
    //         // setUser(jwtDecode(data.access))
    //         // localStorage.setItem('AuthTokens',JSON.stringify(data))
    //         // navigate('/dashboard')
    //     }else if (data.status_code === 1001){
    //         toast.error(data.message)
    //         // message.warning(data.message)
    //         // setLoading(false)
    //         // if (data.username && data.password && !data.is_verified){
    //         //     navigate('/account-verify')
    //         // }
    //     }
    //     else{
    //         // message.error('Some error occured! Please try again.');
    //         // setLoading(false)
    //     }
    //    }
    //    catch(error){
    //     if (error instanceof TypeError && error.message === 'Failed to fetch') {
    //         message.error('Network error occurred. Please check your internet connection.');
    //     } else {
    //         message.error('Some error occurred! Please try again.');
    //     }
    //    }
    // }
    


    
    

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        // loginUser,
    }
    return (
        <AuthContext.Provider value={value} {...props} />
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === null) {
        throw new Error("useAuth must be used whithin a AuthContextProvider")
    }

    return context
};