'use client'
import { useState } from "react";
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";



export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the desired page after successful sign-up
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect to the desired page after successful sign-in
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
      <section className="bg-gradient-to-b from-orange-100 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-8">
              <h1 className="h1">Join Us</h1>
            </div>

            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSignUp}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-orange-400 hover:bg-orange-300 w-full">
                      Sign up
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center mt-3">
                  By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>,
                  and our <a className="underline" href="#0">privacy policy</a>.
                </div>
              </form>
              <div className="flex items-center my-6">
                <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
                <div className="text-gray-600 italic">Or</div>
                <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button
                      onClick={handleGoogleSignIn}
                      className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                    <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"/>
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                  </button>
                </div>
              </div>
              <div className="text-gray-600 text-center mt-6">
                Already using Simple? <Link href="/signin"
                                            className="text-orange-400 hover:underline transition duration-150 ease-in-out">Sign
                in</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
