import { apiconnector } from "../apiConnector";
import { useToast } from '@/hooks/use-toast'
import {setLoading,setSignUpData,setToken} from "@/slices/authSlice"


export function signup(firstName, lastName, email, password,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response = await apiconnector("POST",
            "https://crm-t5jp.vercel.app/api/v1/users/signup",
            {
                firstName,
                lastName,
                email,
                password
            })
            console.log("signup resp ",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            // toast({
            //     variant:"default",
            //     title: "बधाई🎊🎊🎉 Signup Successfull",
            //   })
            navigate('/login')
        } catch (error) {
            console.log(error,"frotnend");
            
        }finally{
            dispatch(setLoading(false))
        }
    }
}

export function login(email,password,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response = await apiconnector("POST",
            "https://crm-t5jp.vercel.app/api/v1/users/login",
            {
                email,
                password
            })
            dispatch(setSignUpData(response.data.userExists))
            localStorage.setItem("authToken" , response.data.token)
            console.log("login a",response);
        // if(!response){
        //     throw new Error(response.data.message)
        // }
        // toast.success("Login Succesfull")
        // try {
        //     const gresp = await apiconnector("POST","https://iste-ctf-backend.vercel.app/userd/user",{
        //         email
        //     })
        //     console.log("printing gresp",gresp);
        //     // if(!gresp){
        //     //     throw new Error(gresp.data.message)
        //     // }
        //     console.log(gresp.data);
        //     console.log(gresp.data.user.game.questionNo);
        //     dispatch(setquestionNo(gresp.data.user.game.questionNo))
        //     dispatch(setScore(gresp.data.user.teamPoints))
        //     dispatch(setLevel(gresp.data.user.game.level))
        //     dispatch(setteamName(gresp.data.user.teamname))
        //     dispatch(setFlags(gresp.data.user.game.flag))
        //     navigate('/home')
        // } catch (error) {
        //     console.log("api gresp error",error);
        // }
        // dispatch(setToken(response.data.token))
        // dispatch(setUser({
        //     ...response.data.user , image:response.data.user.image
        // }))
        // dispatch(setEmail(email))
        // localStorage.setItem("token",JSON.stringify(response.data.user.token))
        navigate('/home')
        } catch (error) {
            console.log("login api error");
            console.log(error);
        }
        finally{
            dispatch(setLoading(false))
            // toast.dismiss(toastId)
        }
    }
}

export function createSegment(segmentName,description,conditions){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",
                "https://crm-t5jp.vercel.app/api/v1/audience/createsegment",
                {
                    segmentName,
                    description,
                    conditions
                }
            )
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
}
export function createCustomer(firstName,
    lastName,
    email,
    phone,
    address,
    totalSpending,
    lastVisitDate,
    visitCount){
        return async(dispatch)=>{
            try {
                const response = await apiconnector("POST",
                    "https://crm-t5jp.vercel.app/api/v1/customers/create",
                    {
                        firstName,
                        lastName,
                        email,
                        phone,
                        address,
                        totalSpending,
                        lastVisitDate,
                        visitCount
                    }
                )
                console.log("printing status",response.status)
            } catch (error) {
                console.log(error)
            }
        }
}

export function createCampaign(name,description,startDate,endDate,audienceSegment){
        return async(dispatch)=>{
            try {
                const response = await apiconnector("POST",
                    "https://crm-t5jp.vercel.app/api/v1/campaigns/createcampaigns",
                    {
                        name,
                        description,
                        startDate,
                        endDate,
                        audienceSegment
                    }
                )
                console.log("printing status",response.status)
            } catch (error) {
                console.log(error)
            }
        }
}