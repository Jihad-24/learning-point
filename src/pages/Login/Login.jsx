/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {

    const { signIn, signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // console.log('login location', location);

    const handleLogin = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);

        // login user
        signIn(email, password)
            .then(result => {
                // console.log(result.user);
                // success alert
                Swal.fire({
                    icon: 'success',
                    title: 'User Login Successfull'
                })
                // navigate after login
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                setLoginError(error.message)
                // error alert
                Swal.fire({
                    icon: 'error',
                    title: `${error.message}`
                })
            })

    }
    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                // console.log(result.user)
                // success alert
                Swal.fire({
                    icon: 'success',
                    title: 'User Login Successfull'
                })
                // navigate after login
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                // error alert
                Swal.fire({
                    icon: 'error',
                    title: `${error.message}`
                })
            })
    }
    console.log(location);

    return (
        <div>
            <NavBar></NavBar>
            <div >
                <h1 className="text-4xl mt-10 font-bold text-center" data-aos="fade-down">Login your account!</h1>
                <form
                    onSubmit={handleLogin}
                    className="card-body md:w-3/4 lg:w-1/2 mx-auto">
                    {
                        loginError && <p className="text-red-700">{loginError}</p>
                    }
                    <div className="form-control " data-aos="fade-right">
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Your Email Address"
                            className="input input-bordered bg-slate-200" required />
                    </div>
                    <div className="form-control relative" data-aos="fade-left">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Your Password"
                            className="input input-bordered bg-slate-200" required />
                        <span className="absolute top-[3.2rem] right-3" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                        <label className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover">
                                Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-4" >

                        <button  className="btn btn-primary">Login</button>

                    </div>

                </form>
                <div className="card-body md:w-3/4 lg:w-1/2 mx-auto" >

                    <button onClick={handleGoogleSignIn} className="btn btn-neutral">Login With Google</button>
                </div>
                <p className="text-center text-[#706F6F] font-medium">Don’t Have An Account ?
                    <Link to={"/register"} className="text-[#F75B5F] font-bold"> Register</Link> </p>
            </div>
        </div>
    );
};

export default Login;