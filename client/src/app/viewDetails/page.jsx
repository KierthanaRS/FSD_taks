"use client"
import React from 'react';
import {useState,useEffect} from 'react'

const ViewDeatils=()=>{
    const[ data,setData]=useState("")
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch-details`,{
                method: "GET",
                headers: { "Content-Type": "application/json" },
              });
            const data=await result.json();
            setData(data.data)
        }
    },[])
    return (

    )
}

export default ViewDetails