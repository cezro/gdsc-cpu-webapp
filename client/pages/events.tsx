import Image from 'next/image';
import { useState } from "react";

function Events() {
    const [cards] = useState([
        {
            title: 'GDSC-CPU-EVENTS',
            
            
        },
        {
            title: 'GDSC-CPU-EVENTS',
            
        },
        {
            title: 'GDSC-CPU-EVENTS',
            
        },
        {
            title: 'GDSC-CPU-EVENTS',
            
        },
        {
            title: 'GDSC-CPU-EVENTS',
            
        },
        {
            title: 'GDSC-CPU-EVENTS',
            
        },
    ])
    return (
        <div className="bg-[#07063d]"> 
            <section className="min-h-full flex flex-col items-center">
                <div className="container max-w-2xl mx-auto px-5  "></div>
                <h1 className=" w-full px-5 py-6 h-20 text-3xl leading-6 text-center mb-10  bg-gradient-to-bl border text-white ">EVENTS</h1>
                <div className="cards flex flex-wrap justify-center ">
                    {
                        cards.map((card, i) => (
                    <div key={i} className="min-h-[280px] min-w-[280px] max-w-[300px] card flex flex-col items-center bg-none rounded-lg p-6 mb-8 transition duration-300 border-2 border-white hover:border-[#109C58] hover:bg-[#FABC0A] ">
                        <image className="h-[220px] w-[220px] bg-white " ></image>
                        <br></br>
                        <h3 className=" text-white transition duration-300 hover:text-[#07063d]">{card.title}</h3>
                        <button className="btn mt-3 text-black h-8 w-24 bg-white rounded-xl transition duration-300 hover:bg-black hover:text-white">View More</button>
                    </div>
                        ))
                    }
                </div>
            </section>
        </div>
        );
    }
    
    export default Events;