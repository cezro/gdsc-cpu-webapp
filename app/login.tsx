import Image from "next/image"; 

function Login() {
    return (
        <div className="w-full bg-[#07063D] flex items-center justify-center min-h-screen">
            <div className="w-full lg:w-1/2 p-8 ">
                <div className="justify-center flex items-center">
                    <img className="justify-center" src="gdsc_logo.png" alt="GDSC Logo" width={150} height={150}/>
                </div>

                <div className="text-white flex items-center justify-center mb-6 text-xs">GDSC-CPU</div>
                <div className="w-full">
                    <div className="mb-2 ">
                        <input className="w-full rounded-sm p-2 text-xs" type="text" placeholder="Email/username"/>
                    </div>
                    <div className="mb-2 ">
                    <input className="w-full rounded-sm p-2 text-xs" type="text" placeholder="Password"/>
                    

                    </div>
                </div>
                <div className="max-lg:z-20 bg-[#4285F3] p-2 rounded-sm ">
                    <text className="text-white justify-center flex items-center text-xs">Log In</text></div>
                <div className="text-white mb-7 ">
                    <text className="text-xs">Forgot password?</text></div>
                <div className="border-gray-300 border-2 p-3 rounded-md">
                    <text className="text-white text-xs justify-center flex items-center">No account yet? Sign Up</text>
                    </div>
            </div>

        </div>
        
    )
}

export default Login