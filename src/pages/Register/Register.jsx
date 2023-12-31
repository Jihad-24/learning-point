/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Shared/NavBar/NavBar";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from "sweetalert2";


const Register = () => {

    const { createUser, signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const terms = form.get('terms');
        const email = form.get('email');
        const password = form.get('password');
        console.log(
            terms, email, password);

        // reset error & success
        setRegisterError('');
        setSuccess('');

        // validition of password and term
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer!');
            return;
        }
        else if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/
            .test(password)) {
            setRegisterError('Your password should have at least one uppercase and one special character!');
            return;
        }
        else if (!terms) {
            setRegisterError('Please Accept Our Terms and Condition!');
            return;
        }

        // create User
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully')
                // success alert
                Swal.fire({
                    icon: 'success',
                    title: 'User Created Successfully'
                })
                // navigate after register
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                setRegisterError(error.message)
                //  error alert
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
    console.log(navigate);

    return (
        <div className="mb-16">
            <NavBar></NavBar>
            <div className="">
                <h1 className="text-4xl mt-10 font-bold text-center" data-aos="fade-down">Register your account!</h1>
                <form
                    onSubmit={handleRegister}
                    className="card-body md:w-3/4 lg:w-1/2 mx-auto">
                    {
                        registerError && <p className="text-red-700">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-700">{success}</p>
                    }
                    <div className="form-control " data-aos="fade-left">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered bg-slate-200" required />
                    </div>
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
                    </div>
                    <div className="flex" >
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms"><a href="#">Acceept our Terms and Condition</a></label>
                    </div>
                    <div className="form-control mt-4">
                        <button className="btn btn-primary">Register</button>
                    </div>

                </form>
                <div className="card-body md:w-3/4 lg:w-1/2 mx-auto" data-aos="fade-up">

                    <button onClick={handleGoogleSignIn} className="btn btn-neutral">Login With Google</button>
                </div>
                <p className="text-center text-[#706F6F] font-medium">Already Have An Account ?
                    <Link to={"/login"} className="text-[#F75B5F] font-bold">  Login Now!</Link> </p>

            </div>
        </div>
    );
};

export default Register;