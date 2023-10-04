import React from 'react'
import {BarChart, CartesianGrid, ResponsiveContainer}from 'recharts'
const data =[
    {Parada:1, Temperatura:20, Presion: 12, Profundidad: 35 },
    {Parada:2, Temperatura:19, Presion: 11, Profundidad: 35},
    {Parada:3, Temperatura:18, Presion: 10, Profundidad: 3},
    {Parada:4, Temperatura:17, Presion: 27, Profundidad: 30},
    {Parada:5, Temperatura:16, Presion: 25, Profundidad: 30},
    {Parada:6, Temperatura:15, Presion: 25, Profundidad: 30},
    {Parada:7, Temperatura:14, Presion: 25, Profundidad: 30},
]



function Graficos() {
  return (
    <ResponsiveContainer data = {data} width="100%" height="100%" >
        <BarChart 
        data={data} 
        width={500} 
        height={300} 
        margin={{
        top:5,right:30,left:20,bottom:5
        }}>
            
        <CartesianGrid/>
        </BarChart>

    </ResponsiveContainer>
  )
}

export default Graficos