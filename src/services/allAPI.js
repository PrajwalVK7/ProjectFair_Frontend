// 1) register user

import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

// register
export const registerAPI = async (user) => {
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

// login

export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

// to upload project detials

export const uploadProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

// to display home projects

export const getHomeProjectsAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/project/home-project`,"","")
}

// all project
// query parameters syntax path?key=value
export const getAllProjectAPI = async(searchkey,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/project/all-project?search=${searchkey}`,"",reqHeader)
}

// get user project

export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/project/user-project`,"",reqHeader)
}

// edit project

export const editUserProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}