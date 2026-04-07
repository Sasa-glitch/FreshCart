"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Truck, ShieldCheck, UserPlus, CircleUser, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { RegisterDataType, zodSchemia } from "./zodSchema";
import { signUpRequest } from "./register.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// our component
export default function page() {
    // router instance so we can route to login after register
    const routingObject = useRouter();
    // states for passwords eyes
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    // using form hook provided by rhf
    const { handleSubmit, control, watch, formState: { isSubmitting } } = useForm<RegisterDataType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(zodSchemia),
    });

    // watching password to show its strength

    const password = watch("password");

    const calculateStrength = (pass: string) => {
        if (!pass) return { score: 0, text: "Weak", color: "bg-gray-200", textColor: "text-gray-400" };
        let score = 0;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
        if (/\d/.test(pass)) score += 1;
        if (/[@$!%*?&]/.test(pass)) score += 1;
        
        if (score <= 1) return { score: 1, text: "Weak", color: "bg-red-500", textColor: "text-red-500" };
        if (score === 2) return { score: 2, text: "Fair", color: "bg-yellow-500", textColor: "text-yellow-500" };
        if (score === 3) return { score: 3, text: "Good", color: "bg-blue-500", textColor: "text-blue-500" };
        return { score: 4, text: "Strong", color: "bg-green-500", textColor: "text-green-500" };
    };

    const strength = calculateStrength(password);

    // my handle submit function
    const handleMySubmit = async (data: RegisterDataType) => {
        const isSuccess = await signUpRequest(data);
        if (isSuccess === true) {
            // if success show toaster and navigate to login
            toast.success("An account was created!");
            routingObject.replace("/login")
        } else if (typeof isSuccess ===  "string") {
            toast.error(isSuccess)
        } else {
            toast.error("Unexpected error!")
        }
    };
    return (
        <div className="min-h-screen bg-mute-lightest flex justify-center py-10 md:py-16 px-4">
            <div className="max-w-275 w-full grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-12 lg:gap-24 mb-10">
                
                {/* Left Column (Information) */}
                <div className="flex flex-col pt-4">
                    <div className="mb-10 lg:mb-16">
                        <h1 className="text-[2.5rem] leading-tight font-bold text-dark mb-3">
                            Welcome to <span className="text-primary">FreshCart</span>
                        </h1>
                        <p className="text-mute text-lg max-w-md">
                            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
                        </p>
                    </div>

                    <div className="space-y-8 max-w-sm mb-12">
                        {/* Premium Quality */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                                <Star className="text-primary w-5 h-5" fill="currentColor" strokeWidth={1} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark mb-0.5 text-base">Premium Quality</h3>
                                <p className="text-mute text-sm">Premium quality products sourced from trusted suppliers.</p>
                            </div>
                        </div>

                        {/* Fast Delivery */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0">
                                <Truck className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark mb-0.5 text-base">Fast Delivery</h3>
                                <p className="text-mute text-sm">Same-day delivery available in most areas</p>
                            </div>
                        </div>

                        {/* Secure Shopping */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center shrink-0 mt-1">
                                <ShieldCheck className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark mb-0.5 text-base">Secure Shopping</h3>
                                <p className="text-mute text-sm">Your data and payments are completely secure</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="mt-10 shadow-md rounded-md p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 overflow-hidden">
                                <CircleUser className="w-full h-full text-green-700/60" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-dark text-sm">Sarah Johnson</h4>
                                <div className="flex text-star mt-0.5 gap-0.5">
                                    <Star className="w-3.5 h-3.5" fill="currentColor" stroke="none" />
                                    <Star className="w-3.5 h-3.5" fill="currentColor" stroke="none" />
                                    <Star className="w-3.5 h-3.5" fill="currentColor" stroke="none" />
                                    <Star className="w-3.5 h-3.5" fill="currentColor" stroke="none" />
                                    <Star className="w-3.5 h-3.5" fill="currentColor" stroke="none" />
                                </div>
                            </div>
                        </div>
                        <p className="text-mute text-sm italic max-w-sm">
                            "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
                        </p>
                    </div>
                </div>

                {/* Right Column (Form Card) */}
                <div className="bg-white rounded-2xl p-8 shadow-[0_0_15px_rgba(0,0,0,0.03)] border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-[1.75rem] font-semibold text-dark mb-2">Create Your Account</h2>
                        <p className="text-mute text-sm">Start your fresh journey with us today</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Button variant="outline" className="w-full h-11 text-gray-700 font-medium border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 rounded-lg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="w-full h-11 text-gray-700 font-medium border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 rounded-lg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" fill="#1877F2"/>
                            </svg>
                            Facebook
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-3 text-gray-400 font-medium">or</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleMySubmit)} className="space-y-4">
                        {/* name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
                                    <FieldLabel htmlFor="name" className="text-sm font-medium text-gray-700 block">Name*</FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        className={`w-full h-11 border ${fieldState.invalid ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-lg px-4 focus:ring-2 focus:ring-primary outline-none transition-shadow`}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ali"
                                        autoComplete="name"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} className="text-red-500 text-xs mt-1" />
                                    )}
                                </Field>
                            )}
                        />

                        {/* email */}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
                                    <FieldLabel htmlFor="email" className="text-sm font-medium text-gray-700 block">Email*</FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        className={`w-full h-11 border ${fieldState.invalid ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-lg px-4 focus:ring-2 focus:ring-primary outline-none transition-shadow`}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="ali@example.com"
                                        autoComplete="email"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} className="text-red-500 text-xs mt-1" />
                                    )}
                                </Field>
                            )}
                        />

                        {/* password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
                                    <FieldLabel htmlFor="pass" className="text-sm font-medium text-gray-700 block">Password*</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id="pass"
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full h-11 border ${fieldState.invalid ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-lg px-4 pr-10 focus:ring-2 focus:ring-primary outline-none transition-shadow`}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="create a strong password"
                                            autoComplete="new-password"
                                        />
                                        {field.value && (
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-1.5 mb-1 px-1">
                                        <div className="flex w-full gap-1 h-1 mr-4">
                                            <div className={`flex-1 rounded-full h-1 transition-colors ${strength.score >= 1 ? strength.color : 'bg-gray-200'}`}></div>
                                            <div className={`flex-1 rounded-full h-1 transition-colors ${strength.score >= 2 ? strength.color : 'bg-gray-200'}`}></div>
                                            <div className={`flex-1 rounded-full h-1 transition-colors ${strength.score >= 3 ? strength.color : 'bg-gray-200'}`}></div>
                                            <div className={`flex-1 rounded-full h-1 transition-colors ${strength.score >= 4 ? strength.color : 'bg-gray-200'}`}></div>
                                        </div>
                                        <span className={`text-[10px] font-semibold leading-none ${strength.textColor}`}>{strength.text}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 px-1">Must be at least 8 characters with numbers and symbols</p>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} className="text-red-500 text-xs mt-1" />
                                    )}
                                </Field>
                            )}
                        />

                        {/* rePassword */}
                        <Controller
                            name="rePassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
                                    <FieldLabel htmlFor="rePass" className="text-sm font-medium text-gray-700 block mt-3">Confirm Password*</FieldLabel>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            id="rePass"
                                            type={showRePassword ? "text" : "password"}
                                            className={`w-full h-11 border ${fieldState.invalid ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-lg px-4 pr-10 focus:ring-2 focus:ring-primary outline-none transition-shadow`}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="confirm your password"
                                            autoComplete="new-password"
                                        />
                                        {field.value && (
                                            <button
                                                type="button"
                                                onClick={() => setShowRePassword(!showRePassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                {showRePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        )}
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} className="text-red-500 text-xs mt-1" />
                                    )}
                                </Field>
                            )}
                        />

                        {/* phone */}
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="w-full space-y-1.5">
                                    <FieldLabel htmlFor="phone" className="text-sm font-medium text-gray-700 block">Phone Number*</FieldLabel>
                                    <Input
                                        {...field}
                                        id="phone"
                                        type="tel"
                                        className={`w-full h-11 border ${fieldState.invalid ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-lg px-4 focus:ring-2 focus:ring-primary outline-none transition-shadow`}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="+201140169594"
                                        autoComplete="tel"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} className="text-red-500 text-xs mt-1" />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Terms */}
                        <div className="flex items-start gap-2.5 pt-2 pb-1">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                required 
                                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer accent-primary outline-none" 
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                                I agree to the <Link href="/terms" className="text-primary font-medium hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link> *
                            </label>
                        </div>

                        {/* submit button */}
                        <Button disabled={isSubmitting} type="submit" className="w-full h-11.5 bg-primary hover:bg-primary-dark text-white font-semibold text-[15px] rounded-lg flex items-center gap-2 justify-center shadow-sm transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create My Account
                                </>
                            )}
                        </Button>

                        <div className="text-center pt-2 text-sm text-gray-500">
                            Already have an account? <Link href="/login" className="text-primary font-medium hover:underline ml-1">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

